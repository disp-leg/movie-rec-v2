"use client";

import { movies } from "@/lib/movies";
import MoviePoster from "@/components/MoviePoster";

export default function FeaturedPick() {
  const featured = movies[0]; // Right at Your Door

  return (
    <section
      style={{
        padding: "48px 20px",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Label */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#0496FF",
          marginBottom: 16,
        }}
      >
        Start here
      </p>

      {/* Large poster */}
      <div
        style={{
          width: "100%",
          aspectRatio: "2 / 3",
          borderRadius: 12,
          overflow: "hidden",
          marginBottom: 20,
          maxWidth: 400,
        }}
      >
        <MoviePoster
          title={featured.title}
          size="hero"
          rounded={12}
        />
      </div>

      {/* Title and metadata */}
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1D1D1F",
          lineHeight: 1.2,
          marginBottom: 4,
          letterSpacing: "-0.02em",
        }}
      >
        {featured.title}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: "#6E6E73",
          marginBottom: 16,
          lineHeight: 1.4,
        }}
      >
        {featured.year} &middot; {featured.director} &middot;{" "}
        {featured.rating.toFixed(1)}
      </p>

      {/* Description */}
      <p
        style={{
          fontSize: 17,
          color: "#1D1D1F",
          lineHeight: 1.5,
          letterSpacing: "-0.01em",
        }}
      >
        {featured.description}
      </p>

      {/* Letterboxd quote */}
      {featured.letterboxd.top_positive && (
        <div
          style={{
            marginTop: 24,
            paddingLeft: 16,
            borderLeft: "3px solid #0496FF",
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "#6E6E73",
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            &ldquo;{featured.letterboxd.top_positive}&rdquo;
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#6E6E73",
              marginTop: 4,
            }}
          >
            Letterboxd review
          </p>
        </div>
      )}
    </section>
  );
}
