"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { CartDrawer } from "@/components/CartDrawer";

const NAV_LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=thongs", label: "Thongs" },
  { href: "/shop?category=bodysuits", label: "Bodysuits" },
];

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-vivea-black text-vivea-off-white text-center text-xs sm:text-sm py-2 px-4 font-medium tracking-wide">
        <span className="hidden sm:inline">🎉 Take 10% off your first order · </span>
        Free shipping on orders over $75
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-40 bg-vivea-off-white/95 backdrop-blur-sm border-b border-vivea-sand">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 -ml-2 text-vivea-black"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-bold tracking-[0.2em] text-vivea-black"
            >
              VIVEA
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-vivea-black hover:text-vivea-rosewood transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 -mr-2 text-vivea-black hover:text-vivea-rosewood transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-vivea-rosewood text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile nav */}
          {mobileOpen && (
            <div className="md:hidden border-t border-vivea-sand py-4">
              <div className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-vivea-black hover:text-vivea-rosewood transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <CartDrawer />
    </>
  );
}
