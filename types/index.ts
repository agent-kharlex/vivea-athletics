// ============================================================================
// Vivea Athletics — TypeScript Type Definitions
// Core domain types for products, bundles, orders, and email captures.
// ============================================================================

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  /** Short marketing tagline shown on cards and listings. */
  tagline: string | null;
  /** Category bucket: e.g. "apparel", "equipment", "accessories". */
  category: ProductCategory;
  /** Full-price in cents (USD). Discounts applied at the variant or order level. */
  price: number;
  /** Optional compare-at price for showing original / sale pricing. */
  compare_at_price: number | null;
  currency: string;
  /** Primary hero image URL. */
  image_url: string | null;
  /** Additional gallery image URLs. */
  images: string[];
  /** Inventory available across all variants (denormalized for quick checks). */
  inventory_count: number;
  /** Whether the product has multiple variants (sizes, colors, etc.). */
  has_variants: boolean;
  is_active: boolean;
  is_featured: boolean;
  /** SEO metadata. */
  meta_title: string | null;
  meta_description: string | null;
  /** Stripe product ID linked to this product. */
  stripe_product_id: string | null;
  created_at: string;
  updated_at: string;
}

export type ProductCategory =
  | "apparel"
  | "equipment"
  | "accessories"
  | "bundles"
  | "supplements";

// ---------------------------------------------------------------------------
// Product Variant
// ---------------------------------------------------------------------------

export interface ProductVariant {
  id: string;
  product_id: string;
  /** Human-readable label, e.g. "Medium / Black". */
  name: string;
  /** Variant-specific price override in cents (null = use product price). */
  price: number | null;
  /** Size designation: S, M, L, XL, One Size, etc. */
  size: string | null;
  /** Color or pattern name. */
  color: string | null;
  /** SKU for inventory tracking. */
  sku: string | null;
  /** Stock count for this specific variant. */
  inventory_count: number;
  /** Whether this variant is currently purchasable. */
  is_active: boolean;
  /** Stripe price ID for this variant. */
  stripe_price_id: string | null;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Bundle
// ---------------------------------------------------------------------------

export interface Bundle {
  id: string;
  slug: string;
  name: string;
  description: string;
  tagline: string | null;
  /** Bundled price in cents — typically lower than sum of individual products. */
  price: number;
  compare_at_price: number | null;
  currency: string;
  image_url: string | null;
  /** Products included in this bundle with their quantities. */
  items: BundleItem[];
  is_active: boolean;
  is_featured: boolean;
  meta_title: string | null;
  meta_description: string | null;
  stripe_product_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface BundleItem {
  product_id: string;
  product_name: string;
  variant_id: string | null;
  quantity: number;
}

// ---------------------------------------------------------------------------
// Order
// ---------------------------------------------------------------------------

export type OrderStatus =
  | "pending"
  | "paid"
  | "fulfilled"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus =
  | "unpaid"
  | "paid"
  | "partially_paid"
  | "refunded"
  | "partially_refunded"
  | "failed";

export interface Order {
  id: string;
  /** Sequential order number for customer-facing display. */
  order_number: string;
  customer_email: string;
  customer_name: string;
  /** Shipping address (null for digital-only orders). */
  shipping_address: ShippingAddress | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  /** Subtotal in cents (sum of line items before shipping/tax). */
  subtotal: number;
  /** Shipping cost in cents. */
  shipping_cost: number;
  /** Tax amount in cents. */
  tax: number;
  /** Discount amount in cents. */
  discount: number;
  /** Final total in cents. */
  total: number;
  currency: string;
  /** Items in this order. */
  items: OrderItem[];
  /** Stripe checkout session ID. */
  stripe_session_id: string | null;
  /** Stripe payment intent ID. */
  stripe_payment_intent_id: string | null;
  /** Notes from the customer. */
  customer_notes: string | null;
  /** Tracking number once shipped. */
  tracking_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  variant_id: string | null;
  variant_name: string | null;
  /** Unit price at time of purchase (cents). */
  unit_price: number;
  quantity: number;
  /** Line total = unit_price * quantity (cents). */
  line_total: number;
  /** Image URL of the product at time of purchase. */
  image_url: string | null;
  /** Stripe line item ID. */
  stripe_line_item_id: string | null;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string | null;
}

// ---------------------------------------------------------------------------
// Email Capture
// ---------------------------------------------------------------------------

export type EmailCaptureSource =
  | "waitlist"
  | "newsletter"
  | "lead_magnet"
  | "exit_intent"
  | "footer"
  | "product_page"
  | "checkout_abandoned";

export type EmailCaptureStatus = "pending" | "subscribed" | "unsubscribed";

export interface EmailCapture {
  id: string;
  email: string;
  /** First name if provided. */
  first_name: string | null;
  /** Where the email was captured. */
  source: EmailCaptureSource;
  status: EmailCaptureStatus;
  /** Tags for segmentation. */
  tags: string[];
  /** Product the user showed interest in (for targeted follow-ups). */
  product_id: string | null;
  /** Whether the user has consented to marketing emails. */
  consent: boolean;
  /** IP address for compliance tracking. */
  ip_address: string | null;
  /** User agent for compliance tracking. */
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

// ---------------------------------------------------------------------------
// Cart (bonus — useful for e-commerce flows)
// ---------------------------------------------------------------------------

export interface CartItem {
  product_id: string;
  product_name: string;
  variant_id: string | null;
  variant_name: string | null;
  unit_price: number;
  quantity: number;
  image_url: string | null;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  item_count: number;
}
