import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: `About ${SITE.name} by ${SITE.publisher}. Free, accurate online calculators designed for clarity on every device.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <h1 className="display text-3xl font-bold text-ink md:text-4xl">About {SITE.name}</h1>
      <p className="mt-4 text-base leading-relaxed text-ink-muted">
        {SITE.name} is a free collection of everyday calculators and converters, built by{" "}
        {SITE.publisher}. Our goal is simple: give you a clear answer without ads getting in the way
        of the math (when ads are shown, they are labeled and placed carefully).
      </p>

      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-muted">
        <section>
          <h2 className="display text-xl font-semibold text-ink">What we offer</h2>
          <p className="mt-2">
            From EMI and loan planning to BMI, age, GST/VAT, currency and unit conversion, time
            zones, and a scientific calculator — plus extras like tip, discount, and compound
            interest tools.
          </p>
        </section>
        <section>
          <h2 className="display text-xl font-semibold text-ink">Our principles</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Results first — interfaces stay focused</li>
            <li>Works on phones and desktops</li>
            <li>Transparent legal pages for privacy and terms</li>
            <li>No account required to calculate</li>
          </ul>
        </section>
        <section>
          <h2 className="display text-xl font-semibold text-ink">Get in touch</h2>
          <p className="mt-2">
            Reach us at{" "}
            <a className="font-medium text-accent hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            or use the{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
