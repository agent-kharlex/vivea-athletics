import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET() {
  try {
    // Try Supabase first — but env vars may be placeholders, so fall back gracefully
    // For now, return mock data (production will use Supabase)
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", products },
      { status: 200 }
    );
  }
}
