import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { POST_LOGIN_KEY } from "./Landing";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash || "";
    const match = hash.match(/session_id=([^&]+)/);
    const sessionId = match ? match[1] : null;

    if (!sessionId) {
      navigate("/", { replace: true });
      return;
    }

    (async () => {
      let dest = "/shop";
      try {
        dest = sessionStorage.getItem(POST_LOGIN_KEY) || "/shop";
        sessionStorage.removeItem(POST_LOGIN_KEY);
      } catch { /* noop */ }

      try {
        const res = await axios.post(
          `${API}/auth/session`,
          { session_id: sessionId },
          { withCredentials: true }
        );
        setUser(res.data);
        window.history.replaceState({}, document.title, window.location.pathname);
        navigate(dest, { replace: true, state: { user: res.data } });
      } catch {
        navigate("/", { replace: true });
      }
    })();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
        <div className="h-8 w-8 rounded-full border-2 border-stone-300 border-t-orange-500 animate-spin mx-auto" />
        <p className="mt-4 text-sm text-stone-500">Signing you in…</p>
      </div>
    </div>
  );
}
