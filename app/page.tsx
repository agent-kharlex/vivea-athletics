import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { EmailCapture } from "@/components/EmailCapture";
import { products, reviews, formatPrice } from "@/lib/products";
import { buttonVariants } from "@/components/ui/button";
import { ShieldCheck, Truck, RotateCcw, Droplets, Sparkles, Star, Quote } from "lucide-react";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "PFAs Free" },
  { icon: Truck, label: "Free Shipping $75+" },
  { icon: RotateCcw, label: "30-Day Returns" },
  { icon: Sparkles, label: "Sizes XS–3XL" },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Cameltoe Proof",
    description: "Our patented front panel eliminates cameltoe during any movement — squats, running, yoga, you name it.",
  },
  {
    icon: Droplets,
    title: "Moisture Wicking",
    description: "Advanced fabric technology pulls sweat away from your skin, keeping you dry through the hardest sessions.",
  },
  {
    icon: Sparkles,
    title: "PFAs Free",
    description: "No forever chemicals on your skin. Every fabric is tested and certified PFAs-free for your health.",
  },
  {
    icon: Star,
    title: "Size Inclusive",
    description: "From XS to 3XL, every piece is designed to fit and flatter real bodies in every size.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-vivea-sand/30 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-vivea-rosewood/15 px-3 py-1 text-xs font-medium text-vivea-rosewood uppercase tracking-wider">
              Cameltoe-Proof Athletic Wear
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-vivea-black tracking-tight">
              Train Hard.{" "}
              <span className="text-vivea-rosewood">Worry Zero.</span>
            </h1>
            <p className="mt-5 text-lg text-vivea-coffee/80 max-w-lg">
              PFAs-free, cameltoe-proof athletic apparel engineered for serious
              athletes. Move with confidence — nothing shows, nothing digs in.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/shop"
                className={buttonVariants({ variant: "default", size: "lg", className: "px-8 py-3 text-base h-12" })}
              >
                Shop Now
              </Link>
              <Link
                href="/shop?category=thongs"
                className={buttonVariants({ variant: "outline", size: "lg", className: "px-8 py-3 text-base h-12" })}
              >
                Explore Thongs
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative shape */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-vivea-rosewood/10 blur-3xl" />
        <div className="absolute right-10 bottom-0 h-48 w-48 rounded-full bg-vivea-moss/10 blur-3xl" />
      </section>

      {/* Trust bar */}
      <section className="border-y border-vivea-sand bg-vivea-off-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-center gap-2 py-5 px-4 text-center"
              >
                <item.icon className="h-5 w-5 text-vivea-rosewood shrink-0" />
                <span className="text-sm font-medium text-vivea-black">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-vivea-black">
                Best Sellers
              </h2>
              <p className="mt-1 text-sm text-vivea-coffee/70">
                Engineered for performance, designed for confidence.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline text-sm font-medium text-vivea-rosewood hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/shop"
              className={buttonVariants({ variant: "outline", size: "lg", className: "w-full" })}
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-vivea-black text-vivea-off-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Built Different. Built Better.
            </h2>
            <p className="mt-2 text-sm text-vivea-off-white/70 max-w-xl mx-auto">
              Every piece of Vivea apparel is engineered with four core
              principles that set us apart.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-vivea-off-white/10 mb-4">
                  <feature.icon className="h-7 w-7 text-vivea-rosewood" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-vivea-off-white/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-vivea-rosewood text-vivea-rosewood" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-vivea-black">
              Loved by 3,000+ Athletes
            </h2>
            <p className="mt-1 text-sm text-vivea-coffee/70">
              Real reviews from real athletes who train in Vivea.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-vivea-sand bg-vivea-off-white p-6"
              >
                <Quote className="h-8 w-8 text-vivea-sand mb-3" />
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-vivea-rosewood text-vivea-rosewood"
                          : "text-vivea-sand"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="font-semibold text-vivea-black">{review.title}</h3>
                <p className="mt-2 text-sm text-vivea-coffee/80 leading-relaxed">
                  &ldquo;{review.body}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-vivea-sand flex items-center justify-center text-xs font-bold text-vivea-coffee">
                    {review.author.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-vivea-black">
                    {review.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email capture */}
      <EmailCapture source="homepage" />

      {/* Bundle CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-r from-vivea-coffee to-vivea-rosewood px-6 py-12 sm:px-12 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-vivea-off-white">
              Save 10% with the Essential Pack
            </h2>
            <p className="mt-2 text-vivea-off-white/80 max-w-lg mx-auto">
              Get one of each style — Mid-Rise Thong, High-Rise Thong, and
              Sculpt Bodysuit — at 10% off.
            </p>
            <p className="mt-3 text-3xl font-bold text-vivea-off-white">
              {formatPrice(8550)}{" "}
              <span className="text-lg font-normal line-through text-vivea-off-white/50">
                {formatPrice(9500)}
              </span>
            </p>
            <Link
              href="/shop"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "mt-6 bg-vivea-off-white text-vivea-black hover:bg-vivea-sand border-0 px-8 h-12 text-base",
              })}
            >
              Shop the Bundle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
