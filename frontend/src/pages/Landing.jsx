import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";

const LOGO = "https://customer-assets.emergentagent.com/job_9542524b-267c-4111-b154-1ffeb2984fad/artifacts/o3vs8lw1_trendcart.jpeg";
const HERO_BG = "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjB0ZWNoJTIwZGVzayUyMG1pbmltYWxpc3R8ZW58MHx8fHwxNzgzMzY4OTU0fDA&ixlib=rb-4.1.0&q=85";

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.7 2.4 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.8 6.1C12.4 13.2 17.7 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.9 7.2l7.5 5.8c4.4-4 6.9-9.8 6.9-17.5z"/>
    <path fill="#FBBC05" d="M10.3 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C.9 16.3 0 20 0 24s.9 7.7 2.5 10.8l7.8-6.1z"/>
    <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.8 2.3-7.7 2.3-6.3 0-11.6-3.7-13.7-9.3l-7.8 6.1C6.4 42.6 14.6 48 24 48z"/>
  </svg>
);

const POST_LOGIN_KEY = "trendcart_post_login_redirect";

export default function Landing() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const nextPath = params.get("next") || "/shop";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="h-8 w-8 rounded-full border-2 border-stone-300 border-t-orange-500 animate-spin" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={nextPath} replace />;
  }

  const handleGoogleLogin = () => {
    // Store desired post-login destination for the callback to pick up
    try {
      sessionStorage.setItem(POST_LOGIN_KEY, nextPath);
    } catch { /* noop */ }
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-stone-50" data-testid="landing-page">
      {/* Left - branding + CTA */}
      <div className="flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="signin-back-logo">
            <img src={LOGO} alt="TrendCart" className="h-10 w-10 rounded-xl object-cover" />
            <span className="font-display text-xl font-semibold text-stone-900">TrendCart</span>
          </Link>
          <Link
            to="/"
            className="text-sm text-stone-500 hover:text-stone-900 inline-flex items-center gap-1"
            data-testid="signin-back-link"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to store
          </Link>
        </div>

        <div className="tc-fade-up max-w-md">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500 mb-4">
            Sign in
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.05]">
            Welcome to
            <br />
            <span className="italic font-normal">TrendCart.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-stone-500 leading-relaxed">
            {nextPath === "/checkout"
              ? "Sign in with Google to complete your order securely and track it in one place."
              : "Sign in to save your wishlist, track orders and check out faster."}
          </p>

          <button
            onClick={handleGoogleLogin}
            data-testid="btn-google-signin"
            className="mt-10 group inline-flex items-center gap-3 bg-stone-900 hover:bg-stone-800 text-white rounded-full pl-2 pr-6 py-2 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <span className="h-9 w-9 bg-white rounded-full flex items-center justify-center">
              <GoogleIcon />
            </span>
            <span className="text-sm font-medium">Sign in with Google</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-4 text-xs text-stone-400 max-w-xs">
            By signing in you agree to TrendCart&apos;s Terms of Service and Privacy Policy.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-stone-500">
          <span>Anti-Yellow Coating</span>
          <span className="text-stone-300">·</span>
          <span>MagSafe Certified</span>
          <span className="text-stone-300">·</span>
          <span>Free Shipping ₹999+</span>
        </div>
      </div>

      {/* Right - visual */}
      <div className="hidden lg:block relative overflow-hidden bg-stone-100">
        <img
          src={HERO_BG}
          alt="Aesthetic tech desk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/30 via-transparent to-orange-500/10" />
        <div className="absolute bottom-10 left-10 right-10 text-white tc-fade-up">
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">TrendCart · 2026</p>
          <p className="font-display text-2xl font-light mt-2 max-w-md">
            Minimal by design. Built to last.
          </p>
        </div>
      </div>
    </div>
  );
}

export { POST_LOGIN_KEY };
