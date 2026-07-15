import type { Metadata } from "next";
import { CalculatorCard } from "@/components/CalculatorCard";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { CALCULATORS, CATEGORY_LABELS, type CalculatorCategory } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "All Calculators",
  description:
    "Browse free online calculators for EMI, loans, BMI, age, GST/VAT, currency, units, time zones, and more.",
  path: "/calculators",
  keywords: ["free calculators", "online tools", "EMI", "BMI", "GST"],
});

const ORDER: CalculatorCategory[] = ["finance", "math", "convert", "time", "health"];

export default function CalculatorsPage() {
  return (
    <div className="container py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
        ])}
      />
      <header className="max-w-2xl">
        <h1 className="display text-3xl font-bold text-ink md:text-4xl">All calculators</h1>
        <p className="mt-3 text-ink-muted">
          Every tool on CalcNest — free to use, mobile-friendly, and built for quick answers.
        </p>
      </header>

      <AdSlot slot="header" className="my-8" />

      <div className="space-y-12">
        {ORDER.map((category) => {
          const items = CALCULATORS.filter((c) => c.category === category);
          if (!items.length) return null;
          return (
            <section key={category} id={category}>
              <h2 className="display text-xl font-semibold text-ink">{CATEGORY_LABELS[category]}</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((calc, i) => (
                  <CalculatorCard key={calc.slug} calc={calc} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
