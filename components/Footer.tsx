import Link from "next/link";
import { Mail } from "lucide-react";

const FOOTER_SECTIONS = [
  {
    title: "Shop",
    links: [
      { label: "Shop All", href: "/shop" },
      { label: "Thongs", href: "/shop?category=thongs" },
      { label: "Bodysuits", href: "/shop?category=bodysuits" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping & Returns", href: "#" },
      { label: "Size Guide", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-vivea-black text-vivea-off-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-[0.2em] text-vivea-off-white"
            >
              VIVEA
            </Link>
            <p className="mt-3 text-sm text-vivea-off-white/70 max-w-xs">
              Cameltoe-proof, PFAs-free athletic apparel engineered for serious
              athletes. Train hard. Worry zero.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-vivea-off-white/70">
              <Mail className="h-4 w-4" />
              <a href="mailto:hello@vivea-athletics.com" className="hover:text-vivea-off-white transition-colors">
                hello@vivea-athletics.com
              </a>
            </div>
          </div>

          {/* Link sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-vivea-off-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-vivea-off-white/70 hover:text-vivea-off-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-vivea-off-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-vivea-off-white/60">
            © {new Date().getFullYear()} Vivea Athletics. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-vivea-off-white/60">
            <Link href="#" className="hover:text-vivea-off-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-vivea-off-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-vivea-off-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
