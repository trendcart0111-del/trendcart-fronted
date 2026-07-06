import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, LogOut, Menu, X, LogIn } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const LOGO = "https://customer-assets.emergentagent.com/job_9542524b-267c-4111-b154-1ffeb2984fad/artifacts/o3vs8lw1_trendcart.jpeg";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/silicone", label: "Silicone" },
  { to: "/transparent", label: "Transparent" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { count, setDrawerOpen, wishlist } = useCart();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header
      data-testid="site-navbar"
      className="sticky top-0 z-50 backdrop-blur-xl bg-stone-50/80 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-4">
          {/* Logo */}
          <Link
            to="/shop"
            data-testid="nav-logo"
            className="flex items-center gap-2 shrink-0"
          >
            <img
              src={LOGO}
              alt="TrendCart"
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="font-display text-lg font-semibold tracking-tight text-stone-900 hidden sm:inline">
              TrendCart
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7 ml-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-orange-500"
                      : "text-stone-700 hover:text-stone-900"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-md ml-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input
                data-testid="nav-search-input"
                placeholder="Search cases..."
                className="pl-9 bg-white border-stone-200 rounded-full h-10"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1 ml-auto">
            <Link
              to="/wishlist"
              data-testid="nav-wishlist-btn"
              className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5 text-stone-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-orange-500 text-white text-[10px] font-semibold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setDrawerOpen(true)}
              data-testid="nav-cart-btn"
              className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5 text-stone-700" />
              {count > 0 && (
                <span
                  data-testid="nav-cart-count"
                  className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-orange-500 text-white text-[10px] font-semibold flex items-center justify-center"
                >
                  {count}
                </span>
              )}
            </button>

            {/* Profile dropdown (authed) or Sign In button (guest) */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    data-testid="nav-profile-btn"
                    className="p-1 rounded-full hover:bg-stone-100 transition-colors ml-1"
                    aria-label="Profile"
                  >
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="h-8 w-8 rounded-full object-cover border border-stone-200"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center">
                        <User className="h-4 w-4 text-stone-600" />
                      </div>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56" data-testid="nav-profile-menu">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-stone-900">
                        {user.name}
                      </span>
                      <span className="text-xs text-stone-500 truncate">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    data-testid="nav-signout-btn"
                    className="cursor-pointer text-stone-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/signin"
                data-testid="nav-signin-btn"
                className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-stone-900 hover:bg-orange-500 text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-2 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span className="hidden xs:inline sm:inline">Sign in</span>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              data-testid="nav-mobile-toggle"
              className="md:hidden p-2 ml-1 rounded-full hover:bg-stone-100"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            data-testid="nav-mobile-menu"
            className="md:hidden pb-4 border-t border-stone-200 pt-3 space-y-1"
          >
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <Input placeholder="Search cases..." className="pl-9 bg-white rounded-full h-10" />
            </div>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive ? "bg-orange-50 text-orange-600" : "text-stone-700 hover:bg-stone-100"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
