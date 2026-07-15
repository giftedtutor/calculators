"use client";

import { useMemo, useState } from "react";

function calcEmi(principal: number, annualRate: number, months: number) {
  if (principal <= 0 || months <= 0) return null;
  const r = annualRate / 12 / 100;
  if (r === 0) {
    const emi = principal / months;
    return { emi, total: principal, interest: 0 };
  }
  const factor = Math.pow(1 + r, months);
  const emi = (principal * r * factor) / (factor - 1);
  const total = emi * months;
  return { emi, total, interest: total - principal };
}

export function EmiCalculator() {
  const [principal, setPrincipal] = useState("500000");
  const [rate, setRate] = useState("8.5");
  const [years, setYears] = useState("20");

  const result = useMemo(() => {
    const p = Number(principal);
    const r = Number(rate);
    const y = Number(years);
    if (![p, r, y].every((n) => Number.isFinite(n)) || y <= 0) return null;
    return calcEmi(p, r, Math.round(y * 12));
  }, [principal, rate, years]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="principal">
            Loan amount
          </label>
          <input
            id="principal"
            type="number"
            min="0"
            className="field"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="rate">
            Interest rate (% p.a.)
          </label>
          <input
            id="rate"
            type="number"
            min="0"
            step="0.01"
            className="field"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="tenure">
            Tenure (years)
          </label>
          <input
            id="tenure"
            type="number"
            min="0.5"
            step="0.5"
            className="field"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="result-panel sm:col-span-3">
            <div className="label">Monthly EMI</div>
            <div className="value">{fmt(result.emi)}</div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Total interest</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.interest)}</div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4 sm:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Total payment</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.total)}</div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter valid loan details to calculate EMI.</p>
      )}
    </div>
  );
}
