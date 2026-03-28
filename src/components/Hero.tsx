"use client";

import { getPosterUrl } from "@/lib/posters";
import { getTitleColor } from "@/lib/poster";

export default function Hero() {
  const featuredTitle = "Right at Your Door";
  const posterUrl = getPosterUrl(featuredTitle);
  const { from, to } = getTitleColor(featuredTitle);

  return (
    <section
      style={{
        position: "relative",
        height: "85vh",
        minHeight: 540,
        width: "100%",
        overflow: "hidden",
        background: posterUrl
          ? undefined
          : `linear-gradient(165deg, ${from}, ${to}, #1D1D1F)`,
      }}
    >
      {posterUrl && (
        <img
          src={posterUrl}
          alt={featuredTitle}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.7) 85%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 20px 48px",
        }}
      >
        <h1
          style={{
            color: "#FFFFFF",
            fontSize: 34,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          Movie Rec
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 17,
            fontWeight: 400,
            lineHeight: 1.4,
            letterSpacing: "-0.01em",
          }}
        >
          26 films for the ones who liked it bleak
        </p>
      </div>
    </section>
  );
}
