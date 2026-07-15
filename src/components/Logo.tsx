import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="CS Calculators home">
      <span
        className="relative grid h-9 w-9 place-items-center rounded-xl bg-[linear-gradient(145deg,#14967f,#0a5c50)] text-white shadow-[0_10px_20px_-12px_rgba(14,124,107,0.9)] transition-transform duration-300 group-hover:scale-[1.04]"
        aria-hidden
      >
        <span className="display text-[0.7rem] font-bold tracking-tight">CS</span>
      </span>
      {!compact && (
        <span className="display text-[1.15rem] font-semibold tracking-tight text-ink">
          CS <span className="text-accent">Calculators</span>
        </span>
      )}
    </Link>
  );
}
