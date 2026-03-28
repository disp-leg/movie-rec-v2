"use client";

import { useRef, useState, useCallback } from "react";
import { Movie } from "@/lib/types";
import { getMoviesByCategory } from "@/lib/movies";
import { getPosterUrl } from "@/lib/posters";

const CATEGORY_ROWS = [
  { id: "survival", label: "Survival" },
  { id: "psychological", label: "Psychological" },
  { id: "post-apocalyptic", label: "Post-Apocalyptic" },
  { id: "isolation", label: "Isolation" },
  { id: "bunker", label: "Bunker Films" },
  { id: "confined", label: "Confined Space" },
  { id: "group-dynamics", label: "Group Dynamics" },
];

const POSTER_WIDTH = 164;
const POSTER_HEIGHT = 246; // 2:3 ratio
const GAP = 14;
const PADDING_X = 20;

interface CategoryRowsProps {
  movies: Movie[];
  onSave: (title: string) => void;
  onExpand: (title: string) => void;
  onPosterTap?: (movie: Movie) => void;
}

function CategoryRow({
  label,
  movies,
  onPosterTap,
}: {
  label: string;
  movies: Movie[];
  onPosterTap?: (movie: Movie) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

  const handlePointerDown = useCallback((index: number) => {
    setPressedIndex(index);
  }, []);

  const handlePointerUp = useCallback(() => {
    setPressedIndex(null);
  }, []);

  if (movies.length === 0) return null;

  return (
    <div style={{ marginBottom: 36 }}>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#FFFFFF",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          padding: `0 ${PADDING_X}px`,
          marginBottom: 14,
        }}
      >
        {label}
      </h3>
      <div
        ref={scrollRef}
        className="category-scroll"
        style={{
          display: "flex",
          gap: GAP,
          overflowX: "auto",
          paddingLeft: PADDING_X,
          paddingRight: PADDING_X,
          paddingBottom: 4,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {movies.map((movie, index) => {
          const posterUrl = getPosterUrl(movie.title);
          const isPressed = pressedIndex === index;

          return (
            <div
              key={movie.title}
              role="button"
              tabIndex={0}
              onPointerDown={() => handlePointerDown(index)}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onClick={() => onPosterTap?.(movie)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onPosterTap?.(movie);
              }}
              style={{
                flexShrink: 0,
                scrollSnapAlign: "start",
                width: POSTER_WIDTH,
                height: POSTER_HEIGHT,
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                transform: isPressed ? "scale(0.95)" : "scale(1)",
                transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                outline: "none",
              }}
            >
              {posterUrl ? (
                <img
                  src={posterUrl}
                  alt={movie.title}
                  loading="lazy"
                  draggable={false}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    userSelect: "none",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(145deg, #2A2A2E, #1A1A1E)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 14,
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: 1.2,
                    }}
                  >
                    {movie.title}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CategoryRows({ onPosterTap }: CategoryRowsProps) {
  return (
    <section
      style={{
        paddingTop: 44,
        paddingBottom: 16,
        backgroundColor: "#000000",
      }}
    >
      {CATEGORY_ROWS.map((cat) => {
        const catMovies = getMoviesByCategory(cat.id);
        return (
          <CategoryRow
            key={cat.id}
            label={cat.label}
            movies={catMovies}
            onPosterTap={onPosterTap}
          />
        );
      })}
    </section>
  );
}
