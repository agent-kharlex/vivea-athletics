"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { formatPrice, bundles, type MockProduct } from "@/lib/products";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Minus,
  Plus,
  Check,
  ShoppingBag,
} from "lucide-react";

interface ProductDetailProps {
  product: MockProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  const galleryColors = product.gallery_colors.length
    ? product.gallery_colors
    : [product.image_color];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      product_id: product.id,
      product_name: product.name,
      slug: product.slug,
      color: selectedColor.name,
      size: selectedSize,
      unit_price: product.price,
      image_color: selectedColor.hex,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-vivea-coffee/60 mb-6">
        <Link href="/" className="hover:text-vivea-black transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-vivea-black transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-vivea-black transition-colors capitalize"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-vivea-black font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image gallery */}
        <div>
          <div
            className="aspect-[4/5] w-full rounded-xl overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: galleryColors[activeImage] }}
          >
            <span className="text-white/30 text-lg font-medium uppercase tracking-wider">
              {product.name}
            </span>
          </div>
          {galleryColors.length > 1 && (
            <div className="mt-3 flex gap-3">
              {galleryColors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-16 rounded-lg border-2 transition-colors ${
                    activeImage === i
                      ? "border-vivea-rosewood"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="lg:py-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-vivea-black">
            {product.name}
          </h1>
          <p className="mt-1 text-sm text-vivea-coffee/70">{product.tagline}</p>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-vivea-rosewood text-vivea-rosewood"
                      : "text-vivea-sand"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-vivea-coffee/60">
              {product.rating} ({product.review_count} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="mt-4 text-2xl font-bold text-vivea-black">
            {formatPrice(product.price)}
          </p>

          {/* Color selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-vivea-black">
                Color
              </span>
              <span className="text-sm text-vivea-coffee/60">
                {selectedColor.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`relative h-9 w-9 rounded-full border-2 transition-all ${
                    selectedColor.name === color.name
                      ? "border-vivea-rosewood ring-2 ring-vivea-rosewood/20"
                      : "border-vivea-sand"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select ${color.name}`}
                  title={color.name}
                >
                  {selectedColor.name === color.name && (
                    <Check
                      className="absolute inset-0 m-auto h-4 w-4"
                      style={{
                        color:
                          color.hex === "#E8DDD0" || color.hex === "#FAF7F2"
                            ? "#1A1A1A"
                            : "#FFFFFF",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-vivea-black">Size</span>
              <button className="text-sm text-vivea-rosewood hover:underline">
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-10 rounded-lg border text-sm font-medium transition-all ${
                    selectedSize === size
                      ? "border-vivea-black bg-vivea-black text-vivea-off-white"
                      : "border-vivea-sand text-vivea-black hover:border-vivea-coffee"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize === null && (
              <p className="mt-2 text-xs text-vivea-rosewood">
                Please select a size
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <span className="text-sm font-medium text-vivea-black block mb-2">
              Quantity
            </span>
            <div className="inline-flex items-center gap-2 border border-vivea-sand rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-vivea-coffee hover:text-vivea-black"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-2 text-sm font-semibold tabular-nums min-w-[2ch] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-vivea-coffee hover:text-vivea-black"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              size="lg"
              className="flex-1 h-12 text-base"
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="h-5 w-5" /> Add to Cart
                </>
              )}
            </Button>
          </div>

          {/* Trust icons */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-vivea-sand pt-6">
            {[
              { icon: ShieldCheck, label: "PFAs Free" },
              { icon: Truck, label: "Free Ship $75+" },
              { icon: RotateCcw, label: "30-Day Returns" },
              { icon: Check, label: "Cameltoe Proof" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center gap-1.5"
              >
                <item.icon className="h-5 w-5 text-vivea-rosewood" />
                <span className="text-xs text-vivea-coffee/70">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-vivea-sand pt-6">
            <h2 className="text-base font-semibold text-vivea-black mb-2">
              Product Details
            </h2>
            <p className="text-sm text-vivea-coffee/80 leading-relaxed">
              {product.description}
            </p>
            <ul className="mt-4 space-y-2">
              {product.bulletPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-vivea-coffee/80"
                >
                  <Check className="h-4 w-4 text-vivea-moss shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bundle cross-sell */}
      <section className="mt-16 border-t border-vivea-sand pt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-vivea-black mb-2">
          Save More with Bundles
        </h2>
        <p className="text-sm text-vivea-coffee/70 mb-6">
          Get more for less. Bundle and save 10%.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {bundles.map((bundle) => (
            <div
              key={bundle.id}
              className="rounded-xl border border-vivea-sand bg-vivea-off-white p-6 flex flex-col"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-vivea-black">
                    {bundle.name}
                  </h3>
                  <p className="text-sm text-vivea-coffee/70 mt-1">
                    {bundle.description}
                  </p>
                </div>
                <span className="rounded-full bg-vivea-rosewood/15 px-2.5 py-1 text-xs font-medium text-vivea-rosewood shrink-0">
                  {bundle.discount_percent}% Off
                </span>
              </div>

              <div className="mt-4 space-y-1">
                {bundle.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm text-vivea-coffee/80"
                  >
                    <Check className="h-3.5 w-3.5 text-vivea-moss" />
                    {item.quantity}× {item.product_name}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-vivea-black">
                    {formatPrice(bundle.price)}
                  </span>
                  {bundle.compare_at_price && (
                    <span className="ml-2 text-sm text-vivea-coffee/50 line-through">
                      {formatPrice(bundle.compare_at_price)}
                    </span>
                  )}
                </div>
                <Link
                  href="/shop"
                  className={buttonVariants({
                    variant: "default",
                    size: "default",
                  })}
                >
                  Shop Bundle
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
