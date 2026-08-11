-- ============================================================================
-- Vivea Athletics — Supabase Database Schema
-- ============================================================================
-- Creates all tables, RLS policies, triggers, and indexes for the
-- Vivea Athletics e-commerce store.
-- ============================================================================

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- Trigger Function: auto-update updated_at on row change
-- ============================================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. products
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text        UNIQUE NOT NULL,
  name         text        NOT NULL,
  description  text,
  price_cents  int         NOT NULL CHECK (price_cents >= 0),
  category     text,
  image_url    text,
  is_active    boolean     NOT NULL DEFAULT true,
  is_preorder  boolean     NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 2. product_variants
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.product_variants (
  id           uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id   uuid    NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  size         text    CHECK (size IN ('XS','S','M','L','XL','2XL','3XL')),
  colour       text,
  sku          text    UNIQUE,
  stock_count  int     NOT NULL DEFAULT 0 CHECK (stock_count >= 0),
  is_active    boolean NOT NULL DEFAULT true,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER product_variants_set_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_product_variants_product_id
  ON public.product_variants(product_id);

-- ============================================================================
-- 3. bundles
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bundles (
  id               uuid    PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text    UNIQUE NOT NULL,
  name             text    NOT NULL,
  description      text,
  price_cents      int     NOT NULL CHECK (price_cents >= 0),
  discount_percent numeric NOT NULL DEFAULT 0 CHECK (discount_percent >= 0 AND discount_percent <= 100),
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER bundles_set_updated_at
  BEFORE UPDATE ON public.bundles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- 4. bundle_items
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bundle_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id   uuid NOT NULL REFERENCES public.bundles(id) ON DELETE CASCADE,
  product_id  uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity    int  NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER bundle_items_set_updated_at
  BEFORE UPDATE ON public.bundle_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_bundle_items_bundle_id
  ON public.bundle_items(bundle_id);

-- ============================================================================
-- 5. orders
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email               text        NOT NULL,
  status              text        NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending','paid','shipped','delivered','cancelled')),
  total_cents         int         NOT NULL DEFAULT 0 CHECK (total_cents >= 0),
  stripe_session_id   text,
  shipping_name       text,
  shipping_address    text,
  shipping_city       text,
  shipping_state      text,
  shipping_zip        text,
  shipping_country    text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  paid_at             timestamptz,
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER orders_set_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_orders_email           ON public.orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status           ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session  ON public.orders(stripe_session_id);

-- ============================================================================
-- 6. order_items
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id          uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id        uuid REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id        uuid REFERENCES public.product_variants(id) ON DELETE SET NULL,
  quantity          int  NOT NULL DEFAULT 1 CHECK (quantity > 0),
  unit_price_cents  int  NOT NULL CHECK (unit_price_cents >= 0),
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER order_items_set_updated_at
  BEFORE UPDATE ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX IF NOT EXISTS idx_order_items_order_id   ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_variant_id ON public.order_items(variant_id);

-- ============================================================================
-- 7. email_captures
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.email_captures (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email          text        UNIQUE NOT NULL,
  source         text,
  discount_code  text,
  converted      boolean     NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TRIGGER email_captures_set_updated_at
  BEFORE UPDATE ON public.email_captures
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- Row Level Security
-- ============================================================================
ALTER TABLE public.products          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundle_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_captures    ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Policies: products — public read, authenticated write
-- ----------------------------------------------------------------------------
CREATE POLICY "products_public_read"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "products_authenticated_write"
  ON public.products FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- Policies: product_variants — public read, authenticated write
-- ----------------------------------------------------------------------------
CREATE POLICY "product_variants_public_read"
  ON public.product_variants FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "product_variants_authenticated_write"
  ON public.product_variants FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- Policies: bundles — public read, authenticated write
-- ----------------------------------------------------------------------------
CREATE POLICY "bundles_public_read"
  ON public.bundles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "bundle_items_public_read"
  ON public.bundle_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "bundles_authenticated_write"
  ON public.bundles FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "bundle_items_authenticated_write"
  ON public.bundle_items FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- Policies: orders — authenticated read, public insert
-- ----------------------------------------------------------------------------
CREATE POLICY "orders_authenticated_read"
  ON public.orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "orders_public_insert"
  ON public.orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "orders_authenticated_update"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- Policies: order_items — authenticated read, public insert
-- ----------------------------------------------------------------------------
CREATE POLICY "order_items_authenticated_read"
  ON public.order_items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "order_items_public_insert"
  ON public.order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- Policies: email_captures — public insert, authenticated read
-- ----------------------------------------------------------------------------
CREATE POLICY "email_captures_public_insert"
  ON public.email_captures FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "email_captures_authenticated_read"
  ON public.email_captures FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "email_captures_authenticated_update"
  ON public.email_captures FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
