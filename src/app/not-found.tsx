import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">404</p>
      <h1 className="display mt-3 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 max-w-md text-ink-muted">
        That link doesn&apos;t match any calculator or page. Head back home or browse all tools.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Home
        </Link>
        <Link href="/calculators" className="btn btn-ghost">
          All calculators
        </Link>
      </div>
    </div>
  );
}
