import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: `Contact ${SITE.name} at ${SITE.email}. Questions, feedback, and privacy requests welcome.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container max-w-3xl py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <h1 className="display text-3xl font-bold text-ink md:text-4xl">Contact</h1>
      <p className="mt-3 text-ink-muted">
        We&apos;re happy to hear feedback, bug reports, partnership inquiries, or privacy requests.
      </p>

      <div className="surface mt-8 p-6 sm:p-8">
        <h2 className="display text-lg font-semibold text-ink">Email</h2>
        <p className="mt-2 text-sm text-ink-muted">
          The fastest way to reach {SITE.publisher} is by email.
        </p>
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent(`${SITE.name} inquiry`)}`}
          className="btn btn-primary mt-5 inline-flex"
        >
          {SITE.email}
        </a>
        <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="font-semibold text-ink">Site</dt>
            <dd className="mt-1 text-ink-muted">{SITE.name}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Publisher</dt>
            <dd className="mt-1 text-ink-muted">{SITE.publisher}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="font-semibold text-ink">Typical response</dt>
            <dd className="mt-1 text-ink-muted">We aim to reply within 2–3 business days.</dd>
          </div>
        </dl>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        For privacy-related requests, please include “Privacy” in the subject line. See also our{" "}
        <a href="/privacy" className="text-accent hover:underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
