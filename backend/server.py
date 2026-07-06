from fastapi import FastAPI, APIRouter, Request, Response, HTTPException, Cookie, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
import httpx
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone, timedelta


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMERGENT_AUTH_URL = "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data"


# ---------- Models ----------
class User(BaseModel):
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None


class SessionExchangeRequest(BaseModel):
    session_id: str


# ---------- Auth helpers ----------
async def get_current_user(
    request: Request,
    authorization: Optional[str] = Header(None),
) -> User:
    # Read session_token from cookie first, then Authorization header
    token = request.cookies.get("session_token")
    if not token and authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ", 1)[1]

    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    session_doc = await db.user_sessions.find_one({"session_token": token}, {"_id": 0})
    if not session_doc:
        raise HTTPException(status_code=401, detail="Invalid session")

    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        raise HTTPException(status_code=401, detail="Session expired")

    user_doc = await db.users.find_one({"user_id": session_doc["user_id"]}, {"_id": 0})
    if not user_doc:
        raise HTTPException(status_code=401, detail="User not found")

    return User(**user_doc)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "TrendCart API"}


@api_router.post("/auth/session")
async def create_session(payload: SessionExchangeRequest, response: Response):
    """Exchange a session_id (from Emergent OAuth redirect) for a persistent session."""
    async with httpx.AsyncClient(timeout=15.0) as http:
        r = await http.get(
            EMERGENT_AUTH_URL,
            headers={"X-Session-ID": payload.session_id},
        )
    if r.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid session_id")

    data = r.json()
    email = data.get("email")
    name = data.get("name") or email
    picture = data.get("picture")
    session_token = data.get("session_token")

    if not email or not session_token:
        raise HTTPException(status_code=500, detail="Malformed session data")

    # Upsert user
    existing = await db.users.find_one({"email": email}, {"_id": 0})
    if existing:
        user_id = existing["user_id"]
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {"name": name, "picture": picture}},
        )
    else:
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": email,
            "name": name,
            "picture": picture,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })

    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    # Set httpOnly cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        max_age=7 * 24 * 60 * 60,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
    )

    return {
        "user_id": user_id,
        "email": email,
        "name": name,
        "picture": picture,
    }


@api_router.get("/auth/me", response_model=User)
async def me(request: Request, authorization: Optional[str] = Header(None)):
    return await get_current_user(request, authorization)


@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    token = request.cookies.get("session_token")
    if token:
        await db.user_sessions.delete_one({"session_token": token})
    response.delete_cookie("session_token", path="/", samesite="none", secure=True)
    return {"ok": True}


# ---------- Optional: order log (WhatsApp orders) ----------
class OrderCreate(BaseModel):
    customer_name: str
    phone: str
    address: str
    items: list
    total: int


@api_router.post("/orders")
async def log_order(
    payload: OrderCreate,
    request: Request,
    authorization: Optional[str] = Header(None),
):
    user = await get_current_user(request, authorization)
    order_id = f"ord_{uuid.uuid4().hex[:10]}"
    await db.orders.insert_one({
        "order_id": order_id,
        "user_id": user.user_id,
        "customer_name": payload.customer_name,
        "phone": payload.phone,
        "address": payload.address,
        "items": payload.items,
        "total": payload.total,
        "status": "whatsapp_initiated",
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"order_id": order_id}


# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
