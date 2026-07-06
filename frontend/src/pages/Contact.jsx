import React from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { toast } from "sonner";

const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER;

export default function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const submit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi TrendCart!\n\nName: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    toast.success("Opening WhatsApp to send your message");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-16" data-testid="contact-page">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500">Contact</p>
        <h1 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-stone-900 mt-4">
          Talk to us.
        </h1>
        <p className="mt-6 text-base text-stone-500 leading-relaxed max-w-md">
          Questions about compatibility, orders, or wholesale? We usually reply within a few hours on WhatsApp.
        </p>

        <div className="mt-10 space-y-5">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <MessageCircle className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">WhatsApp</p>
              <p className="text-sm text-stone-500">+91 75510 72683</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">Email</p>
              <p className="text-sm text-stone-500">hello@trendcart.in</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
              <MapPin className="h-4 w-4 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-900">Ships from</p>
              <p className="text-sm text-stone-500">Bengaluru, India · 3–5 days across India</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-5">
        <div>
          <Label htmlFor="c-name" className="text-sm text-stone-700">Name</Label>
          <Input
            id="c-name"
            data-testid="contact-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 h-11 rounded-xl border-stone-200 bg-stone-50"
            placeholder="Your name"
          />
        </div>
        <div>
          <Label htmlFor="c-email" className="text-sm text-stone-700">Email</Label>
          <Input
            id="c-email"
            data-testid="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 h-11 rounded-xl border-stone-200 bg-stone-50"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <Label htmlFor="c-msg" className="text-sm text-stone-700">Message</Label>
          <Textarea
            id="c-msg"
            data-testid="contact-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1.5 rounded-xl border-stone-200 bg-stone-50"
            placeholder="How can we help?"
          />
        </div>
        <Button
          type="submit"
          data-testid="contact-submit"
          className="w-full h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold"
        >
          Send via WhatsApp
        </Button>
      </form>
    </div>
  );
}
