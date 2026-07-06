import React from "react";
import { Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

export const ProductCard = ({ product }) => {
  const { addItem, toggleWishlist, isWished } = useCart();
  const wished = isWished(product.id);

  const handleAdd = () => {
    addItem(product);
    toast.success("Added to cart", {
      description: product.name,
    });
  };

  return (
    <div
      data-testid={`product-card-${product.id}`}
      className="group tc-fade-up"
    >
      <div className="relative aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => toggleWishlist(product)}
          data-testid={`btn-wishlist-${product.id}`}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`h-4 w-4 ${
              wished ? "text-orange-500 fill-orange-500" : "text-stone-700"
            }`}
          />
        </button>
        {product.badge && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wider uppercase bg-stone-900 text-white px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-stone-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-stone-500 mt-0.5">₹{product.price}</p>
        </div>
      </div>
      <Button
        onClick={handleAdd}
        data-testid={`btn-add-to-cart-${product.id}`}
        className="mt-3 w-full rounded-full bg-stone-900 text-white hover:bg-orange-500 transition-colors h-10 text-sm font-medium"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
