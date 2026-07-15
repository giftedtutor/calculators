"use client";

import { useMemo, useState } from "react";

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export function DateDifferenceCalculator() {
  const [start, setStart] = useState("2024-01-01");
  const [end, setEnd] = useState(() => new Date().toISOString().slice(0, 10));

  const result = useMemo(() => {
    const a = new Date(start + "T00:00:00");
    const b = new Date(end + "T00:00:00");
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
    const [from, to] = a <= b ? [a, b] : [b, a];
    const totalDays = Math.floor((to.getTime() - from.getTime()) / 86400000);
    const ymd = diffYMD(from, to);
    return {
      totalDays,
      weeks: Math.floor(totalDays / 7),
      years: ymd.years,
      months: ymd.months,
      days: ymd.days,
      swapped: a > b,
    };
  }, [start, end]);

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="date-start">
            Start date
          </label>
          <input
            id="date-start"
            type="date"
            className="field"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="date-end">
            End date
          </label>
          <input id="date-end" type="date" className="field" value={end} onChange={(e) => setEnd(e.target.value)} />
        </div>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="result-panel sm:col-span-2">
            <div className="label">Duration</div>
            <div className="value">
              {result.years}y {result.months}m {result.days}d
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Total days</div>
            <div className="display mt-1 text-2xl font-bold">{result.totalDays.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Total weeks</div>
            <div className="display mt-1 text-2xl font-bold">{result.weeks.toLocaleString()}</div>
          </div>
          {result.swapped && (
            <p className="sm:col-span-2 text-xs text-ink-soft">
              Start was after end — duration is shown as an absolute difference.
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-danger">Enter valid dates.</p>
      )}
    </div>
  );
}
