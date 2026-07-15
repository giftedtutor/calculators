import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { CALCULATORS } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-[#f7fafb]/95 md:bg-[#f7fafb]/85 md:backdrop-blur-md">
      <div className="container flex h-[var(--header-h)] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-white hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <div className="group relative ml-1">
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-white hover:text-ink"
              aria-haspopup="true"
            >
              Popular
            </button>
            <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 translate-y-1 rounded-xl border border-line bg-white p-2 opacity-0 shadow-[var(--shadow)] transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              {CALCULATORS.slice(0, 6).map((c) => (
                <Link
                  key={c.slug}
                  href={`/calculators/${c.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-accent-soft hover:text-accent-deep"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <MobileNav nav={NAV} calculators={CALCULATORS.map((c) => ({ slug: c.slug, title: c.title }))} />
      </div>
    </header>
  );
}
