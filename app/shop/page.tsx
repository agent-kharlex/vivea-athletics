import { Suspense } from "react";
import { ShopContent } from "./shop-content";

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-sm text-vivea-coffee/60">Loading products…</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
