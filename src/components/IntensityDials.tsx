"use client";

import { DialState, DEFAULT_DIALS } from "@/lib/engine-types";

interface IntensityDialsProps {
  dials: DialState;
  onChange: (dials: DialState) => void;
}

function Slider({
  label,
  value,
  min,
  max,
  displayValue,
  color,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  displayValue: string;
  color: string;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 6,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#8E8E93",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color }}>{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          accentColor: color,
          height: 4,
        }}
      />
    </div>
  );
}

const PACE_LABELS: Record<number, string> = {
  0: "Any",
  1: "Slow",
  2: "Medium",
  3: "Fast",
};

export default function IntensityDials({ dials, onChange }: IntensityDialsProps) {
  const isDefault =
    dials.scary === DEFAULT_DIALS.scary &&
    dials.extreme === DEFAULT_DIALS.extreme &&
    dials.pace === DEFAULT_DIALS.pace;

  return (
    <div
      style={{
        padding: "16px 20px",
        background: "#1C1C1E",
        borderBottom: "0.5px solid #38383A",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#8E8E93",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Intensity
        </h3>
        {!isDefault && (
          <button
            onClick={() => onChange(DEFAULT_DIALS)}
            style={{
              fontSize: 13,
              color: "#0496FF",
              fontWeight: 500,
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        )}
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <Slider
          label="Scare"
          value={dials.scary}
          min={1}
          max={10}
          displayValue={dials.scary === 1 ? "Any" : `${dials.scary}+`}
          color="#FF453A"
          onChange={(v) => onChange({ ...dials, scary: v })}
        />
        <Slider
          label="Extreme"
          value={dials.extreme}
          min={1}
          max={10}
          displayValue={dials.extreme === 10 ? "Any" : `${dials.extreme} max`}
          color="#FF9F0A"
          onChange={(v) => onChange({ ...dials, extreme: v })}
        />
        <Slider
          label="Pace"
          value={dials.pace}
          min={0}
          max={3}
          displayValue={PACE_LABELS[dials.pace]}
          color="#0496FF"
          onChange={(v) => onChange({ ...dials, pace: v })}
        />
      </div>
    </div>
  );
}
