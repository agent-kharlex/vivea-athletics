"use client";

import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { buttonVariants } from "@/components/ui/button";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "thongs", label: "Thongs" },
  { value: "bodysuits", label: "Bodysuits" },
] as const;

export function ShopContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "all";

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-vivea-black">
          Shop All
        </h1>
        <p className="mt-2 text-sm text-vivea-coffee/70">
          Cameltoe-proof, PFAs-free athletic apparel. Free shipping over $75.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          const href =
            cat.value === "all" ? "/shop" : `/shop?category=${cat.value}`;
          return (
            <a
              key={cat.value}
              href={href}
              className={
                isActive
                  ? buttonVariants({
                      variant: "default",
                      size: "sm",
                      className: "rounded-full",
                    })
                  : buttonVariants({
                      variant: "outline",
                      size: "sm",
                      className: "rounded-full",
                    })
              }
            >
              {cat.label}
            </a>
          );
        })}
        <span className="ml-auto text-sm text-vivea-coffee/60">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-sm text-vivea-coffee/60">
            No products found in this category.
          </p>
          <a
            href="/shop"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "mt-4",
            })}
          >
            View All Products
          </a>
        </div>
      )}
    </div>
  );
}
