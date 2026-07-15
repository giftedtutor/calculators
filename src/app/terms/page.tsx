import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${SITE.name}. Informational calculators; no warranties for financial or medical decisions.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <article className="container max-w-3xl py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />
      <h1 className="display text-3xl font-bold text-ink md:text-4xl">Terms of Use</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: July 15, 2026</p>

      <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ink-muted">
        <p>
          By using {SITE.name}, you agree to these terms. If you do not agree, please do not use the
          site.
        </p>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Informational purpose only</h2>
          <p className="mt-2">
            Calculators and converters on this site provide estimates for general information. They
            are not financial, tax, legal, medical, or professional advice. Always verify important
            figures with a qualified professional or official source before making decisions.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Acceptable use</h2>
          <p className="mt-2">
            You agree not to misuse the site, attempt to disrupt service, scrape content in a way
            that harms the service, or use the site for unlawful purposes.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Intellectual property</h2>
          <p className="mt-2">
            Site design, branding, and original content belong to {SITE.publisher} unless otherwise
            noted. You may use the calculators for personal or internal business purposes.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Disclaimer of warranties</h2>
          <p className="mt-2">
            The site is provided “as is” without warranties of any kind, express or implied,
            including accuracy, completeness, or fitness for a particular purpose.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Limitation of liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, {SITE.publisher} is not liable for any indirect,
            incidental, or consequential damages arising from your use of {SITE.name}.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Contact</h2>
          <p className="mt-2">
            Questions about these terms? Email{" "}
            <a className="font-medium text-accent hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            or visit{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              Contact
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
