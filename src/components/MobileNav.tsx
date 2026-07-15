"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = { href: string; label: string };
type CalcItem = { slug: string; title: string };

export function MobileNav({ nav, calculators }: { nav: NavItem[]; calculators: CalcItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white"
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

      {open ? (
        <div className="absolute inset-x-0 top-[var(--header-h)] border-b border-t border-line bg-white">
          <nav className="container flex flex-col gap-1 py-3" aria-label="Mobile">
            {nav.map((item) => (
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
            {calculators.map((c) => (
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
      ) : null}
    </div>
  );
}
