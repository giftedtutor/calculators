import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="CalcNest home">
      <span
        className="relative grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(145deg,#14967f,#0a5c50)] text-white shadow-[0_10px_20px_-12px_rgba(14,124,107,0.9)] transition-transform duration-300 group-hover:scale-[1.04]"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect x="4" y="3.5" width="16" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 8h8M8 12h5M8 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="display text-[1.2rem] font-semibold tracking-tight text-ink">
          Calc<span className="text-accent">Nest</span>
        </span>
      )}
    </Link>
  );
}
