"use client";

import { useMemo, useState } from "react";

export function GstVatCalculator() {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState("18");
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const result = useMemo(() => {
    const base = Number(amount);
    const taxRate = Number(rate);
    if (![base, taxRate].every((n) => Number.isFinite(n) && n >= 0)) return null;
    if (mode === "exclusive") {
      const tax = (base * taxRate) / 100;
      return { net: base, tax, gross: base + tax };
    }
    const net = base / (1 + taxRate / 100);
    const tax = base - net;
    return { net, tax, gross: base };
  }, [amount, rate, mode]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-xl border border-line bg-bg p-1">
        {(
          [
            ["exclusive", "Tax exclusive"],
            ["inclusive", "Tax inclusive"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`rounded-lg px-3 py-2 text-sm font-semibold ${
              mode === key ? "bg-white text-ink shadow-sm" : "text-ink-muted"
            }`}
            onClick={() => setMode(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="gst-amount">
            Amount
          </label>
          <input
            id="gst-amount"
            type="number"
            className="field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="gst-rate">
            Tax rate (%)
          </label>
          <input
            id="gst-rate"
            type="number"
            step="0.01"
            className="field"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {[5, 12, 18, 20].map((r) => (
              <button
                key={r}
                type="button"
                className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ink-muted hover:border-accent hover:text-accent"
                onClick={() => setRate(String(r))}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Net</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.net)}</div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Tax</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.tax)}</div>
          </div>
          <div className="result-panel">
            <div className="label">Gross total</div>
            <div className="value">{fmt(result.gross)}</div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter a valid amount and tax rate.</p>
      )}
    </div>
  );
}
