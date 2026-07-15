"use client";

import { useMemo, useState } from "react";

export function PercentageCalculator() {
  const [mode, setMode] = useState<"of" | "change" | "is">("of");
  const [a, setA] = useState("20");
  const [b, setB] = useState("150");

  const result = useMemo(() => {
    const x = Number(a);
    const y = Number(b);
    if (![x, y].every(Number.isFinite)) return null;
    if (mode === "of") return { label: `${x}% of ${y}`, value: (x / 100) * y };
    if (mode === "is") {
      if (y === 0) return null;
      return { label: `${x} is what % of ${y}`, value: (x / y) * 100, suffix: "%" };
    }
    if (y === 0) return null;
    return { label: "Percentage change", value: ((x - y) / Math.abs(y)) * 100, suffix: "%" };
  }, [a, b, mode]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["of", "X% of Y"],
            ["is", "X is what % of Y"],
            ["change", "Change from Y to X"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            className={`rounded-xl px-3 py-2 text-sm font-semibold ${
              mode === key ? "bg-accent text-white" : "border border-line bg-bg text-ink-muted"
            }`}
            onClick={() => setMode(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="pct-a">
            {mode === "of" ? "Percentage (X)" : mode === "is" ? "Value (X)" : "New value (X)"}
          </label>
          <input id="pct-a" type="number" className="field" value={a} onChange={(e) => setA(e.target.value)} />
        </div>
        <div>
          <label className="field-label" htmlFor="pct-b">
            {mode === "change" ? "Old value (Y)" : "Base (Y)"}
          </label>
          <input id="pct-b" type="number" className="field" value={b} onChange={(e) => setB(e.target.value)} />
        </div>
      </div>

      {result ? (
        <div className="result-panel">
          <div className="label">{result.label}</div>
          <div className="value">
            {result.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            {result.suffix ?? ""}
          </div>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter valid numbers (base cannot be zero where required).</p>
      )}
    </div>
  );
}
