import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE.name}. How we handle information, cookies, and advertising (including Google AdSense).`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="container max-w-3xl py-10 md:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <h1 className="display text-3xl font-bold text-ink md:text-4xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated: July 15, 2026</p>

      <div className="prose-custom mt-8 space-y-6 text-[15px] leading-relaxed text-ink-muted">
        <p>
          {SITE.name} (“we”, “us”, or “our”), operated by {SITE.publisher}, respects your privacy.
          This policy explains what information we collect, how we use it, and your choices. Contact:{" "}
          <a className="font-medium text-accent hover:underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          .
        </p>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Information we collect</h2>
          <p className="mt-2">
            Calculator inputs are processed in your browser and are not stored on our servers by
            default. We may collect limited technical data such as IP address, browser type, device
            type, pages visited, and referring URLs through hosting logs or analytics tools if
            enabled.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">How we use information</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>To operate, maintain, and improve {SITE.name}</li>
            <li>To understand usage and fix performance or usability issues</li>
            <li>To show relevant advertisements (when ads are enabled)</li>
            <li>To respond to contact requests you send us</li>
          </ul>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Cookies and similar technologies</h2>
          <p className="mt-2">
            We and our partners may use cookies and similar technologies to remember preferences,
            measure traffic, and deliver ads. You can control cookies through your browser settings.
            Disabling cookies may affect some site features.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Google AdSense and advertising</h2>
          <p className="mt-2">
            {SITE.name} may use Google AdSense (or similar networks) to display advertisements.
            Google and its partners may use cookies — including the DoubleClick cookie — or device
            identifiers to serve ads based on your prior visits to this and other websites.
          </p>
          <p className="mt-3">
            Users may opt out of personalized advertising by visiting{" "}
            <a
              className="font-medium text-accent hover:underline"
              href="https://www.google.com/settings/ads"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Ads Settings
            </a>{" "}
            or{" "}
            <a
              className="font-medium text-accent hover:underline"
              href="https://www.aboutads.info/choices/"
              rel="noopener noreferrer"
              target="_blank"
            >
              www.aboutads.info
            </a>
            . Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s
            prior visits to this website or other websites.
          </p>
          <p className="mt-3">
            For more about how Google uses data, see{" "}
            <a
              className="font-medium text-accent hover:underline"
              href="https://policies.google.com/technologies/ads"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Advertising policies
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Third-party services</h2>
          <p className="mt-2">
            Some tools (for example, live currency rates) request data from third-party APIs. Those
            providers process requests according to their own policies. We do not sell your personal
            information.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Children&apos;s privacy</h2>
          <p className="mt-2">
            This site is not directed at children under 13. We do not knowingly collect personal
            information from children. If you believe a child has provided information, contact us
            and we will take appropriate steps.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Your rights and choices</h2>
          <p className="mt-2">
            Depending on your location, you may have rights to access, correct, or delete personal
            information we hold about you. Email{" "}
            <a className="font-medium text-accent hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            with your request.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Changes</h2>
          <p className="mt-2">
            We may update this policy from time to time. The “Last updated” date at the top will
            change when we do. Continued use of the site after changes means you accept the updated
            policy.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this Privacy Policy? Contact {SITE.publisher} at{" "}
            <a className="font-medium text-accent hover:underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="font-medium text-accent hover:underline">
              Contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
