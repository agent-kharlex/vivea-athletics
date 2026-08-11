"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart-context";
import { Lock, ShieldCheck, Truck, Check, ShoppingBag } from "lucide-react";
import Link from "next/link";

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

const COUNTRIES = ["United States", "Canada", "United Kingdom", "Australia"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, itemCount } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = hasFreeShipping ? 0 : 595; // $5.95 flat
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate Stripe redirect — in production this creates a Checkout Session
    setTimeout(() => {
      router.push("/order-confirmation");
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-vivea-sand/40 mb-6">
          <ShoppingBag className="h-9 w-9 text-vivea-coffee/50" />
        </div>
        <h1 className="text-2xl font-bold text-vivea-black">
          Nothing to check out
        </h1>
        <p className="mt-2 text-sm text-vivea-coffee/70">
          Your cart is empty. Add some products first.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-vivea-black px-8 text-base font-medium text-vivea-off-white hover:bg-vivea-coffee transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-3xl font-bold text-vivea-black mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-vivea-sand bg-vivea-off-white p-6">
            <h2 className="text-lg font-semibold text-vivea-black mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="mb-1.5 block">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-10"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-vivea-sand bg-vivea-off-white p-6">
            <h2 className="text-lg font-semibold text-vivea-black mb-4">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="mb-1.5 block">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Jane Doe"
                  required
                  className="h-10"
                />
              </div>
              <div>
                <Label htmlFor="address" className="mb-1.5 block">
                  Street Address
                </Label>
                <Input
                  id="address"
                  placeholder="123 Main St"
                  required
                  className="h-10"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="mb-1.5 block">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="Portland"
                    required
                    className="h-10"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="mb-1.5 block">
                    State / Province
                  </Label>
                  <Input
                    id="state"
                    placeholder="OR"
                    required
                    className="h-10"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zip" className="mb-1.5 block">
                    ZIP / Postal Code
                  </Label>
                  <Input
                    id="zip"
                    placeholder="97201"
                    required
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="mb-1.5 block">Country</Label>
                  <Select required>
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-vivea-coffee/70">
            <span className="flex items-center gap-1.5">
              <Lock className="h-4 w-4 text-vivea-moss" /> Secure Checkout
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-vivea-moss" /> PFAs Free
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-4 w-4 text-vivea-moss" /> Free Ship $75+
            </span>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-vivea-sand bg-vivea-off-white p-6">
            <h2 className="text-lg font-semibold text-vivea-black mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.variant_id} className="flex gap-3">
                  <div
                    className="h-14 w-12 shrink-0 rounded-md relative"
                    style={{ backgroundColor: item.image_color }}
                  >
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-vivea-coffee text-[10px] font-bold text-vivea-off-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-vivea-black truncate">
                      {item.product_name}
                    </p>
                    <p className="text-xs text-vivea-coffee/60">
                      {item.color} · {item.size}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-vivea-black shrink-0">
                    {formatCents(item.unit_price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm border-t border-vivea-sand pt-4">
              <div className="flex justify-between">
                <span className="text-vivea-coffee/80">
                  Subtotal ({itemCount})
                </span>
                <span className="font-medium text-vivea-black">
                  {formatCents(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-vivea-coffee/80">Shipping</span>
                <span className="font-medium text-vivea-black">
                  {shipping === 0 ? "Free" : formatCents(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-vivea-coffee/80">Tax (8%)</span>
                <span className="font-medium text-vivea-black">
                  {formatCents(tax)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-vivea-sand flex justify-between">
              <span className="text-base font-semibold text-vivea-black">
                Total
              </span>
              <span className="text-xl font-bold text-vivea-black">
                {formatCents(total)}
              </span>
            </div>

            {/* Pay button */}
            <Button
              type="submit"
              disabled={isProcessing}
              size="lg"
              className="w-full mt-5 h-12 text-base"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <Lock className="h-4 w-4" /> Pay with Stripe
                </>
              )}
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-vivea-coffee/50">
              <Check className="h-3.5 w-3.5 text-vivea-moss" />
              Secure 256-bit SSL encryption
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
