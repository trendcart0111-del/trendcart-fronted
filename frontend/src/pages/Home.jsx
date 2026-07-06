import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Zap, Truck } from "lucide-react";
import { Button } from "../components/ui/button";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/products";

const HERO_IMG = "https://images.unsplash.com/photo-1583291023438-41cef6453b1f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MTN8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjBjYXNlJTIwdHJhbnNwYXJlbnR8ZW58MHx8fHwxNzgzMzY4OTUzfDA&ixlib=rb-4.1.0&q=85";
const LIFESTYLE_IMG = "https://images.unsplash.com/photo-1726839662758-e3b5da59b0fb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxpcGhvbmUlMjBjYXNlJTIwc2lsaWNvbmV8ZW58MHx8fHwxNzgzMzY4OTU0fDA&ixlib=rb-4.1.0&q=85";

const badges = [
  { icon: ShieldCheck, title: "Anti-Yellow Coating", sub: "Stays crystal clear, forever." },
  { icon: Zap, title: "MagSafe Certified", sub: "Snap. Charge. Repeat." },
  { icon: Truck, title: "Free Shipping ₹999+", sub: "Delivered in 3–5 days across India." },
];

export default function Home() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="tc-fade-up">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-500">
              Premium Cases · MagSafe Ready
            </p>
            <h1 className="font-display mt-5 text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.05]">
              Protection,
              <br />
              <span className="italic font-normal">refined.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-stone-500 leading-relaxed max-w-xl">
              Transparent Anti-Yellow, Silicone, and MagSafe cases engineered for every device.
              Minimal by design. Built to last.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link to="/shop" data-testid="btn-hero-shop">
                <Button className="group h-12 px-7 rounded-full bg-stone-900 text-white hover:bg-orange-500 transition-colors text-sm font-medium">
                  Shop the collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about" data-testid="btn-hero-story">
                <Button
                  variant="outline"
                  className="h-12 px-7 rounded-full border-stone-300 hover:border-stone-900 hover:bg-transparent text-sm font-medium"
                >
                  Our story
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative tc-fade-up-delay-2">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100">
              <img src={HERO_IMG} alt="Premium iPhone case" className="h-full w-full object-cover" />
            </div>
            <div className="hidden md:block absolute -bottom-8 -left-8 w-48 h-56 rounded-2xl overflow-hidden bg-stone-100 border-4 border-stone-50 shadow-xl">
              <img src={LIFESTYLE_IMG} alt="Lifestyle" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-b border-stone-200 bg-white/50 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {badges.map((b) => (
              <div key={b.title} className="flex items-start gap-3" data-testid={`trust-badge-${b.title.toLowerCase().replace(/\s+/g,'-')}`}>
                <div className="h-9 w-9 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <b.icon className="h-4 w-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-900">{b.title}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500">Featured</p>
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-stone-900 mt-2">
              Cases we love.
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-stone-900 hover:text-orange-500 transition-colors group"
            data-testid="link-view-all"
          >
            View all
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
