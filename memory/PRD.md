# TrendCart — PRD

## Original Problem Statement
Premium, ultra-modern, minimalist e-commerce iPhone case store called "TrendCart" (logo provided). Features: Google Sign-In, sticky navbar with logo/search/wishlist/cart/profile, hero with dual CTAs and trust badges, catalog pages (Shop / Silicone / Transparent), slide-out cart, checkout with Name/Phone/Address that submits via WhatsApp deep-link. No Razorpay/Shiprocket integration.

## User Choices
- Auth: Emergent-managed Google Auth
- WhatsApp business number: +91 7551072683
- 8 products per category (16 total)
- Warm minimalist theme: off-white bg, deep charcoal text, warm orange (#F97316) accent
- Curated Unsplash iPhone case images

## Architecture
- **Backend**: FastAPI (`/app/backend/server.py`) with MongoDB (motor). Endpoints: `/api/auth/session`, `/api/auth/me`, `/api/auth/logout`, `/api/orders`. Session cookie: httpOnly, Secure, SameSite=None.
- **Frontend**: React 19 + React Router 7, Tailwind, Shadcn UI, lucide-react. Global `AuthProvider` + `CartProvider`. Fonts: Outfit (display) + Manrope (body).
- **Product data**: static array in `/app/frontend/src/data/products.js` (16 products at ₹249).

## Personas
- Guest visitor — can browse full site and add to cart.
- Signed-in customer — required only at checkout; sends order via WhatsApp.

## What's Implemented (Feb 2026)
- Public homepage (`/`) with hero (`Protection, refined.`), dual CTAs, 3 trust badges, 8 featured products.
- Public catalog pages: `/shop` (16), `/silicone` (8), `/transparent` (8), `/about`, `/contact`, `/wishlist`.
- Sticky glass navbar with logo, links (Shop, Silicone, Transparent, About, Contact), search placeholder, wishlist icon, cart button + badge, and either **Sign in** button (guest) or **profile dropdown → Sign out** (authed).
- Slide-out cart drawer (Shadcn Sheet) with qty inc/dec, remove, live subtotal.
- Checkout page (auth-required) with Name/Phone/Address, shipping+payment UI placeholders, order summary sidebar, "Place Order via WhatsApp" button that opens `wa.me/917551072683` with a compiled order message. Backend logs order to Mongo.
- Emergent Google OAuth via `/signin` page. `/checkout` guards redirect unauth users to `/signin?next=/checkout`.
- Wishlist (localStorage) with heart toggle on cards.
- Toaster notifications (sonner).
- Fully mobile-responsive with mobile menu.

## Backlog
### P1
- Product detail page + device-model selector.
- Search functionality (currently placeholder).
- Order history page for signed-in users (`/orders`) reading `/api/orders`.
- SEO meta tags / OpenGraph.

### P2
- Real Razorpay integration.
- Real Shiprocket integration (rate + tracking).
- Admin panel to add products / update stock.
- Reviews + ratings.
- Coupons / promo codes.
