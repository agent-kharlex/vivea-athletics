import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Check, Mail, Package, ArrowRight } from "lucide-react";

export default function OrderConfirmationPage() {
  // Generate a random-ish order number (deterministic enough for display)
  const orderNumber = `VVA-${Date.now().toString().slice(-8)}`;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
      {/* Success check */}
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-vivea-moss/15 mb-6">
        <Check className="h-10 w-10 text-vivea-moss" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-vivea-black">
        Thank You!
      </h1>
      <p className="mt-3 text-lg text-vivea-coffee/80">
        Your order has been placed successfully.
      </p>

      {/* Order number */}
      <div className="mt-8 inline-flex flex-col items-center gap-1 rounded-xl border border-vivea-sand bg-vivea-off-white px-8 py-5">
        <span className="text-xs uppercase tracking-wider text-vivea-coffee/60">
          Order Number
        </span>
        <span className="text-xl font-bold text-vivea-black">
          {orderNumber}
        </span>
      </div>

      {/* Email confirmation */}
      <div className="mt-8 flex items-start gap-3 rounded-lg bg-vivea-sand/30 p-4 text-left">
        <Mail className="h-5 w-5 text-vivea-rosewood shrink-0 mt-0.5" />
        <p className="text-sm text-vivea-coffee/80">
          A confirmation email has been sent to your inbox with your order
          details and tracking information. You&apos;ll receive another email
          once your order ships.
        </p>
      </div>

      {/* What's next */}
      <div className="mt-6 flex items-start gap-3 rounded-lg bg-vivea-sand/30 p-4 text-left">
        <Package className="h-5 w-5 text-vivea-rosewood shrink-0 mt-0.5" />
        <p className="text-sm text-vivea-coffee/80">
          Orders are typically processed within 1–2 business days. Free
          shipping on orders over $75. Expect delivery in 3–5 business days.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/shop"
        className={buttonVariants({
          variant: "default",
          size: "lg",
          className: "mt-8 px-8 h-12 text-base",
        })}
      >
        Continue Shopping <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
