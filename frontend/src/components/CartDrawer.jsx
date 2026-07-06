import React from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { Button } from "../components/ui/button";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export const CartDrawer = () => {
  const {
    items,
    drawerOpen,
    setDrawerOpen,
    incQty,
    decQty,
    removeItem,
    subtotal,
    count,
  } = useCart();

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-white"
        data-testid="cart-drawer"
      >
        <SheetHeader className="px-6 py-5 border-b border-stone-200">
          <SheetTitle className="font-display text-xl font-medium text-stone-900 flex items-center justify-between">
            <span>Your Cart ({count})</span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="h-16 w-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
              <ShoppingBag className="h-7 w-7 text-stone-400" />
            </div>
            <h3 className="font-display text-lg font-medium text-stone-900 mb-1">
              Your cart is empty
            </h3>
            <p className="text-sm text-stone-500 mb-6">
              Add a case to get started.
            </p>
            <Button
              onClick={() => setDrawerOpen(false)}
              className="rounded-full bg-stone-900 text-white hover:bg-stone-800"
              data-testid="cart-empty-continue-btn"
            >
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.map((item) => (
                <div
                  key={item.id}
                  data-testid={`cart-item-${item.id}`}
                  className="flex gap-4"
                >
                  <div className="h-20 w-20 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium text-stone-900 truncate">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        data-testid={`cart-remove-${item.id}`}
                        className="text-stone-400 hover:text-stone-700"
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-stone-500 mt-0.5">
                      ₹{item.price}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="inline-flex items-center border border-stone-200 rounded-full">
                        <button
                          onClick={() => decQty(item.id)}
                          data-testid={`cart-dec-${item.id}`}
                          className="p-1.5 hover:bg-stone-100 rounded-l-full"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span
                          data-testid={`cart-qty-${item.id}`}
                          className="px-3 text-sm font-medium min-w-[2rem] text-center"
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => incQty(item.id)}
                          data-testid={`cart-inc-${item.id}`}
                          className="p-1.5 hover:bg-stone-100 rounded-r-full"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="ml-auto text-sm font-semibold text-stone-900">
                        ₹{item.qty * item.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-200 px-6 py-5 space-y-4 bg-white">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500">Subtotal</span>
                <span
                  data-testid="cart-subtotal"
                  className="font-display text-xl font-medium text-stone-900"
                >
                  ₹{subtotal}
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Shipping calculated at checkout. Free above ₹999.
              </p>
              <Link
                to="/checkout"
                onClick={() => setDrawerOpen(false)}
                data-testid="cart-checkout-btn"
              >
                <Button className="w-full rounded-full bg-orange-500 text-white hover:bg-orange-600 h-12 text-sm font-semibold">
                  Checkout
                </Button>
              </Link>
              <button
                onClick={() => setDrawerOpen(false)}
                data-testid="cart-continue-btn"
                className="w-full text-center text-sm text-stone-500 hover:text-stone-900 py-1"
              >
                Continue shopping
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
