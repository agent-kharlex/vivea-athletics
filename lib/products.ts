// ============================================================================
// Vivea Athletics — Mock Product Data
// Matches supabase/seed.sql: 3 products, 5 colors, 7 sizes (XS–3XL), 2 bundles.
// Hardcoded so the frontend runs without Supabase.
// ============================================================================

export interface ProductColor {
  name: string;
  hex: string;
}

export interface MockProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  tagline: string;
  category: "thongs" | "bodysuits";
  price: number; // cents
  compare_at_price: number | null;
  colors: ProductColor[];
  sizes: string[];
  features: string[];
  bulletPoints: string[];
  rating: number;
  review_count: number;
  /** Primary placeholder color for image area. */
  image_color: string;
  /** Additional gallery placeholder colors. */
  gallery_colors: string[];
}

export interface MockBundle {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number; // cents
  compare_at_price: number | null;
  discount_percent: number;
  items: { product_name: string; quantity: number }[];
}

export interface MockReview {
  id: string;
  product_slug: string;
  author: string;
  rating: number;
  title: string;
  body: string;
}

// ---------------------------------------------------------------------------
// Shared color + size data (matches seed.sql)
// ---------------------------------------------------------------------------

export const PRODUCT_COLORS: ProductColor[] = [
  { name: "Sand", hex: "#E8DDD0" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Coffee", hex: "#6B5750" },
  { name: "Moss", hex: "#5C6B4D" },
  { name: "Rosewood", hex: "#A0786D" },
];

export const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

export const products: MockProduct[] = [
  {
    id: "prod-mid-rise-thong",
    slug: "mid-rise-thong",
    name: "Mid-Rise Thong",
    description:
      "Buttery-soft modal thong with a mid-rise waistband that stays put without digging in. Engineered with our cameltoe-proof front panel and moisture-wicking fabric for zero distractions during training.",
    tagline: "Buttery-soft modal with a stay-put mid-rise waistband.",
    category: "thongs",
    price: 2400,
    compare_at_price: null,
    colors: PRODUCT_COLORS,
    sizes: PRODUCT_SIZES,
    features: ["Cameltoe Proof", "Moisture Wicking", "PFAs Free", "Size Inclusive"],
    bulletPoints: [
      "Cameltoe-proof front panel for total confidence",
      "Buttery-soft modal blend that moves with you",
      "Mid-rise waistband stays put without digging in",
      "Moisture-wicking fabric keeps you dry",
      "PFAs-free — no forever chemicals on your skin",
      "Seamless edges for no-show under anything",
    ],
    rating: 4.8,
    review_count: 327,
    image_color: "#E8DDD0",
    gallery_colors: ["#E8DDD0", "#6B5750", "#5C6B4D"],
  },
  {
    id: "prod-high-rise-thong",
    slug: "high-rise-thong",
    name: "High-Rise Thong",
    description:
      "Seamless high-rise thong engineered for a sculpting, no-show fit under anything. Features our signature cameltoe-proof construction and a high-rise waistband that smooths and supports.",
    tagline: "Seamless high-rise with a sculpting, no-show fit.",
    category: "thongs",
    price: 2600,
    compare_at_price: null,
    colors: PRODUCT_COLORS,
    sizes: PRODUCT_SIZES,
    features: ["Cameltoe Proof", "Moisture Wicking", "PFAs Free", "Size Inclusive"],
    bulletPoints: [
      "Cameltoe-proof front panel for total confidence",
      "High-rise sculpting waistband smooths and supports",
      "Seamless construction for zero visibility under clothing",
      "Moisture-wicking fabric keeps you cool and dry",
      "PFAs-free — no forever chemicals on your skin",
      "Full coverage back with a barely-there feel",
    ],
    rating: 4.9,
    review_count: 214,
    image_color: "#A0786D",
    gallery_colors: ["#A0786D", "#1A1A1A", "#6B5750"],
  },
  {
    id: "prod-sculpt-bodysuit",
    slug: "sculpt-bodysuit",
    name: "Sculpt Bodysuit",
    description:
      "Second-skin compression bodysuit with light contouring and a snap closure. Designed to sculpt and support through every movement, with our cameltoe-proof technology built in.",
    tagline: "Second-skin compression with light contouring.",
    category: "bodysuits",
    price: 4500,
    compare_at_price: null,
    colors: PRODUCT_COLORS,
    sizes: PRODUCT_SIZES,
    features: ["Cameltoe Proof", "Moisture Wicking", "PFAs Free", "Size Inclusive"],
    bulletPoints: [
      "Cameltoe-proof front panel for total confidence",
      "Second-skin compression with light contouring",
      "Snap closure for easy on and off",
      "Moisture-wicking fabric keeps you dry through any workout",
      "PFAs-free — no forever chemicals on your skin",
      "Sculpting fit that supports through every movement",
    ],
    rating: 4.7,
    review_count: 156,
    image_color: "#5C6B4D",
    gallery_colors: ["#5C6B4D", "#E8DDD0", "#A0786D"],
  },
];

// ---------------------------------------------------------------------------
// Bundles
// ---------------------------------------------------------------------------

export const bundles: MockBundle[] = [
  {
    id: "bundle-essential-pack",
    slug: "essential-pack",
    name: "Essential Pack",
    description: "One of each style — the full Vivea Athletics lineup at 10% off.",
    price: 8550,
    compare_at_price: 9500,
    discount_percent: 10,
    items: [
      { product_name: "Mid-Rise Thong", quantity: 1 },
      { product_name: "High-Rise Thong", quantity: 1 },
      { product_name: "Sculpt Bodysuit", quantity: 1 },
    ],
  },
  {
    id: "bundle-mixed-rise-2-pack",
    slug: "mixed-rise-2-pack",
    name: "Mixed Rise 2-Pack",
    description: "One Mid-Rise and one High-Rise thong — best of both worlds, 10% off.",
    price: 4500,
    compare_at_price: 5000,
    discount_percent: 10,
    items: [
      { product_name: "Mid-Rise Thong", quantity: 1 },
      { product_name: "High-Rise Thong", quantity: 1 },
    ],
  },
];

// ---------------------------------------------------------------------------
// Reviews (social proof)
// ---------------------------------------------------------------------------

export const reviews: MockReview[] = [
  {
    id: "rev-1",
    product_slug: "mid-rise-thong",
    author: "Jamie R.",
    rating: 5,
    title: "Finally — no cameltoe during squats!",
    body: "I've tried every brand out there and this is the first thong that actually stays in place and doesn't show during heavy lifting sessions. The cameltoe-proof panel is real. Buying in every color.",
  },
  {
    id: "rev-2",
    product_slug: "high-rise-thong",
    author: "Taylor M.",
    rating: 5,
    title: "Invisible under my leggings",
    body: "The high-rise waistband smooths everything out and there's zero VPL. I forget I'm even wearing it during hot yoga. The moisture-wicking is no joke — I stay completely dry.",
  },
  {
    id: "rev-3",
    product_slug: "sculpt-bodysuit",
    author: "Casey L.",
    rating: 5,
    title: "Holds everything in without squeezing",
    body: "The compression is perfect — supportive but not restrictive. I wear it to the gym and then straight to brunch after. PFAs-free was the deciding factor for me and the quality exceeds expectations.",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getProductBySlug(slug: string): MockProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function getColorByName(name: string): ProductColor | undefined {
  return PRODUCT_COLORS.find((c) => c.name === name);
}
