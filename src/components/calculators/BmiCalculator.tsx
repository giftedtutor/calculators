"use client";

import { useMemo, useState } from "react";

function category(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-[#fbbf24]" };
  if (bmi < 25) return { label: "Normal weight", color: "text-[#6ee7b7]" };
  if (bmi < 30) return { label: "Overweight", color: "text-[#fbbf24]" };
  return { label: "Obesity", color: "text-[#fda4a4]" };
}

export function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("70");
  const [feet, setFeet] = useState("5");
  const [inches, setInches] = useState("7");
  const [pounds, setPounds] = useState("154");

  const result = useMemo(() => {
    let hCm: number;
    let wKg: number;
    if (unit === "metric") {
      hCm = Number(height);
      wKg = Number(weight);
    } else {
      hCm = (Number(feet) * 12 + Number(inches)) * 2.54;
      wKg = Number(pounds) * 0.45359237;
    }
    if (![hCm, wKg].every((n) => Number.isFinite(n) && n > 0)) return null;
    const hM = hCm / 100;
    const bmi = wKg / (hM * hM);
    return { bmi, ...category(bmi) };
  }, [unit, height, weight, feet, inches, pounds]);

  return (
    <div className="space-y-5">
      <div className="inline-flex rounded-xl border border-line bg-bg p-1">
        {(["metric", "imperial"] as const).map((u) => (
          <button
            key={u}
            type="button"
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize ${
              unit === u ? "bg-white text-ink shadow-sm" : "text-ink-muted"
            }`}
            onClick={() => setUnit(u)}
          >
            {u}
          </button>
        ))}
      </div>

      {unit === "metric" ? (
        <div className="calc-grid cols-2">
          <div>
            <label className="field-label" htmlFor="height">
              Height (cm)
            </label>
            <input
              id="height"
              type="number"
              className="field"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div>
            <label className="field-label" htmlFor="weight">
              Weight (kg)
            </label>
            <input
              id="weight"
              type="number"
              className="field"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="calc-grid cols-2">
          <div>
            <label className="field-label" htmlFor="feet">
              Height (ft)
            </label>
            <input id="feet" type="number" className="field" value={feet} onChange={(e) => setFeet(e.target.value)} />
          </div>
          <div>
            <label className="field-label" htmlFor="inches">
              Height (in)
            </label>
            <input
              id="inches"
              type="number"
              className="field"
              value={inches}
              onChange={(e) => setInches(e.target.value)}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label" htmlFor="pounds">
              Weight (lb)
            </label>
            <input
              id="pounds"
              type="number"
              className="field"
              value={pounds}
              onChange={(e) => setPounds(e.target.value)}
            />
          </div>
        </div>
      )}

      {result ? (
        <div className="result-panel">
          <div className="label">Your BMI</div>
          <div className="value">{result.bmi.toFixed(1)}</div>
          <p className="mt-2 text-sm font-semibold">
            <span className={result.color}>{result.label}</span>
            <span className="ml-2 font-normal text-white/70">
              (WHO adult categories; not medical advice)
            </span>
          </p>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter valid height and weight.</p>
      )}
    </div>
  );
}
