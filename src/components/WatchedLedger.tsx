"use client";

import { useState } from "react";
import { Movie } from "@/lib/types";
import { getPosterUrl } from "@/lib/posters";
import { getTitleColor } from "@/lib/poster";

interface WatchedLedgerProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function WatchedLedger({ movies, onSelect }: WatchedLedgerProps) {
  const [expanded, setExpanded] = useState(false);
  const watchedMovies = movies.filter((m) => m.watchedByRia);

  if (watchedMovies.length === 0) return null;

  return (
    <div style={{ marginTop: 32 }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "0 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#8E8E93",
            letterSpacing: "-0.01em",
          }}
        >
          Already seen
        </h2>
        <span style={{ fontSize: 15, color: "#8E8E93" }}>
          ({watchedMovies.length})
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          stroke="#8E8E93"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            marginLeft: "auto",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s ease",
          }}
        >
          <path d="M2 4l4 4 4-4" />
        </svg>
      </button>

      {expanded && (
        <div
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 16,
            scrollSnapType: "x mandatory",
          }}
        >
          {watchedMovies.map((movie) => {
            const posterUrl = getPosterUrl(movie.title);
            const { from, to } = getTitleColor(movie.title);

            return (
              <button
                key={movie.title}
                onClick={() => onSelect(movie)}
                style={{
                  flexShrink: 0,
                  width: 120,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: 0,
                  opacity: 0.6,
                  scrollSnapAlign: "start",
                }}
              >
                <div
                  style={{
                    width: 120,
                    height: 180,
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  {posterUrl ? (
                    <img
                      src={posterUrl}
                      alt={movie.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: "grayscale(40%)",
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
                        padding: 12,
                        filter: "grayscale(40%)",
                      }}
                    >
                      <span
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: 12,
                          fontWeight: 600,
                          textAlign: "center",
                        }}
                      >
                        {movie.title}
                      </span>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    color: "#8E8E93",
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: 1.3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: 116,
                  }}
                >
                  {movie.title}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
