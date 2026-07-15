import Link from "next/link";
import { CalculatorCard } from "@/components/CalculatorCard";
import { AdSlot } from "@/components/AdSlot";
import { CALCULATORS, SITE } from "@/lib/site";

export default function HomePage() {
  const featured = CALCULATORS.slice(0, 6);
  const rest = CALCULATORS.slice(6);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,124,107,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,124,107,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
          }}
          aria-hidden
        />
        <div className="container relative grid items-center gap-10 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-20">
          <div>
            <p className="animate-fade text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              {SITE.name}
            </p>
            <h1 className="display animate-rise mt-3 max-w-xl text-4xl font-bold leading-[1.08] text-ink md:text-5xl lg:text-[3.4rem]">
              Calculators that stay out of your way
            </h1>
            <p className="animate-rise delay-1 mt-5 max-w-lg text-base leading-relaxed text-ink-muted md:text-lg">
              {SITE.tagline}. Finance, health, conversions, and science — clear inputs, instant
              answers, built for every screen.
            </p>
            <div className="animate-rise delay-2 mt-8 flex flex-wrap gap-3">
              <Link href="/calculators" className="btn btn-primary">
                Browse all calculators
              </Link>
              <Link href="/calculators/emi-calculator" className="btn btn-ghost">
                Try EMI calculator
              </Link>
            </div>
          </div>

          <div className="animate-rise delay-3 relative hidden min-h-[280px] md:block">
            <div
              className="absolute inset-0 rounded-[28px]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(14,124,107,0.95) 0%, rgba(15,28,34,0.92) 55%, rgba(12,43,50,0.98) 100%)",
              }}
            />
            <div
              className="absolute inset-0 rounded-[28px] opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden
            />
            <div className="relative flex h-full flex-col justify-end p-8 text-white">
              <p className="text-sm font-medium text-white/70">Everyday math, refined</p>
              <p className="display mt-2 text-3xl font-semibold leading-tight">
                14 tools.
                <br />
                Zero sign-up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">Featured calculators</h2>
            <p className="mt-2 text-ink-muted">Most-used tools, ready when you are.</p>
          </div>
          <Link href="/calculators" className="text-sm font-semibold text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((calc, i) => (
            <CalculatorCard key={calc.slug} calc={calc} index={i} />
          ))}
        </div>
      </section>

      <div className="container">
        <AdSlot slot="in-article" />
      </div>

      <section className="container py-12 md:py-16">
        <h2 className="display text-2xl font-bold text-ink md:text-3xl">More tools</h2>
        <p className="mt-2 max-w-2xl text-ink-muted">
          Discount, tips, compound interest, date difference, and more converters.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((calc, i) => (
            <CalculatorCard key={calc.slug} calc={calc} index={i} />
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white/50">
        <div className="container grid gap-8 py-14 md:grid-cols-3">
          {[
            {
              title: "Accurate by design",
              body: "Standard formulas for EMI, BMI, GST/VAT, compounding, and conversions — transparent and checkable.",
            },
            {
              title: "Built for phones",
              body: "Large taps, readable results, and layouts that stay clear from pocket screens to desktops.",
            },
            {
              title: "Privacy respected",
              body: "Calculations run in your browser. Read our privacy policy for ads and analytics details.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="display text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
