"use client";

import { useEffect, useMemo, useState } from "react";

const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "SGD", "AED", "PKR", "NZD"];

type Rates = Record<string, number>;

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [rates, setRates] = useState<Rates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        if (!res.ok) throw new Error("Failed to load rates");
        const data = await res.json();
        if (data.result !== "success" || !data.rates) throw new Error("Invalid rate response");
        if (!cancelled) {
          setRates(data.rates as Rates);
        }
      } catch {
        if (!cancelled) setError("Could not load live rates. Try again shortly.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [from]);

  const converted = useMemo(() => {
    const value = Number(amount);
    if (!rates || !Number.isFinite(value)) return null;
    const rate = rates[to];
    if (rate == null) return null;
    return { value: value * rate, rate };
  }, [amount, rates, to]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div className="sm:col-span-2">
          <label className="field-label" htmlFor="fx-amount">
            Amount
          </label>
          <input
            id="fx-amount"
            type="number"
            className="field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="fx-from">
            From
          </label>
          <select id="fx-from" className="field" value={from} onChange={(e) => setFrom(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="fx-to">
            To
          </label>
          <select id="fx-to" className="field" value={to} onChange={(e) => setTo(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="button" className="btn btn-ghost" onClick={swap}>
        Swap currencies
      </button>

      {loading && <p className="text-sm text-ink-muted">Loading live rates…</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
      {!loading && !error && converted && (
        <div className="result-panel">
          <div className="label">
            {amount} {from} =
          </div>
          <div className="value">
            {converted.value.toLocaleString(undefined, { maximumFractionDigits: 4 })} {to}
          </div>
          <p className="mt-2 text-sm text-white/70">
            1 {from} = {converted.rate.toLocaleString(undefined, { maximumFractionDigits: 6 })} {to} · live mid-market
            rates
          </p>
        </div>
      )}
    </div>
  );
}
