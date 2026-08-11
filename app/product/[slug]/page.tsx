import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/products";
import { ProductDetail } from "./product-detail";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: "Product Not Found — Vivea Athletics" };
  }
  return {
    title: `${product.name} — Vivea Athletics`,
    description: product.description,
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  return <ProductDetail product={product} />;
}
