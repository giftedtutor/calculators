"use client";

import { useState } from "react";

function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let num = ch;
      i += 1;
      while (i < expr.length && /[0-9.]/.test(expr[i])) {
        num += expr[i];
        i += 1;
      }
      tokens.push(num);
      continue;
    }
    const fns = ["sin", "cos", "tan", "log", "ln", "sqrt"];
    const rest = expr.slice(i);
    const fn = fns.find((f) => rest.startsWith(f));
    if (fn) {
      tokens.push(fn);
      i += fn.length;
      continue;
    }
    if ("+-*/^()%,".includes(ch) || ch === "π" || ch === "e") {
      tokens.push(ch === "π" ? "pi" : ch);
      i += 1;
      continue;
    }
    throw new Error(`Unexpected: ${ch}`);
  }
  return tokens;
}

function toRpn(tokens: string[]): string[] {
  const output: string[] = [];
  const stack: string[] = [];
  const prec: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2, "%": 2, "^": 3 };
  const rightAssoc = new Set(["^"]);
  const funcs = new Set(["sin", "cos", "tan", "log", "ln", "sqrt"]);

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!Number.isNaN(Number(t)) || t === "pi" || t === "e") {
      output.push(t);
    } else if (funcs.has(t)) {
      stack.push(t);
    } else if (t in prec) {
      // unary minus
      const prev = tokens[i - 1];
      if (t === "-" && (i === 0 || (prev && (prev in prec || prev === "(" || funcs.has(prev))))) {
        output.push("0");
      }
      while (stack.length) {
        const top = stack[stack.length - 1];
        if (!(top in prec)) break;
        const cond = rightAssoc.has(t)
          ? prec[t] < prec[top]
          : prec[t] <= prec[top];
        if (!cond) break;
        output.push(stack.pop()!);
      }
      stack.push(t);
    } else if (t === "(") {
      stack.push(t);
    } else if (t === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop()!);
      }
      if (stack.pop() !== "(") throw new Error("Mismatched parentheses");
      if (stack.length && funcs.has(stack[stack.length - 1])) {
        output.push(stack.pop()!);
      }
    } else {
      throw new Error(`Unknown token ${t}`);
    }
  }
  while (stack.length) {
    const t = stack.pop()!;
    if (t === "(" || t === ")") throw new Error("Mismatched parentheses");
    output.push(t);
  }
  return output;
}

function evalRpn(rpn: string[]): number {
  const stack: number[] = [];
  const deg = true;
  const toRad = (n: number) => (deg ? (n * Math.PI) / 180 : n);

  for (const t of rpn) {
    if (t === "pi") {
      stack.push(Math.PI);
      continue;
    }
    if (t === "e") {
      stack.push(Math.E);
      continue;
    }
    if (!Number.isNaN(Number(t))) {
      stack.push(Number(t));
      continue;
    }
    if (["sin", "cos", "tan", "log", "ln", "sqrt"].includes(t)) {
      const a = stack.pop();
      if (a == null) throw new Error("Invalid expression");
      switch (t) {
        case "sin":
          stack.push(Math.sin(toRad(a)));
          break;
        case "cos":
          stack.push(Math.cos(toRad(a)));
          break;
        case "tan":
          stack.push(Math.tan(toRad(a)));
          break;
        case "log":
          stack.push(Math.log10(a));
          break;
        case "ln":
          stack.push(Math.log(a));
          break;
        case "sqrt":
          stack.push(Math.sqrt(a));
          break;
      }
      continue;
    }
    const b = stack.pop();
    const a = stack.pop();
    if (a == null || b == null) throw new Error("Invalid expression");
    switch (t) {
      case "+":
        stack.push(a + b);
        break;
      case "-":
        stack.push(a - b);
        break;
      case "*":
        stack.push(a * b);
        break;
      case "/":
        stack.push(a / b);
        break;
      case "%":
        stack.push(a % b);
        break;
      case "^":
        stack.push(Math.pow(a, b));
        break;
      default:
        throw new Error(`Unknown op ${t}`);
    }
  }
  if (stack.length !== 1) throw new Error("Invalid expression");
  return stack[0];
}

function evaluate(expr: string): number {
  const tokens = tokenize(expr.replace(/×/g, "*").replace(/÷/g, "/"));
  return evalRpn(toRpn(tokens));
}

const KEYS = [
  ["C", "(", ")", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "^", "="],
  ["sin(", "cos(", "tan(", "sqrt("],
  ["log(", "ln(", "π", "e"],
];

export function ScientificCalculator() {
  const [expr, setExpr] = useState("");
  const [display, setDisplay] = useState("0");
  const [error, setError] = useState<string | null>(null);

  function press(key: string) {
    setError(null);
    if (key === "C") {
      setExpr("");
      setDisplay("0");
      return;
    }
    if (key === "=") {
      try {
        const value = evaluate(expr);
        const text = Number.isFinite(value)
          ? String(Number(value.toPrecision(12)))
          : "Error";
        setDisplay(text);
        setExpr(text === "Error" ? "" : text);
      } catch {
        setError("Invalid expression");
        setDisplay("Error");
      }
      return;
    }
    const next = expr + key;
    setExpr(next);
    setDisplay(next || "0");
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="rounded-2xl bg-[#0f1c22] p-4 text-right text-white shadow-inner">
        <div className="min-h-[1.25rem] truncate font-mono text-xs text-white/50">{expr || " "}</div>
        <div className="display mt-1 truncate text-3xl font-bold tracking-tight">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {KEYS.flat().map((key) => (
          <button
            key={key}
            type="button"
            className={`rounded-xl px-2 py-3 text-sm font-semibold transition ${
              key === "="
                ? "bg-accent text-white"
                : key === "C"
                  ? "bg-[#fde8e8] text-danger"
                  : "border border-line bg-white text-ink hover:bg-accent-soft"
            }`}
            onClick={() => press(key)}
          >
            {key}
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-danger">{error}</p>}
      <p className="text-xs text-ink-soft">Trig functions use degrees. Use parentheses for functions, e.g. sin(30).</p>
    </div>
  );
}
