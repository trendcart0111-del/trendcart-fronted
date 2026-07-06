import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" data-testid="wishlist-page">
      <div className="mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500">Saved</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-stone-900 mt-3">
          Wishlist
        </h1>
      </div>
      {wishlist.length === 0 ? (
        <div className="text-center py-20 max-w-md mx-auto">
          <div className="h-16 w-16 rounded-full bg-stone-100 mx-auto flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-stone-400" />
          </div>
          <h3 className="font-display text-lg font-medium text-stone-900">
            Nothing saved yet
          </h3>
          <p className="text-sm text-stone-500 mt-1 mb-6">
            Tap the heart on any case to save it here.
          </p>
          <Link to="/shop">
            <Button className="rounded-full bg-stone-900 text-white hover:bg-stone-800">
              Explore cases
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {wishlist.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
