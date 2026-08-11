"use client";

import Link from "next/link";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";
import { buttonVariants } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from "lucide-react";

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  const remainingForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal,
  );
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-vivea-sand/40 mb-6">
          <ShoppingBag className="h-9 w-9 text-vivea-coffee/50" />
        </div>
        <h1 className="text-2xl font-bold text-vivea-black">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-vivea-coffee/70">
          Looks like you haven&apos;t added anything yet. Let&apos;s fix that.
        </p>
        <Link
          href="/shop"
          className={buttonVariants({
            variant: "default",
            size: "lg",
            className: "mt-6 px-8 h-12 text-base",
          })}
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-vivea-black mb-8">
        Shopping Cart ({itemCount})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.variant_id}
              className="flex gap-4 rounded-xl border border-vivea-sand bg-vivea-off-white p-4"
            >
              {/* Image placeholder */}
              <Link
                href={`/product/${item.slug}`}
                className="h-28 w-24 shrink-0 rounded-lg"
                style={{ backgroundColor: item.image_color }}
              />

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-base font-medium text-vivea-black hover:text-vivea-rosewood transition-colors"
                    >
                      {item.product_name}
                    </Link>
                    <p className="text-sm text-vivea-coffee/60 mt-0.5">
                      {item.color} · Size {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.variant_id)}
                    className="text-vivea-coffee/50 hover:text-destructive transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  {/* Quantity */}
                  <div className="inline-flex items-center gap-2 border border-vivea-sand rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.variant_id, item.quantity - 1)
                      }
                      className="p-2 text-vivea-coffee hover:text-vivea-black"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-2 text-sm font-semibold tabular-nums min-w-[2ch] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.variant_id, item.quantity + 1)
                      }
                      className="p-2 text-vivea-coffee hover:text-vivea-black"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-lg font-semibold text-vivea-black">
                    {formatCents(item.unit_price * item.quantity)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-vivea-rosewood hover:underline"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-vivea-sand bg-vivea-off-white p-6">
            <h2 className="text-lg font-semibold text-vivea-black mb-4">
              Order Summary
            </h2>

            {/* Free shipping note */}
            <div className="mb-4 rounded-lg bg-vivea-sand/30 p-3">
              {hasFreeShipping ? (
                <p className="flex items-center gap-2 text-sm font-medium text-vivea-moss">
                  <Truck className="h-4 w-4" />
                  You&apos;ve unlocked free shipping!
                </p>
              ) : (
                <p className="flex items-center gap-2 text-sm text-vivea-coffee/80">
                  <Truck className="h-4 w-4" />
                  Add{" "}
                  <span className="font-semibold text-vivea-black">
                    {formatCents(remainingForFreeShipping)}
                  </span>{" "}
                  more for free shipping
                </p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-vivea-coffee/80">
                  Subtotal ({itemCount} items)
                </span>
                <span className="font-medium text-vivea-black">
                  {formatCents(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-vivea-coffee/80">Shipping</span>
                <span className="font-medium text-vivea-black">
                  {hasFreeShipping ? "Free" : "Calculated at checkout"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-vivea-coffee/80">Tax</span>
                <span className="text-vivea-coffee/60">Calculated at checkout</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-vivea-sand flex justify-between">
              <span className="text-base font-semibold text-vivea-black">
                Estimated Total
              </span>
              <span className="text-xl font-bold text-vivea-black">
                {formatCents(subtotal)}
              </span>
            </div>

            <Link
              href="/checkout"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full mt-5 h-12 text-base",
              })}
            >
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-3 text-center text-xs text-vivea-coffee/50">
              Free shipping on orders over $75 · 30-day returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
