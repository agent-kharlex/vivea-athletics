import Link from "next/link";
import type { MockProduct } from "@/lib/products";
import { formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: MockProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      {/* Image placeholder */}
      <div
        className="aspect-[4/5] w-full rounded-lg overflow-hidden relative transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundColor: product.image_color }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white/40 text-sm font-medium uppercase tracking-wider">
            {product.name}
          </span>
        </div>
        {/* Featured badge */}
        {product.compare_at_price && (
          <span className="absolute top-3 left-3 bg-vivea-rosewood text-white text-xs font-medium px-2 py-1 rounded">
            Sale
          </span>
        )}
      </div>

      {/* Product info */}
      <div className="mt-3">
        <h3 className="text-sm font-medium text-vivea-black">{product.name}</h3>
        <p className="text-sm text-vivea-coffee/70 mt-0.5">{product.tagline}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <p className="text-base font-semibold text-vivea-black">
            {formatPrice(product.price)}
          </p>
          {/* Color dots */}
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="h-3 w-3 rounded-full border border-vivea-black/15"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
