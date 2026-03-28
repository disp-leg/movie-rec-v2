"use client";

import { Movie } from "@/lib/types";

interface MovieDetailProps {
  movie: Movie;
  isSaved: boolean;
  isSeen: boolean;
  onSave: (title: string) => void;
  onSkip: (title: string) => void;
  onMarkSeen: (title: string) => void;
}

export default function MovieDetail({
  movie,
  isSaved,
  isSeen,
  onSave,
  onSkip,
  onMarkSeen,
}: MovieDetailProps) {
  const allStreaming = [
    ...movie.whereToWatch.free.map((s) => ({ name: s, free: true })),
    ...movie.whereToWatch.svod.map((s) => ({ name: s, free: false })),
    ...movie.whereToWatch.vod.map((s) => ({ name: s, free: false })),
  ];

  return (
    <div
      style={{
        padding: "16px 0 20px",
      }}
    >
      {/* Description */}
      <p
        style={{
          fontSize: 15,
          color: "#1D1D1F",
          lineHeight: 1.5,
          marginBottom: 20,
          letterSpacing: "-0.01em",
        }}
      >
        {movie.description}
      </p>

      {/* Director + Genres */}
      <p
        style={{
          fontSize: 13,
          color: "#6E6E73",
          marginBottom: 20,
        }}
      >
        Dir. {movie.director} &middot; {movie.genres.join(", ")}
      </p>

      {/* Letterboxd Quotes */}
      {movie.letterboxd.top_positive && (
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              paddingLeft: 14,
              borderLeft: "3px solid #0496FF",
              marginBottom: 12,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#1D1D1F",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              &ldquo;{movie.letterboxd.top_positive}&rdquo;
            </p>
          </div>
        </div>
      )}

      {movie.letterboxd.top_negative && (
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              paddingLeft: 14,
              borderLeft: "3px solid #E5E5EA",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#6E6E73",
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              &ldquo;{movie.letterboxd.top_negative}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Where to Watch */}
      {allStreaming.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#6E6E73",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Where to watch
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {allStreaming.map((s) => (
              <span
                key={s.name}
                style={{
                  fontSize: 13,
                  padding: "5px 10px",
                  borderRadius: 6,
                  backgroundColor: s.free ? "#E8F5E9" : "#F5F5F7",
                  color: s.free ? "#2E7D32" : "#1D1D1F",
                  fontWeight: s.free ? 600 : 400,
                }}
              >
                {s.name}
                {s.free && " (free)"}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => onSave(movie.title)}
          style={{
            fontSize: 14,
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: 8,
            backgroundColor: isSaved ? "#0496FF" : "#F5F5F7",
            color: isSaved ? "#FFFFFF" : "#1D1D1F",
            transition: "all 0.2s ease",
          }}
        >
          {isSaved ? "Saved" : "Save for later"}
        </button>
        <button
          onClick={() => onMarkSeen(movie.title)}
          style={{
            fontSize: 14,
            fontWeight: 400,
            padding: "8px 16px",
            borderRadius: 8,
            backgroundColor: isSeen ? "#E8F5E9" : "#F5F5F7",
            color: isSeen ? "#2E7D32" : "#6E6E73",
            transition: "all 0.2s ease",
          }}
        >
          {isSeen ? "Seen" : "Already seen"}
        </button>
        <button
          onClick={() => onSkip(movie.title)}
          style={{
            fontSize: 14,
            fontWeight: 400,
            padding: "8px 16px",
            borderRadius: 8,
            backgroundColor: "#F5F5F7",
            color: "#6E6E73",
            transition: "all 0.2s ease",
          }}
        >
          Not for me
        </button>
      </div>
    </div>
  );
}
