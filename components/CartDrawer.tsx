"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal, itemCount } =
    useCart();

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="border-b border-vivea-sand px-5 py-4">
          <SheetTitle className="text-lg font-semibold text-vivea-black">
            Your Cart ({itemCount})
          </SheetTitle>
          <SheetDescription className="text-sm text-vivea-coffee/60">
            {itemCount === 0
              ? "Your cart is empty"
              : `${itemCount} item${itemCount > 1 ? "s" : ""} ready to go`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-vivea-sand/40">
              <ShoppingBag className="h-7 w-7 text-vivea-coffee/50" />
            </div>
            <p className="text-sm text-vivea-coffee/60">
              Your cart is empty. Start shopping to find your perfect fit.
            </p>
            <SheetClose
              render={
                <Link
                  href="/shop"
                  className={buttonVariants({ variant: "default", size: "lg" })}
                />
              }
            >
              Shop Now
            </SheetClose>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b border-vivea-sand px-5 py-3">
              {remainingForFreeShipping > 0 ? (
                <p className="text-xs text-vivea-coffee/70">
                  Add{" "}
                  <span className="font-semibold text-vivea-black">
                    {formatCents(remainingForFreeShipping)}
                  </span>{" "}
                  more for free shipping
                </p>
              ) : (
                <p className="text-xs font-medium text-vivea-moss">
                  🎉 You&apos;ve unlocked free shipping!
                </p>
              )}
              <div className="mt-2 h-1.5 w-full rounded-full bg-vivea-sand/50">
                <div
                  className="h-full rounded-full bg-vivea-moss transition-all"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.variant_id}
                  className="flex gap-3 border-b border-vivea-sand/50 pb-4 last:border-0"
                >
                  {/* Image placeholder */}
                  <div
                    className="h-20 w-16 shrink-0 rounded-md"
                    style={{ backgroundColor: item.image_color }}
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-sm font-medium text-vivea-black hover:text-vivea-rosewood"
                    >
                      {item.product_name}
                    </Link>
                    <p className="text-xs text-vivea-coffee/60 mt-0.5">
                      {item.color} · {item.size}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 border border-vivea-sand rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.variant_id, item.quantity - 1)
                          }
                          className="p-1.5 text-vivea-coffee hover:text-vivea-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.variant_id, item.quantity + 1)
                          }
                          className="p-1.5 text-vivea-coffee hover:text-vivea-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      {/* Price + remove */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-vivea-black">
                          {formatCents(item.unit_price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.variant_id)}
                          className="text-vivea-coffee/50 hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-vivea-sand px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-vivea-coffee/80">Subtotal</span>
                <span className="text-lg font-semibold text-vivea-black">
                  {formatCents(subtotal)}
                </span>
              </div>
              <p className="text-xs text-vivea-coffee/60">
                Shipping &amp; taxes calculated at checkout.
              </p>
              <SheetClose
                render={
                  <Link
                    href="/checkout"
                    className={buttonVariants({
                      variant: "default",
                      size: "lg",
                      className: "w-full",
                    })}
                  />
                }
              >
                Checkout
              </SheetClose>
              <SheetClose
                render={
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className: "w-full",
                    })}
                  />
                }
              >
                View Full Cart
              </SheetClose>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
