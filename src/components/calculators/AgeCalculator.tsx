"use client";

import { useMemo, useState } from "react";

function diffYMD(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    const prev = new Date(to.getFullYear(), to.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

export function AgeCalculator() {
  const [dob, setDob] = useState("2000-01-01");
  const [asOf, setAsOf] = useState(() => new Date().toISOString().slice(0, 10));

  const result = useMemo(() => {
    const birth = new Date(dob + "T00:00:00");
    const end = new Date(asOf + "T00:00:00");
    if (Number.isNaN(birth.getTime()) || Number.isNaN(end.getTime()) || end < birth) {
      return null;
    }
    const ymd = diffYMD(birth, end);
    const totalDays = Math.floor((end.getTime() - birth.getTime()) / 86400000);
    const totalWeeks = Math.floor(totalDays / 7);
    const next = new Date(end.getFullYear(), birth.getMonth(), birth.getDate());
    if (next <= end) next.setFullYear(next.getFullYear() + 1);
    const nextIn = Math.ceil((next.getTime() - end.getTime()) / 86400000);
    return { ...ymd, totalDays, totalWeeks, nextIn };
  }, [dob, asOf]);

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="dob">
            Date of birth
          </label>
          <input id="dob" type="date" className="field" value={dob} onChange={(e) => setDob(e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="asOf">
            Age as of
          </label>
          <input id="asOf" type="date" className="field" value={asOf} onChange={(e) => setAsOf(e.target.value)} />
        </div>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="result-panel sm:col-span-2">
            <div className="label">Exact age</div>
            <div className="value">
              {result.years} years, {result.months} months, {result.days} days
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Total days</div>
            <div className="display mt-1 text-2xl font-bold">{result.totalDays.toLocaleString()}</div>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Next birthday</div>
            <div className="display mt-1 text-2xl font-bold">{result.nextIn} days</div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-danger">Please choose a valid date of birth on or before the as-of date.</p>
      )}
    </div>
  );
}
