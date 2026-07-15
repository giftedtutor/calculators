"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { CALCULATORS } from "@/lib/site";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-[#f7fafb]/85 backdrop-blur-md">
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

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white md:hidden"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="px-3 pt-2 text-xs font-semibold uppercase tracking-wider text-ink-soft">
              Calculators
            </p>
            {CALCULATORS.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="rounded-lg px-3 py-2 text-sm text-ink-muted"
                onClick={() => setOpen(false)}
              >
                {c.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
