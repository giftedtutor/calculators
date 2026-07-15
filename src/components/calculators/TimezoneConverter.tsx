"use client";

import { useMemo, useState } from "react";

const ZONES = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function formatInZone(date: Date, zone: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

export function TimezoneConverter() {
  const [date, setDate] = useState(() => {
    const d = new Date();
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  });
  const [from, setFrom] = useState("UTC");
  const [targets, setTargets] = useState(["America/New_York", "Europe/London", "Asia/Karachi", "Asia/Tokyo"]);

  const instant = useMemo(() => {
    // Interpret the datetime as wall time in the "from" zone by constructing via formatter offset trick.
    const [ymd, hm] = date.split("T");
    if (!ymd || !hm) return null;
    const asUtcGuess = new Date(`${ymd}T${hm}:00Z`);
    if (Number.isNaN(asUtcGuess.getTime())) return null;

    const inFrom = new Intl.DateTimeFormat("en-US", {
      timeZone: from,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    }).formatToParts(asUtcGuess);

    const get = (type: string) => inFrom.find((p) => p.type === type)?.value ?? "00";
    const asIf = Date.UTC(
      Number(get("year")),
      Number(get("month")) - 1,
      Number(get("day")),
      Number(get("hour")),
      Number(get("minute")),
      Number(get("second")),
    );
    const offset = asIf - asUtcGuess.getTime();
    return new Date(asUtcGuess.getTime() - offset);
  }, [date, from]);

  return (
    <div className="space-y-5">
      <div className="calc-grid cols-2">
        <div>
          <label className="field-label" htmlFor="tz-date">
            Date & time
          </label>
          <input
            id="tz-date"
            type="datetime-local"
            className="field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="tz-from">
            In time zone
          </label>
          <select id="tz-from" className="field" value={from} onChange={(e) => setFrom(e.target.value)}>
            {ZONES.map((z) => (
              <option key={z} value={z}>
                {z.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="tz-targets">
          Compare with (hold Ctrl/Cmd to multi-select)
        </label>
        <select
          id="tz-targets"
          className="field min-h-[140px]"
          multiple
          value={targets}
          onChange={(e) =>
            setTargets(Array.from(e.target.selectedOptions).map((o) => o.value))
          }
        >
          {ZONES.map((z) => (
            <option key={z} value={z}>
              {z.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {instant ? (
        <div className="space-y-3">
          <div className="result-panel">
            <div className="label">Source ({from.replace(/_/g, " ")})</div>
            <div className="value text-[clamp(1.1rem,2.5vw,1.6rem)]">{formatInZone(instant, from)}</div>
          </div>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-bg">
            {targets.map((z) => (
              <li key={z} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-semibold text-ink">{z.replace(/_/g, " ")}</span>
                <span className="font-mono text-sm text-ink-muted">{formatInZone(instant, z)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-danger">Enter a valid date and time.</p>
      )}
    </div>
  );
}
