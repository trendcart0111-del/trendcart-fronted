import React from "react";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, getByCategory } from "../data/products";

export const CatalogPage = ({ category, title, overline, description, testId }) => {
  const products = category ? getByCategory(category) : PRODUCTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20" data-testid={testId}>
      <div className="max-w-2xl mb-14">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-orange-500">
          {overline}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-stone-900 mt-3">
          {title}
        </h1>
        <p className="mt-5 text-base text-stone-500 leading-relaxed">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export const Shop = () => (
  <CatalogPage
    testId="shop-page"
    overline="All Cases"
    title="Shop the collection."
    description="16 premium cases across Transparent Anti-Yellow and Silicone. Engineered for iPhone. Priced at ₹249, always."
  />
);

export const Silicone = () => (
  <CatalogPage
    testId="silicone-page"
    category="silicone"
    overline="Silicone"
    title="Soft. Grippy. Precise."
    description="A liquid-silicone finish that feels premium in hand and stays impressively resistant to marks and stains."
  />
);

export const Transparent = () => (
  <CatalogPage
    testId="transparent-page"
    category="transparent"
    overline="Transparent"
    title="Crystal clear, forever."
    description="Anti-Yellow coated TPU that keeps its clarity for years. Shows off your iPhone. Nothing else."
  />
);
