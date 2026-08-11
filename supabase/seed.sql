-- ============================================================================
-- Vivea Athletics — Seed Data
-- ============================================================================
-- Inserts 3 products, 35 variants each (7 sizes × 5 colours),
-- and 2 bundles with associated bundle_items.
-- Run AFTER schema.sql.
-- ============================================================================

DO $$
DECLARE
  -- Product IDs
  p_mid    uuid;
  p_high   uuid;
  p_sculpt uuid;

  -- Bundle IDs
  b_essential uuid;
  b_mixed     uuid;

  -- Loop vars
  sz  text;
  col text;
  sku text;

  sizes   text[] := ARRAY['XS','S','M','L','XL','2XL','3XL'];
  colours text[] := ARRAY['Sand','Black','Coffee','Moss','Rosewood'];
BEGIN
  -- ========================================================================
  -- Products
  -- ========================================================================
  INSERT INTO public.products (id, slug, name, description, price_cents, category, is_active, is_preorder, created_at)
  VALUES
    (gen_random_uuid(), 'mid-rise-thong', 'Mid-Rise Thong',
     'Buttery-soft modal thong with a mid-rise waistband that stays put without digging in.',
     2400, 'thongs', true, false, now())
  RETURNING id INTO p_mid;

  INSERT INTO public.products (id, slug, name, description, price_cents, category, is_active, is_preorder, created_at)
  VALUES
    (gen_random_uuid(), 'high-rise-thong', 'High-Rise Thong',
     'Seamless high-rise thong engineered for a sculpting, no-show fit under anything.',
     2600, 'thongs', true, false, now())
  RETURNING id INTO p_high;

  INSERT INTO public.products (id, slug, name, description, price_cents, category, is_active, is_preorder, created_at)
  VALUES
    (gen_random_uuid(), 'sculpt-bodysuit', 'Sculpt Bodysuit',
     'Second-skin compression bodysuit with light contouring and a snap closure.',
     4500, 'bodysuits', true, false, now())
  RETURNING id INTO p_sculpt;

  -- ========================================================================
  -- Product Variants (7 sizes × 5 colours = 35 per product)
  -- ========================================================================

  -- Mid-Rise Thong variants
  FOREACH sz IN ARRAY sizes LOOP
    FOREACH col IN ARRAY colours LOOP
      sku := 'MRT-' || sz || '-' || upper(replace(col, ' ', ''));
      INSERT INTO public.product_variants (id, product_id, size, colour, sku, stock_count, is_active)
      VALUES (gen_random_uuid(), p_mid, sz, col, sku, 100, true);
    END LOOP;
  END LOOP;

  -- High-Rise Thong variants
  FOREACH sz IN ARRAY sizes LOOP
    FOREACH col IN ARRAY colours LOOP
      sku := 'HRT-' || sz || '-' || upper(replace(col, ' ', ''));
      INSERT INTO public.product_variants (id, product_id, size, colour, sku, stock_count, is_active)
      VALUES (gen_random_uuid(), p_high, sz, col, sku, 100, true);
    END LOOP;
  END LOOP;

  -- Sculpt Bodysuit variants
  FOREACH sz IN ARRAY sizes LOOP
    FOREACH col IN ARRAY colours LOOP
      sku := 'SBS-' || sz || '-' || upper(replace(col, ' ', ''));
      INSERT INTO public.product_variants (id, product_id, size, colour, sku, stock_count, is_active)
      VALUES (gen_random_uuid(), p_sculpt, sz, col, sku, 100, true);
    END LOOP;
  END LOOP;

  -- ========================================================================
  -- Bundles
  -- ========================================================================
  INSERT INTO public.bundles (id, slug, name, description, price_cents, discount_percent)
  VALUES
    (gen_random_uuid(), 'essential-pack', 'Essential Pack',
     'One of each style — the full Vivea Athletics lineup at 10% off.',
     8550, 10.00)
  RETURNING id INTO b_essential;

  INSERT INTO public.bundles (id, slug, name, description, price_cents, discount_percent)
  VALUES
    (gen_random_uuid(), 'mixed-rise-2-pack', 'Mixed Rise 2-Pack',
     'One Mid-Rise and one High-Rise thong — best of both worlds, 10% off.',
     4500, 10.00)
  RETURNING id INTO b_mixed;

  -- ========================================================================
  -- Bundle Items
  -- ========================================================================
  -- Essential Pack: 1 of each product
  INSERT INTO public.bundle_items (id, bundle_id, product_id, quantity) VALUES
    (gen_random_uuid(), b_essential, p_mid,    1),
    (gen_random_uuid(), b_essential, p_high,   1),
    (gen_random_uuid(), b_essential, p_sculpt, 1);

  -- Mixed Rise 2-Pack: 1 mid + 1 high
  INSERT INTO public.bundle_items (id, bundle_id, product_id, quantity) VALUES
    (gen_random_uuid(), b_mixed, p_mid,  1),
    (gen_random_uuid(), b_mixed, p_high, 1);
END $$;
