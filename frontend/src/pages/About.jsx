import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sparkles, Recycle } from "lucide-react";
import { Button } from "../components/ui/button";

const IMG = "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzV8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjB0ZWNoJTIwZGVzayUyMG1pbmltYWxpc3R8ZW58MHx8fHwxNzgzMzY4OTU0fDA&ixlib=rb-4.1.0&q=85";

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24" data-testid="about-page">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500">Our Story</p>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 mt-4 leading-[1.05]">
          Cases, obsessively made.
        </h1>
        <p className="mt-6 text-lg text-stone-500 leading-relaxed">
          TrendCart began with a simple frustration — cheap cases that yellow in weeks,
          bulky silicone that ruins the feel of a beautifully engineered phone. So we built our own.
          Anti-yellow TPU that stays clear. Silicone with a soft-touch finish that lasts.
          MagSafe-perfect alignment on every case. All priced at ₹249, always.
        </p>
      </div>

      <div className="mt-14 aspect-[16/8] rounded-3xl overflow-hidden bg-stone-100">
        <img src={IMG} alt="TrendCart workshop" className="h-full w-full object-cover" />
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: "Materials that outlast trends", body: "German-sourced TPU with a proprietary anti-yellow coating. Certified silicone that doesn't stain." },
          { icon: Sparkles, title: "Precision engineering", body: "Cutouts measured to the tenth of a millimeter. Buttons that click. Ports that fit any accessory." },
          { icon: Recycle, title: "Made responsibly", body: "Recyclable packaging. Longer product life. Fewer landfills. A smaller step, but a real one." },
        ].map((f) => (
          <div key={f.title}>
            <div className="h-10 w-10 rounded-full bg-orange-50 flex items-center justify-center">
              <f.icon className="h-5 w-5 text-orange-500" />
            </div>
            <h3 className="font-display text-lg font-medium text-stone-900 mt-5">{f.title}</h3>
            <p className="mt-2 text-sm text-stone-500 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <Link to="/shop" data-testid="about-shop-cta">
          <Button className="group h-12 px-7 rounded-full bg-stone-900 text-white hover:bg-orange-500 transition-colors text-sm font-medium">
            Shop the collection
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
