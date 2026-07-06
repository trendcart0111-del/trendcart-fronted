import React from "react";
import "@/App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import Landing from "@/pages/Landing";
import AuthCallback from "@/pages/AuthCallback";
import Home from "@/pages/Home";
import { Shop, Silicone, Transparent } from "@/pages/Catalog";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Checkout from "@/pages/Checkout";
import Wishlist from "@/pages/Wishlist";

// Public layout - accessible without login
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <CartDrawer />
    <main className="min-h-[70vh]">{children}</main>
    <Footer />
  </>
);

// Login-required layout - used only for checkout
const RequireAuthLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="h-8 w-8 rounded-full border-2 border-stone-300 border-t-orange-500 animate-spin" />
      </div>
    );
  }
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/signin?next=${next}`} replace />;
  }
  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="min-h-[70vh]">{children}</main>
      <Footer />
    </>
  );
};

function AppRouter() {
  const location = useLocation();

  // Handle OAuth callback synchronously (before other routes)
  if (location.hash?.includes("session_id=")) {
    return <AuthCallback />;
  }

  return (
    <Routes>
      {/* Public homepage */}
      <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
      <Route path="/shop" element={<PublicLayout><Shop /></PublicLayout>} />
      <Route path="/silicone" element={<PublicLayout><Silicone /></PublicLayout>} />
      <Route path="/transparent" element={<PublicLayout><Transparent /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
      <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
      <Route path="/wishlist" element={<PublicLayout><Wishlist /></PublicLayout>} />

      {/* Sign-in page (Google auth) */}
      <Route path="/signin" element={<Landing />} />

      {/* Auth required only for checkout */}
      <Route
        path="/checkout"
        element={
          <RequireAuthLayout>
            <Checkout />
          </RequireAuthLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRouter />
            <Toaster position="bottom-right" richColors />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
