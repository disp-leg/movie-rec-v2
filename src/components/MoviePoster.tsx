"use client";

import { getPosterUrl } from "@/lib/posters";
import { getTitleColor } from "@/lib/poster";

interface MoviePosterProps {
  title: string;
  size?: "small" | "medium" | "large" | "hero";
  className?: string;
  rounded?: number;
}

const SIZE_MAP = {
  small: { width: 80, height: 120 },
  medium: { width: 140, height: 210 },
  large: { width: 280, height: 420 },
  hero: { width: 0, height: 0 }, // full container
};

export default function MoviePoster({
  title,
  size = "medium",
  className = "",
  rounded = 8,
}: MoviePosterProps) {
  const posterUrl = getPosterUrl(title);
  const { from, to } = getTitleColor(title);
  const dimensions = SIZE_MAP[size];

  const sizeStyle =
    size === "hero"
      ? { width: "100%", height: "100%" }
      : { width: dimensions.width, height: dimensions.height };

  if (posterUrl) {
    return (
      <img
        src={posterUrl}
        alt={title}
        loading="lazy"
        className={className}
        style={{
          ...sizeStyle,
          objectFit: "cover",
          borderRadius: rounded,
          display: "block",
        }}
      />
    );
  }

  return (
    <div
      className={className}
      style={{
        ...sizeStyle,
        borderRadius: rounded,
        background: `linear-gradient(145deg, ${from}, ${to})`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: size === "small" ? 8 : 14,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: size === "small" ? 11 : size === "medium" ? 13 : 16,
          fontWeight: 600,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </span>
    </div>
  );
}
