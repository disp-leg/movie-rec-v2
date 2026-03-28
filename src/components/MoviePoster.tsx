"use client";

import { getPosterUrl } from "@/lib/posters";
import { getTitleColor } from "@/lib/poster";

interface MoviePosterProps {
  title: string;
  width?: number;
  height?: number;
  rounded?: number;
  className?: string;
}

export default function MoviePoster({
  title,
  width = 140,
  height = 210,
  rounded = 8,
  className = "",
}: MoviePosterProps) {
  const posterUrl = getPosterUrl(title);
  const { from, to } = getTitleColor(title);

  if (posterUrl) {
    return (
      <img
        src={posterUrl}
        alt={title}
        loading="lazy"
        className={className}
        style={{
          width,
          height,
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
        width,
        height,
        borderRadius: rounded,
        background: `linear-gradient(145deg, ${from}, ${to})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 14,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        {title}
      </span>
    </div>
  );
}
