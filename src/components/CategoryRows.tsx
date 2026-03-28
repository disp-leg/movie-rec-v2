"use client";

import { Movie } from "@/lib/types";
import { getMoviesByCategory } from "@/lib/movies";
import MoviePoster from "@/components/MoviePoster";

const CATEGORY_ROWS = [
  { id: "survival", label: "Survival" },
  { id: "bunker", label: "Bunker Films" },
  { id: "psychological", label: "Psychological" },
  { id: "post-apocalyptic", label: "Post-Apocalyptic" },
  { id: "confined", label: "Confined Space" },
  { id: "group-dynamics", label: "Group Dynamics" },
];

interface CategoryRowsProps {
  movies: Movie[];
  onSave: (title: string) => void;
  onExpand: (title: string) => void;
}

function CategoryRow({
  label,
  movies,
}: {
  label: string;
  movies: Movie[];
}) {
  if (movies.length === 0) return null;

  return (
    <div style={{ marginBottom: 40 }}>
      <h3
        style={{
          fontSize: 22,
          fontWeight: 600,
          color: "#1D1D1F",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          padding: "0 20px",
          marginBottom: 16,
        }}
      >
        {label}
      </h3>
      <div
        className="category-scroll"
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 4,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.title}
            style={{
              flexShrink: 0,
              scrollSnapAlign: "start",
              width: 140,
            }}
          >
            <MoviePoster title={movie.title} size="medium" />
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1D1D1F",
                marginTop: 8,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {movie.title}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "#6E6E73",
                marginTop: 2,
              }}
            >
              {movie.year}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function CategoryRows(_props: CategoryRowsProps) {
  return (
    <section
      style={{
        paddingTop: 48,
        paddingBottom: 8,
        backgroundColor: "#F5F5F7",
      }}
    >
      <h2
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#6E6E73",
          padding: "0 20px",
          marginBottom: 24,
        }}
      >
        Browse by mood
      </h2>
      {CATEGORY_ROWS.map((cat) => {
        const catMovies = getMoviesByCategory(cat.id);
        return (
          <CategoryRow
            key={cat.id}
            label={cat.label}
            movies={catMovies}
          />
        );
      })}
    </section>
  );
}
