"use client";

import { movies } from "@/lib/movies";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function FeaturedPick() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const movie = movies[0];

  if (!movie) return null;

  return (
    <section ref={ref} className="py-24 px-6 bg-surface">
      <div
        className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Poster placeholder */}
        <div
          className="w-full rounded-sm overflow-hidden mb-8"
          style={{
            aspectRatio: "2 / 3",
            background: "linear-gradient(160deg, #E5E5EA 0%, #D1D1D6 100%)",
          }}
        >
          <div className="w-full h-full flex items-center justify-center px-8">
            <span className="text-text-secondary text-[20px] font-semibold text-center leading-snug">
              {movie.title}
            </span>
          </div>
        </div>

        {/* Title and year */}
        <h2 className="text-[36px] font-bold text-text-primary leading-tight">
          {movie.title}
        </h2>
        <p className="text-[14px] font-normal text-text-secondary mt-1">
          {movie.year} &middot; Directed by {movie.director}
        </p>

        {/* Description */}
        <p className="text-[18px] font-normal text-text-primary leading-[1.6] mt-6">
          {movie.description}
        </p>

        {/* Genres */}
        <p className="text-[14px] font-normal text-text-secondary mt-4">
          {movie.genres.join(", ")}
        </p>

        {/* Letterboxd quotes */}
        {movie.letterboxd.top_positive && (
          <blockquote className="mt-8 pl-4 border-l-2 border-accent">
            <p className="text-[15px] font-normal text-text-secondary leading-relaxed italic">
              &ldquo;{movie.letterboxd.top_positive}&rdquo;
            </p>
          </blockquote>
        )}
        {movie.letterboxd.top_negative && (
          <blockquote className="mt-4 pl-4 border-l-2 border-accent">
            <p className="text-[15px] font-normal text-text-secondary leading-relaxed italic">
              &ldquo;{movie.letterboxd.top_negative}&rdquo;
            </p>
          </blockquote>
        )}
      </div>
    </section>
  );
}
