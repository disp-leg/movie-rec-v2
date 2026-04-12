"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { getPosterUrl } from "@/lib/posters";
import { getTitleColor } from "@/lib/poster";
import ScareDetail from "@/components/ScareDetail";

interface DetailOverlayProps {
  movie: Movie;
  onClose: () => void;
  onSave: () => void;
  onMarkSeen: () => void;
  isSaved: boolean;
}

export default function DetailOverlay({
  movie,
  onClose,
  onSave,
  onMarkSeen,
  isSaved,
}: DetailOverlayProps) {
  const [visible, setVisible] = useState(false);
  const posterUrl = getPosterUrl(movie.title);
  const { from, to } = getTitleColor(movie.title);

  useEffect(() => {
    // Trigger slide-up animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const allPlatforms = [
    ...movie.whereToWatch.free.map((p) => ({ name: p, free: true })),
    ...movie.whereToWatch.svod.map((p) => ({ name: p, free: false })),
    ...movie.whereToWatch.vod.map((p) => ({ name: p, free: false })),
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#1C1C1E",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
      }}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 210,
          color: "#0496FF",
          fontSize: 17,
          fontWeight: 600,
          background: "rgba(28,28,30,0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: 16,
          padding: "6px 16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Done
      </button>

      {/* Poster */}
      <div
        style={{
          width: "100%",
          aspectRatio: "2/3",
          maxHeight: "60vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(145deg, ${from}, ${to})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 28, fontWeight: 700 }}>
              {movie.title}
            </span>
          </div>
        )}
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: "linear-gradient(transparent, #1C1C1E)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "0 20px 120px" }}>
        {/* Title */}
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginTop: -8,
          }}
        >
          {movie.title}
        </h1>

        {/* Meta */}
        <p
          style={{
            fontSize: 15,
            color: "#8E8E93",
            marginTop: 8,
          }}
        >
          {movie.year} &middot; {movie.director} &middot; {movie.rating}/10
        </p>

        {/* Genre pills */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          {movie.genres.map((genre) => (
            <span
              key={genre}
              style={{
                background: "#2C2C2E",
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: 500,
                padding: "6px 12px",
                borderRadius: 12,
                lineHeight: 1,
              }}
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            color: "#FFFFFF",
            lineHeight: 1.6,
            marginTop: 16,
          }}
        >
          {movie.description}
        </p>

        {/* Scare detail (engine data) */}
        <ScareDetail movie={movie} />

        {/* Reviews */}
        <div style={{ marginTop: 24 }}>
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
            What people said
          </h3>

          {/* Positive */}
          <div
            style={{
              borderLeft: "2px solid #0496FF",
              paddingLeft: 12,
              marginBottom: 12,
            }}
          >
            <p style={{ fontSize: 14, color: "#8E8E93", lineHeight: 1.5 }}>
              {movie.letterboxd.top_positive}
            </p>
          </div>

          {/* Negative */}
          <div
            style={{
              borderLeft: "2px solid #38383A",
              paddingLeft: 12,
            }}
          >
            <p style={{ fontSize: 14, color: "#8E8E93", lineHeight: 1.5 }}>
              {movie.letterboxd.top_negative}
            </p>
          </div>
        </div>

        {/* Where to watch */}
        {allPlatforms.length > 0 && (
          <div style={{ marginTop: 24 }}>
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
              Where to watch
            </h3>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {allPlatforms.map((p) => (
                <span
                  key={p.name}
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "8px 14px",
                    borderRadius: 8,
                    background: p.free ? "rgba(4, 150, 255, 0.15)" : "#2C2C2E",
                    color: p.free ? "#0496FF" : "#FFFFFF",
                    border: p.free ? "1px solid rgba(4, 150, 255, 0.3)" : "1px solid transparent",
                  }}
                >
                  {p.name}
                  {p.free && (
                    <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.7 }}>FREE</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ marginTop: 24 }}>
          <button
            onClick={onSave}
            style={{
              width: "100%",
              height: 48,
              borderRadius: 12,
              background: isSaved ? "#0496FF" : "#2C2C2E",
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "none",
              cursor: "pointer",
              transition: "background 0.2s ease",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={isSaved ? "#FFFFFF" : "none"}
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            {isSaved ? "Saved" : "Save"}
          </button>

          <button
            onClick={onMarkSeen}
            style={{
              width: "100%",
              marginTop: 12,
              color: "#8E8E93",
              fontSize: 15,
              fontWeight: 500,
              padding: "12px 0",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Already seen
          </button>
        </div>
      </div>
    </div>
  );
}
