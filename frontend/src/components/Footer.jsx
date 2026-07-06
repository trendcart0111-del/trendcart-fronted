import React from "react";
import { Link } from "react-router-dom";

const LOGO = "https://customer-assets.emergentagent.com/job_9542524b-267c-4111-b154-1ffeb2984fad/artifacts/o3vs8lw1_trendcart.jpeg";

export const Footer = () => {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 mt-24" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={LOGO} alt="TrendCart" className="h-9 w-9 rounded-lg object-cover" />
              <span className="font-display text-lg font-semibold text-stone-900">TrendCart</span>
            </div>
            <p className="text-sm text-stone-500 mt-4 max-w-sm leading-relaxed">
              Premium iPhone cases — Transparent Anti-Yellow, Silicone and MagSafe.
              Minimal by design. Built to last.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-stone-900 mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><Link to="/shop" className="hover:text-orange-500">All Cases</Link></li>
              <li><Link to="/silicone" className="hover:text-orange-500">Silicone</Link></li>
              <li><Link to="/transparent" className="hover:text-orange-500">Transparent</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-stone-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><Link to="/about" className="hover:text-orange-500">About</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-stone-500">© {new Date().getFullYear()} TrendCart. All rights reserved.</p>
          <p className="text-xs text-stone-400">Anti-Yellow · MagSafe Certified · Free Shipping ₹999+</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
