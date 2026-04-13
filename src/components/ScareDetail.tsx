"use client";

import { Movie } from "@/lib/types";

interface ScareDetailProps {
  movie: Movie;
}

function DotBar({ value, max = 10, color }: { value: number; max?: number; color: string }) {
  return (
    <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            background: i < value ? color : "#38383A",
            transition: "background 0.2s ease",
          }}
        />
      ))}
    </div>
  );
}

function RatingChip({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "#8E8E93",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <DotBar value={value} color={color} />
      <div style={{ fontSize: 12, color: "#8E8E93", marginTop: 4 }}>{value}/10</div>
    </div>
  );
}

export default function ScareDetail({ movie }: ScareDetailProps) {
  if (!movie.whyScary && !movie.scary) return null;

  return (
    <div style={{ marginTop: 24 }}>
      {movie.whyScary && (
        <>
          <h3
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#8E8E93",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 12,
            }}
          >
            Why it hits
          </h3>
          <p
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: "#FFFFFF",
              lineHeight: 1.55,
              borderLeft: "2px solid #FF453A",
              paddingLeft: 12,
              marginBottom: 8,
            }}
          >
            {movie.whyScary}
          </p>
          {movie.scareType && (
            <p
              style={{
                fontSize: 13,
                color: "#8E8E93",
                marginBottom: 16,
                paddingLeft: 14,
              }}
            >
              {movie.scareType}
            </p>
          )}
        </>
      )}

      {movie.scary != null && (
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <RatingChip label="Scare" value={movie.scary} color="#FF453A" />
          {movie.extreme != null && (
            <RatingChip label="Extreme" value={movie.extreme} color="#FF9F0A" />
          )}
          {movie.paceScore != null && (
            <RatingChip label="Pace" value={movie.paceScore} color="#0496FF" />
          )}
        </div>
      )}
    </div>
  );
}
