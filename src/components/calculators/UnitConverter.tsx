"use client";

import { useMemo, useState } from "react";

type Category = "length" | "weight" | "temperature" | "volume" | "speed";

const UNITS: Record<Category, { id: string; label: string; toBase: (n: number) => number; fromBase: (n: number) => number }[]> = {
  length: [
    { id: "m", label: "Meters", toBase: (n) => n, fromBase: (n) => n },
    { id: "km", label: "Kilometers", toBase: (n) => n * 1000, fromBase: (n) => n / 1000 },
    { id: "cm", label: "Centimeters", toBase: (n) => n / 100, fromBase: (n) => n * 100 },
    { id: "mi", label: "Miles", toBase: (n) => n * 1609.344, fromBase: (n) => n / 1609.344 },
    { id: "ft", label: "Feet", toBase: (n) => n * 0.3048, fromBase: (n) => n / 0.3048 },
    { id: "in", label: "Inches", toBase: (n) => n * 0.0254, fromBase: (n) => n / 0.0254 },
  ],
  weight: [
    { id: "kg", label: "Kilograms", toBase: (n) => n, fromBase: (n) => n },
    { id: "g", label: "Grams", toBase: (n) => n / 1000, fromBase: (n) => n * 1000 },
    { id: "lb", label: "Pounds", toBase: (n) => n * 0.45359237, fromBase: (n) => n / 0.45359237 },
    { id: "oz", label: "Ounces", toBase: (n) => n * 0.028349523125, fromBase: (n) => n / 0.028349523125 },
  ],
  temperature: [
    {
      id: "c",
      label: "Celsius",
      toBase: (n) => n,
      fromBase: (n) => n,
    },
    {
      id: "f",
      label: "Fahrenheit",
      toBase: (n) => ((n - 32) * 5) / 9,
      fromBase: (n) => (n * 9) / 5 + 32,
    },
    {
      id: "k",
      label: "Kelvin",
      toBase: (n) => n - 273.15,
      fromBase: (n) => n + 273.15,
    },
  ],
  volume: [
    { id: "l", label: "Liters", toBase: (n) => n, fromBase: (n) => n },
    { id: "ml", label: "Milliliters", toBase: (n) => n / 1000, fromBase: (n) => n * 1000 },
    { id: "gal", label: "US gallons", toBase: (n) => n * 3.785411784, fromBase: (n) => n / 3.785411784 },
    { id: "cup", label: "US cups", toBase: (n) => n * 0.2365882365, fromBase: (n) => n / 0.2365882365 },
  ],
  speed: [
    { id: "mps", label: "m/s", toBase: (n) => n, fromBase: (n) => n },
    { id: "kmh", label: "km/h", toBase: (n) => n / 3.6, fromBase: (n) => n * 3.6 },
    { id: "mph", label: "mph", toBase: (n) => n * 0.44704, fromBase: (n) => n / 0.44704 },
  ],
};

export function UnitConverter() {
  const [category, setCategory] = useState<Category>("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("ft");
  const [value, setValue] = useState("1");

  const units = UNITS[category];

  function onCategory(next: Category) {
    setCategory(next);
    setFrom(UNITS[next][0].id);
    setTo(UNITS[next][1]?.id ?? UNITS[next][0].id);
  }

  const result = useMemo(() => {
    const n = Number(value);
    if (!Number.isFinite(n)) return null;
    const fromUnit = units.find((u) => u.id === from);
    const toUnit = units.find((u) => u.id === to);
    if (!fromUnit || !toUnit) return null;
    return toUnit.fromBase(fromUnit.toBase(n));
  }, [value, from, to, units]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(UNITS) as Category[]).map((c) => (
          <button
            key={c}
            type="button"
            className={`rounded-xl px-3 py-2 text-sm font-semibold capitalize ${
              category === c ? "bg-accent text-white" : "border border-line bg-bg text-ink-muted"
            }`}
            onClick={() => onCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div>
        <label className="field-label" htmlFor="unit-value">
          Value
        </label>
        <input
          id="unit-value"
          type="number"
          className="field"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="unit-from">
            From
          </label>
          <select id="unit-from" className="field" value={from} onChange={(e) => setFrom(e.target.value)}>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="unit-to">
            To
          </label>
          <select id="unit-to" className="field" value={to} onChange={(e) => setTo(e.target.value)}>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result != null ? (
        <div className="result-panel">
          <div className="label">Converted value</div>
          <div className="value">{result.toLocaleString(undefined, { maximumFractionDigits: 8 })}</div>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter a valid number.</p>
      )}
    </div>
  );
}
