"use client";

import { useMemo, useState } from "react";

export function DiscountCalculator() {
  const [price, setPrice] = useState("120");
  const [discount, setDiscount] = useState("25");

  const result = useMemo(() => {
    const p = Number(price);
    const d = Number(discount);
    if (![p, d].every((n) => Number.isFinite(n) && n >= 0)) return null;
    const savings = (p * d) / 100;
    return { savings, final: p - savings };
  }, [price, discount]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="disc-price">
            Original price
          </label>
          <input
            id="disc-price"
            type="number"
            className="field"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="disc-pct">
            Discount (%)
          </label>
          <input
            id="disc-pct"
            type="number"
            className="field"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
      </div>
      {result ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">You save</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.savings)}</div>
          </div>
          <div className="result-panel">
            <div className="label">Final price</div>
            <div className="value">{fmt(result.final)}</div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter valid price and discount.</p>
      )}
    </div>
  );
}
