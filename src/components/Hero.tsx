"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import moviesData from "../../data/movies.json";

interface HeroMovie {
  title: string;
  year: number;
  genres: string[];
  posterPath: string;
  description: string;
}

const HERO_COUNT = 8;
const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD = 50;

function getFullPosterUrl(posterPath: string) {
  return `https://image.tmdb.org/t/p/original${posterPath}`;
}

export default function Hero() {
  const heroMovies: HeroMovie[] = useMemo(() => {
    const movies = (moviesData as Array<HeroMovie & Record<string, unknown>>)
      .filter((m) => m.posterPath)
      .slice(0, HERO_COUNT);
    return movies;
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchDelta, setTouchDelta] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set([0]));
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      const next = ((index % HERO_COUNT) + HERO_COUNT) % HERO_COUNT;
      setIsTransitioning(true);
      setActiveIndex(next);
      // Preload adjacent
      setImagesLoaded((prev) => {
        const updated = new Set(prev);
        updated.add(next);
        updated.add((next + 1) % HERO_COUNT);
        return updated;
      });
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-advance
  useEffect(() => {
    autoAdvanceRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [goNext]);

  const resetAutoAdvance = useCallback(() => {
    if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    autoAdvanceRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
  }, [goNext]);

  // Touch handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    setTouchDelta(0);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchStart === null) return;
      setTouchDelta(e.touches[0].clientX - touchStart);
    },
    [touchStart]
  );

  const handleTouchEnd = useCallback(() => {
    if (touchStart === null) return;
    if (touchDelta < -SWIPE_THRESHOLD) {
      goNext();
      resetAutoAdvance();
    } else if (touchDelta > SWIPE_THRESHOLD) {
      goPrev();
      resetAutoAdvance();
    }
    setTouchStart(null);
    setTouchDelta(0);
  }, [touchStart, touchDelta, goNext, goPrev, resetAutoAdvance]);

  // Preload first two images
  useEffect(() => {
    setImagesLoaded(new Set([0, 1]));
  }, []);

  const current = heroMovies[activeIndex];

  return (
    <section
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: "relative",
        height: "60vh",
        minHeight: 420,
        maxHeight: 700,
        width: "100%",
        overflow: "hidden",
        background: "#000",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "pan-y",
      }}
    >
      {/* Poster layers with crossfade */}
      {heroMovies.map((movie, i) => (
        <div
          key={movie.title}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: i === activeIndex ? 1 : 0,
          }}
        >
          {imagesLoaded.has(i) && (
            <img
              src={getFullPosterUrl(movie.posterPath)}
              alt={movie.title}
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
              }}
            />
          )}
        </div>
      ))}

      {/* Gradient overlays — cinematic dimming */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.92) 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.15) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 24px 32px",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Movie title */}
        <h2
          key={current.title}
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(28px, 6vw, 42px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 10,
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            animation: "heroFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {current.title}
        </h2>

        {/* Year */}
        <span
          key={`year-${current.title}`}
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 14,
            animation:
              "heroFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.08s forwards",
            opacity: 0,
          }}
        >
          {current.year} · {current.genres[0]}
        </span>

        {/* Genre pills — frosted glass */}
        <div
          key={`genres-${current.title}`}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 18,
            animation:
              "heroFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.14s forwards",
            opacity: 0,
          }}
        >
          {current.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              style={{
                padding: "5px 14px",
                borderRadius: 100,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "rgba(255,255,255,0.85)",
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px) saturate(180%)",
                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Save to Watchlist button */}
        <button
          key={`btn-${current.title}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 24px",
            borderRadius: 100,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: "#000",
            background: "rgba(255,255,255,0.95)",
            border: "none",
            cursor: "pointer",
            marginBottom: 22,
            transition: "transform 0.2s ease, background 0.2s ease",
            animation:
              "heroFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards",
            opacity: 0,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
          Save to Watchlist
        </button>

        {/* Dot pagination */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
          }}
        >
          {heroMovies.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i);
                resetAutoAdvance();
              }}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === activeIndex ? 24 : 6,
                height: 6,
                borderRadius: 100,
                background:
                  i === activeIndex
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.3)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition:
                  "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
