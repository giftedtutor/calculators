import Link from "next/link";
import type { ReactNode } from "react";
import type { CalculatorMeta } from "@/lib/site";
import { AdSlot } from "./AdSlot";

type Props = {
  calc: CalculatorMeta;
  children: ReactNode;
  howTo?: string[];
};

export function CalculatorShell({ calc, children, howTo }: Props) {
  return (
    <div className="container py-8 md:py-12">
      <nav className="mb-6 text-sm text-ink-muted" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-accent">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/calculators" className="hover:text-accent">
              Calculators
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-ink">{calc.title}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <header className="mb-6 animate-rise">
            <h1 className="display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              {calc.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
              {calc.description}
            </p>
          </header>

          <AdSlot slot="header" className="mb-6" />

          <div className="surface animate-rise delay-1 p-5 sm:p-7">{children}</div>

          {howTo && howTo.length > 0 && (
            <section className="mt-8 animate-rise delay-2">
              <h2 className="display text-xl font-semibold text-ink">How to use</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
                {howTo.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>
          )}

          <AdSlot slot="in-article" className="mt-8" />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <AdSlot slot="sidebar" className="min-h-[250px]" />
          <div className="surface p-4">
            <h2 className="display text-sm font-semibold text-ink">Need help?</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Questions about results or the site? Reach us anytime.
            </p>
            <Link href="/contact" className="btn btn-primary mt-4 w-full text-sm">
              Contact us
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
