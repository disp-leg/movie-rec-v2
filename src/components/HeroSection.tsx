"use client";

import { useState, useEffect } from "react";
import { movies } from "@/lib/movies";
import { getPosterUrl } from "@/lib/posters";
import { Movie } from "@/lib/types";

interface HeroSectionProps {
  onSelect: (movie: Movie) => void;
}

const FEATURED_COUNT = 5;

export default function HeroSection({ onSelect }: HeroSectionProps) {
  const featured = movies.filter((m) => getPosterUrl(m.title)).slice(0, FEATURED_COUNT);
  const [activeIndex, setActiveIndex] = useState(0);
  const movie = featured[activeIndex];
  const posterUrl = getPosterUrl(movie.title);

  // Auto-cycle every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featured.length]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
        minHeight: 480,
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => onSelect(movie)}
    >
      {/* Background poster */}
      {posterUrl && (
        <img
          src={posterUrl}
          alt={movie.title}
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
            "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 80%, #000000 100%)",
        }}
      />

      {/* Content at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          padding: "0 20px",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          {movie.title}
        </h1>

        {/* Genre pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {movie.genres.slice(0, 3).map((genre) => (
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

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(movie);
            }}
            style={{
              background: "#FFFFFF",
              color: "#000000",
              fontSize: 15,
              fontWeight: 600,
              height: 44,
              width: 120,
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#000000">
              <polygon points="6,3 20,12 6,21" />
            </svg>
            Watch
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            style={{
              background: "#2C2C2E",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 600,
              height: 44,
              width: 120,
              borderRadius: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
            </svg>
            Save
          </button>
        </div>

        {/* Dot pagination */}
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          {featured.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(i);
              }}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: i === activeIndex ? "#FFFFFF" : "#38383A",
                transition: "background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
