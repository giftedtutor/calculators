"use client";

import { useMemo, useState } from "react";

export function LoanCalculator() {
  const [amount, setAmount] = useState("250000");
  const [rate, setRate] = useState("7.25");
  const [months, setMonths] = useState("60");
  const [extra, setExtra] = useState("0");

  const result = useMemo(() => {
    const P = Number(amount);
    const annual = Number(rate);
    const n = Math.round(Number(months));
    const extraPay = Number(extra) || 0;
    if (![P, annual, n].every((v) => Number.isFinite(v)) || P <= 0 || n <= 0) return null;

    const r = annual / 12 / 100;
    const baseEmi =
      r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    let balance = P;
    let paidInterest = 0;
    let paidPrincipal = 0;
    let periods = 0;
    const schedule: { month: number; payment: number; interest: number; principal: number; balance: number }[] =
      [];

    while (balance > 0.01 && periods < 1000) {
      periods += 1;
      const interest = r === 0 ? 0 : balance * r;
      let payment = baseEmi + extraPay;
      if (payment > balance + interest) payment = balance + interest;
      const principalPart = payment - interest;
      balance = Math.max(0, balance - principalPart);
      paidInterest += interest;
      paidPrincipal += principalPart;
      if (periods <= 12 || balance === 0) {
        schedule.push({
          month: periods,
          payment,
          interest,
          principal: principalPart,
          balance,
        });
      }
    }

    return {
      emi: baseEmi,
      periods,
      paidInterest,
      paidPrincipal,
      total: paidInterest + paidPrincipal,
      schedule,
      savedMonths: Math.max(0, n - periods),
    };
  }, [amount, rate, months, extra]);

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="loan-amount">
            Loan amount
          </label>
          <input
            id="loan-amount"
            type="number"
            className="field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="loan-rate">
            Annual interest (%)
          </label>
          <input
            id="loan-rate"
            type="number"
            step="0.01"
            className="field"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="loan-months">
            Term (months)
          </label>
          <input
            id="loan-months"
            type="number"
            className="field"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="loan-extra">
            Extra monthly payment
          </label>
          <input
            id="loan-extra"
            type="number"
            className="field"
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
          />
        </div>
      </div>

      {result ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="result-panel">
              <div className="label">Base monthly payment</div>
              <div className="value">{fmt(result.emi)}</div>
            </div>
            <div className="result-panel">
              <div className="label">Payoff in</div>
              <div className="value">{result.periods} months</div>
            </div>
            <div className="rounded-2xl border border-line bg-bg p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Total interest</div>
              <div className="display mt-1 text-xl font-bold">{fmt(result.paidInterest)}</div>
            </div>
            <div className="rounded-2xl border border-line bg-bg p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Months saved</div>
              <div className="display mt-1 text-xl font-bold">{result.savedMonths}</div>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-bg text-ink-muted">
                <tr>
                  <th className="px-3 py-2 font-semibold">Month</th>
                  <th className="px-3 py-2 font-semibold">Payment</th>
                  <th className="px-3 py-2 font-semibold">Interest</th>
                  <th className="px-3 py-2 font-semibold">Principal</th>
                  <th className="px-3 py-2 font-semibold">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.map((row) => (
                  <tr key={row.month} className="border-t border-line">
                    <td className="px-3 py-2">{row.month}</td>
                    <td className="px-3 py-2">{fmt(row.payment)}</td>
                    <td className="px-3 py-2">{fmt(row.interest)}</td>
                    <td className="px-3 py-2">{fmt(row.principal)}</td>
                    <td className="px-3 py-2">{fmt(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-line px-3 py-2 text-xs text-ink-soft">
              Showing first year (and final month if earlier). Full payoff: {result.periods} months.
            </p>
          </div>
        </>
      ) : (
        <p className="text-sm text-danger">Enter valid loan values to see results.</p>
      )}
    </div>
  );
}
