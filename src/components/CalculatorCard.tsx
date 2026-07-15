import Link from "next/link";
import type { CalculatorMeta } from "@/lib/site";
import { CATEGORY_LABELS } from "@/lib/site";

function CalcIcon({ slug }: { slug: string }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (slug) {
    case "age-calculator":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 1.5" />
        </svg>
      );
    case "emi-calculator":
    case "loan-calculator":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case "bmi-calculator":
      return (
        <svg {...common}>
          <path d="M12 3v18M8 7h8M9 17h6" />
        </svg>
      );
    case "percentage-calculator":
    case "discount-calculator":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="1.5" />
          <circle cx="16" cy="16" r="1.5" />
          <path d="M7 17L17 7" />
        </svg>
      );
    case "gst-vat-calculator":
      return (
        <svg {...common}>
          <path d="M6 4h12v16H6z" />
          <path d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      );
    case "currency-converter":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 7v10M9.5 9.5c.5-1 1.5-1.5 2.5-1.5s2 .7 2 2-1 2-2.5 2.5-2.5.8-2.5 2.5 1.2 2 2.5 2 2-.5 2.5-1.5" />
        </svg>
      );
    case "unit-converter":
      return (
        <svg {...common}>
          <path d="M4 8h16M4 16h16M8 4v4M16 16v4" />
        </svg>
      );
    case "timezone-converter":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4a12 12 0 010 16M4 12h16M8.5 6.5c2 2.5 2 8.5 0 11M15.5 6.5c-2 2.5-2 8.5 0 11" />
        </svg>
      );
    case "scientific-calculator":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h3M13 12h3M8 16h3M13 16h3" />
        </svg>
      );
    case "tip-calculator":
      return (
        <svg {...common}>
          <path d="M4 10h16v8H4zM7 10V8a5 5 0 0110 0v2" />
        </svg>
      );
    case "compound-interest-calculator":
      return (
        <svg {...common}>
          <path d="M4 18V6M4 18h16" />
          <path d="M7 14l4-4 3 3 5-6" />
        </svg>
      );
    case "date-difference-calculator":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 8h8M8 12h5" />
        </svg>
      );
  }
}

export function CalculatorCard({ calc, index = 0 }: { calc: CalculatorMeta; index?: number }) {
  const delay = index % 4 === 0 ? "" : `delay-${Math.min(index % 4, 3)}`;

  return (
    <Link
      href={`/calculators/${calc.slug}`}
      className={`surface group block p-5 transition duration-300 hover:-translate-y-1 hover:border-accent/40 animate-rise ${delay}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent-deep"
          aria-hidden
        >
          <CalcIcon slug={calc.slug} />
        </span>
        <span className="rounded-full bg-bg px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
          {CATEGORY_LABELS[calc.category]}
        </span>
      </div>
      <h3 className="display mt-4 text-lg font-semibold text-ink group-hover:text-accent-deep">
        {calc.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{calc.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
        Open calculator
        <svg viewBox="0 0 16 16" className="h-4 w-4 transition group-hover:translate-x-0.5" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
    </Link>
  );
}
