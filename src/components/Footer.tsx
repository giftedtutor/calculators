import Link from "next/link";
import { Logo } from "./Logo";
import { CALCULATORS, SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-[#0f1c22] text-[#d7e4e8]">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="[&_span]:text-white">
            <Logo />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#9fb2ba]">
            {SITE.tagline}. Free online tools built for clarity, speed, and accuracy.
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-4 inline-block text-sm font-medium text-[#7ed8c5] hover:underline"
          >
            {SITE.email}
          </a>
        </div>

        <div>
          <h3 className="display text-sm font-semibold uppercase tracking-[0.08em] text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[#9fb2ba]">
            <li>
              <Link href="/calculators" className="hover:text-white">
                All Calculators
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="display text-sm font-semibold uppercase tracking-[0.08em] text-white">
            Popular
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[#9fb2ba]">
            {CALCULATORS.slice(0, 5).map((c) => (
              <li key={c.slug}>
                <Link href={`/calculators/${c.slug}`} className="hover:text-white">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="display text-sm font-semibold uppercase tracking-[0.08em] text-white">
            Legal
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-[#9fb2ba]">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-2 py-5 text-xs text-[#7f939c] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {SITE.name} by {SITE.publisher}. All rights reserved.
          </p>
          <p>Results are estimates for informational use only.</p>
        </div>
      </div>
    </footer>
  );
}
