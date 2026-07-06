import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { ArrowLeft, MessageCircle, Truck, CreditCard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = React.useState(user?.name || "");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [shipping] = React.useState("standard");
  const [payment] = React.useState("cod");
  const [submitting, setSubmitting] = React.useState(false);

  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 49;
  const total = subtotal + shippingFee;

  const handleWhatsAppOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Please fill in all customer details");
      return;
    }

    setSubmitting(true);
    // log order (non-blocking)
    try {
      await axios.post(
        `${API}/orders`,
        {
          customer_name: name,
          phone,
          address,
          items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
          total,
        },
        { withCredentials: true }
      );
    } catch { /* ignore, still open WhatsApp */ }

    const lines = [
      "*New TrendCart Order*",
      "",
      "*Items:*",
      ...items.map((i, idx) => `${idx + 1}. ${i.name} × ${i.qty} — ₹${i.qty * i.price}`),
      "",
      `Subtotal: ₹${subtotal}`,
      `Shipping: ${shippingFee === 0 ? "Free" : `₹${shippingFee}`}`,
      `*Total: ₹${total}*`,
      "",
      "*Ship to:*",
      `${name}`,
      `${phone}`,
      `${address}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");

    toast.success("Order sent to WhatsApp", {
      description: "Complete your order in the WhatsApp chat.",
    });

    clearCart();
    setSubmitting(false);
    navigate("/shop");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" data-testid="checkout-page">
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 mb-8"
        data-testid="checkout-back-link"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue shopping
      </Link>

      <h1 className="font-display text-3xl sm:text-4xl font-light tracking-tight text-stone-900">
        Checkout
      </h1>
      <p className="text-sm text-stone-500 mt-2">
        Complete your details and place the order via WhatsApp.
      </p>

      <div className="mt-12 grid lg:grid-cols-3 gap-10">
        {/* Form */}
        <form onSubmit={handleWhatsAppOrder} className="lg:col-span-2 space-y-10">
          <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-medium text-stone-900 mb-6">
              Customer details
            </h2>
            <div className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-sm text-stone-700">Full name</Label>
                <Input
                  id="name"
                  data-testid="checkout-name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-stone-200 bg-stone-50"
                  placeholder="e.g. Aditi Sharma"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm text-stone-700">Phone number</Label>
                <Input
                  id="phone"
                  data-testid="checkout-phone"
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1.5 h-11 rounded-xl border-stone-200 bg-stone-50"
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-sm text-stone-700">Full shipping address</Label>
                <Textarea
                  id="address"
                  data-testid="checkout-address"
                  required
                  rows={4}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1.5 rounded-xl border-stone-200 bg-stone-50"
                  placeholder="House, street, city, state, PIN"
                />
              </div>
            </div>
          </section>

          <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-medium text-stone-900 mb-6">
              Shipping
            </h2>
            <div className="border border-stone-200 rounded-2xl p-4 flex items-center gap-4" data-testid="shipping-placeholder">
              <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                <Truck className="h-4 w-4 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">Standard shipping</p>
                <p className="text-xs text-stone-500">Delivered in 3–5 days · Free above ₹999</p>
              </div>
              <span className="text-sm font-semibold text-stone-900">
                {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-3">
              Shiprocket integration coming soon.
            </p>
          </section>

          <section className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-medium text-stone-900 mb-6">
              Payment
            </h2>
            <div className="border border-stone-200 rounded-2xl p-4 flex items-center gap-4" data-testid="payment-placeholder">
              <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-orange-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-stone-900">Pay on delivery / Confirm via WhatsApp</p>
                <p className="text-xs text-stone-500">We&apos;ll confirm payment options in the WhatsApp chat.</p>
              </div>
            </div>
            <p className="text-xs text-stone-400 mt-3">
              Razorpay integration coming soon.
            </p>
          </section>

          <Button
            type="submit"
            disabled={submitting || items.length === 0}
            data-testid="btn-place-order-whatsapp"
            className="w-full h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold group"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {submitting ? "Sending…" : "Place Order via WhatsApp"}
          </Button>
        </form>

        {/* Summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 sticky top-24">
            <h3 className="font-display text-lg font-medium text-stone-900 mb-6">
              Order summary
            </h3>
            {items.length === 0 ? (
              <p className="text-sm text-stone-500">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4 max-h-72 overflow-y-auto pr-1">
                  {items.map((i) => (
                    <li key={i.id} className="flex gap-3" data-testid={`summary-item-${i.id}`}>
                      <div className="h-14 w-14 rounded-xl bg-stone-100 overflow-hidden shrink-0">
                        <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-stone-900 truncate">{i.name}</p>
                        <p className="text-xs text-stone-500 mt-0.5">Qty {i.qty}</p>
                      </div>
                      <p className="text-sm font-medium text-stone-900">₹{i.qty * i.price}</p>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-stone-200 my-5" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span data-testid="summary-subtotal" className="text-stone-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Shipping</span>
                    <span className="text-stone-900">
                      {shippingFee === 0 ? "Free" : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-stone-200 mt-3">
                    <span className="font-display text-base font-medium text-stone-900">Total</span>
                    <span data-testid="summary-total" className="font-display text-base font-semibold text-stone-900">
                      ₹{total}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
