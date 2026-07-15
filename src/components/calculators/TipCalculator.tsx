"use client";

import { useMemo, useState } from "react";

export function TipCalculator() {
  const [bill, setBill] = useState("86.50");
  const [tip, setTip] = useState("18");
  const [people, setPeople] = useState("2");

  const result = useMemo(() => {
    const b = Number(bill);
    const t = Number(tip);
    const p = Math.max(1, Math.round(Number(people)));
    if (![b, t].every((n) => Number.isFinite(n) && n >= 0) || !Number.isFinite(p)) return null;
    const tipAmount = (b * t) / 100;
    const total = b + tipAmount;
    return { tipAmount, total, each: total / p, people: p };
  }, [bill, tip, people]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="tip-bill">
            Bill amount
          </label>
          <input id="tip-bill" type="number" className="field" value={bill} onChange={(e) => setBill(e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="tip-pct">
            Tip (%)
          </label>
          <input id="tip-pct" type="number" className="field" value={tip} onChange={(e) => setTip(e.target.value)} />
          <div className="mt-2 flex flex-wrap gap-2">
            {[10, 15, 18, 20, 25].map((r) => (
              <button
                key={r}
                type="button"
                className="rounded-lg border border-line px-2.5 py-1 text-xs font-semibold text-ink-muted hover:border-accent hover:text-accent"
                onClick={() => setTip(String(r))}
              >
                {r}%
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="tip-people">
            Split between
          </label>
          <input
            id="tip-people"
            type="number"
            min="1"
            className="field"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </div>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Tip</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.tipAmount)}</div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Total</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.total)}</div>
          </div>
          <div className="result-panel">
            <div className="label">Each ({result.people})</div>
            <div className="value">{fmt(result.each)}</div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter valid bill details.</p>
      )}
    </div>
  );
}
