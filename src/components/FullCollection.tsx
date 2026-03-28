"use client";

import { useState } from "react";
import { RankedMovie } from "@/lib/behavior";
import MoviePoster from "@/components/MoviePoster";
import MovieDetail from "@/components/MovieDetail";

interface FullCollectionProps {
  rankedMovies: RankedMovie[];
  onSave: (title: string) => void;
  onSkip: (title: string) => void;
  onMarkSeen: (title: string) => void;
  onExpand: (title: string) => void;
}

function CollectionItem({
  ranked,
  isExpanded,
  onToggle,
  onSave,
  onSkip,
  onMarkSeen,
}: {
  ranked: RankedMovie;
  isExpanded: boolean;
  onToggle: () => void;
  onSave: (title: string) => void;
  onSkip: (title: string) => void;
  onMarkSeen: (title: string) => void;
}) {
  const { movie, isSaved, isSeen } = ranked;

  return (
    <div
      style={{
        borderBottom: "1px solid #E5E5EA",
      }}
    >
      {/* Compact row */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          gap: 14,
          padding: "16px 0",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <MoviePoster title={movie.title} size="small" rounded={6} />
        </div>
        <div style={{ flex: 1, minWidth: 0, paddingTop: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h3
              style={{
                fontSize: 17,
                fontWeight: 600,
                color: "#1D1D1F",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}
            >
              {movie.title}
            </h3>
            {isSaved && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#0496FF",
                  backgroundColor: "rgba(4, 150, 255, 0.1)",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                Saved
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: 13,
              color: "#6E6E73",
              marginTop: 2,
            }}
          >
            {movie.year} &middot; {movie.director}
          </p>
          <p
            style={{
              fontSize: 15,
              color: "#1D1D1F",
              lineHeight: 1.4,
              marginTop: 6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              opacity: isSeen ? 0.5 : 1,
            }}
          >
            {movie.description}
          </p>
          {/* Expand chevron */}
          <span
            style={{
              display: "inline-block",
              fontSize: 13,
              color: "#0496FF",
              marginTop: 6,
              fontWeight: 500,
            }}
          >
            {isExpanded ? "Less" : "More"}
          </span>
        </div>
      </button>

      {/* Expanded detail */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isExpanded ? 1000 : 0,
          transition: "max-height 0.35s ease",
          paddingLeft: 94,
        }}
      >
        {isExpanded && (
          <MovieDetail
            movie={movie}
            isSaved={isSaved}
            isSeen={isSeen}
            onSave={onSave}
            onSkip={onSkip}
            onMarkSeen={onMarkSeen}
          />
        )}
      </div>
    </div>
  );
}

export default function FullCollection({
  rankedMovies,
  onSave,
  onSkip,
  onMarkSeen,
  onExpand,
}: FullCollectionProps) {
  const [expandedTitle, setExpandedTitle] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    if (expandedTitle === title) {
      setExpandedTitle(null);
    } else {
      setExpandedTitle(title);
      onExpand(title);
    }
  };

  return (
    <section
      style={{
        padding: "48px 20px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1D1D1F",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          marginBottom: 24,
        }}
      >
        All 26 Films
      </h2>

      <div>
        {rankedMovies.map((ranked) => (
          <CollectionItem
            key={ranked.movie.title}
            ranked={ranked}
            isExpanded={expandedTitle === ranked.movie.title}
            onToggle={() => handleToggle(ranked.movie.title)}
            onSave={onSave}
            onSkip={onSkip}
            onMarkSeen={onMarkSeen}
          />
        ))}
      </div>
    </section>
  );
}
