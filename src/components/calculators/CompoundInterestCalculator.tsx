"use client";

import { useMemo, useState } from "react";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [compound, setCompound] = useState("12");
  const [contribution, setContribution] = useState("100");

  const result = useMemo(() => {
    const P = Number(principal);
    const r = Number(rate) / 100;
    const t = Number(years);
    const n = Number(compound);
    const pmt = Number(contribution);
    if (![P, r, t, n, pmt].every(Number.isFinite) || t < 0 || n <= 0) return null;

    const periods = n * t;
    const i = r / n;
    let balance = P;
    for (let k = 0; k < periods; k++) {
      balance = balance * (1 + i) + pmt;
    }
    const contributed = P + pmt * periods;
    return {
      future: balance,
      contributed,
      interest: balance - contributed,
    };
  }, [principal, rate, years, compound, contribution]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="ci-principal">
            Starting amount
          </label>
          <input
            id="ci-principal"
            type="number"
            className="field"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="ci-rate">
            Annual rate (%)
          </label>
          <input id="ci-rate" type="number" className="field" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="ci-years">
            Years
          </label>
          <input
            id="ci-years"
            type="number"
            className="field"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="ci-n">
            Compounds per year
          </label>
          <select id="ci-n" className="field" value={compound} onChange={(e) => setCompound(e.target.value)}>
            <option value="1">Annually (1)</option>
            <option value="2">Semi-annually (2)</option>
            <option value="4">Quarterly (4)</option>
            <option value="12">Monthly (12)</option>
            <option value="365">Daily (365)</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="ci-pmt">
            Contribution each period
          </label>
          <input
            id="ci-pmt"
            type="number"
            className="field"
            value={contribution}
            onChange={(e) => setContribution(e.target.value)}
          />
        </div>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="result-panel sm:col-span-3">
            <div className="label">Future value</div>
            <div className="value">{fmt(result.future)}</div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Contributed</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.contributed)}</div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4 sm:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Interest earned</div>
            <div className="display mt-1 text-xl font-bold">{fmt(result.interest)}</div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter valid investment values.</p>
      )}
    </div>
  );
}
