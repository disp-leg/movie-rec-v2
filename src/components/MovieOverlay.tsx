"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Movie } from "@/lib/types";
import { getPosterUrl } from "@/lib/posters";

interface MovieOverlayProps {
  movie: Movie | null;
  onClose: () => void;
  onSave?: (title: string) => void;
  onWatched?: (title: string) => void;
}

export default function MovieOverlay({
  movie,
  onClose,
  onSave,
  onWatched,
}: MovieOverlayProps) {
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [watched, setWatched] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  // Animate in
  useEffect(() => {
    if (movie) {
      setSaved(false);
      setWatched(false);
      // Small delay so the DOM renders before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
    }
  }, [movie]);

  // Close with animation
  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 340);
  }, [onClose]);

  // Backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) handleClose();
    },
    [handleClose]
  );

  // Swipe-to-dismiss
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - startY.current;
    currentY.current = Math.max(0, delta);
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${currentY.current}px)`;
      sheetRef.current.style.transition = "none";
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (sheetRef.current) {
      sheetRef.current.style.transition =
        "transform 0.34s cubic-bezier(0.32, 0.72, 0, 1)";
      if (currentY.current > 120) {
        handleClose();
      } else {
        sheetRef.current.style.transform = "translateY(0)";
      }
    }
    currentY.current = 0;
  }, [handleClose]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (movie) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [movie, handleClose]);

  if (!movie) return null;

  const posterUrl = getPosterUrl(movie.title);
  const hasFreeStreaming = movie.whereToWatch.free.length > 0;
  const hasSvod = movie.whereToWatch.svod.length > 0;
  const hasVod = movie.whereToWatch.vod.length > 0;

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: visible ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)",
        transition: "background-color 0.34s ease",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        // Prevent scrolling the page behind
        touchAction: "none",
      }}
    >
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: "100%",
          maxWidth: 480,
          maxHeight: "94vh",
          overflowY: "auto",
          backgroundColor: "#111113",
          borderRadius: "20px 20px 0 0",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.34s cubic-bezier(0.32, 0.72, 0, 1)",
          position: "relative",
        }}
        className="category-scroll"
      >
        {/* Drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 6,
            position: "sticky",
            top: 0,
            zIndex: 2,
          }}
        >
          <div
            style={{
              width: 36,
              height: 5,
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.25)",
            }}
          />
        </div>

        {/* Poster */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "8px 20px 0",
          }}
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              style={{
                width: 200,
                height: 300,
                objectFit: "cover",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            />
          ) : (
            <div
              style={{
                width: 200,
                height: 300,
                borderRadius: 12,
                background: "linear-gradient(145deg, #2A2A2E, #1A1A1E)",
              }}
            />
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "20px 24px 32px" }}>
          {/* Title + Year + Director */}
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {movie.title}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.5)",
              textAlign: "center",
              marginTop: 6,
            }}
          >
            {movie.year} &middot; {movie.director}
          </p>

          {/* Description */}
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.75)",
              marginTop: 20,
            }}
          >
            {movie.description}
          </p>

          {/* Letterboxd Reviews */}
          {movie.letterboxd && (
            <div style={{ marginTop: 24 }}>
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 12,
                }}
              >
                Letterboxd
              </h4>
              <div
                style={{
                  padding: "14px 16px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.7)",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{movie.letterboxd.top_positive}&rdquo;
                </p>
              </div>
              <div
                style={{
                  padding: "14px 16px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  borderRadius: 12,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.5)",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{movie.letterboxd.top_negative}&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Where to Watch */}
          {(hasFreeStreaming || hasSvod || hasVod) && (
            <div style={{ marginTop: 24 }}>
              <h4
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: 12,
                }}
              >
                Where to Watch
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {movie.whereToWatch.free.map((service) => (
                  <span
                    key={service}
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#34C759",
                      backgroundColor: "rgba(52,199,89,0.12)",
                      padding: "6px 12px",
                      borderRadius: 20,
                    }}
                  >
                    {service}
                  </span>
                ))}
                {movie.whereToWatch.svod.map((service) => (
                  <span
                    key={service}
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#0A84FF",
                      backgroundColor: "rgba(10,132,255,0.12)",
                      padding: "6px 12px",
                      borderRadius: 20,
                    }}
                  >
                    {service}
                  </span>
                ))}
                {movie.whereToWatch.vod.map((service) => (
                  <span
                    key={service}
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.55)",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      padding: "6px 12px",
                      borderRadius: 20,
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 28,
            }}
          >
            <button
              onClick={() => {
                setSaved(!saved);
                onSave?.(movie.title);
              }}
              style={{
                flex: 1,
                height: 50,
                borderRadius: 14,
                backgroundColor: saved
                  ? "#0A84FF"
                  : "rgba(255,255,255,0.1)",
                color: saved ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                fontSize: 15,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={saved ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={() => {
                setWatched(!watched);
                onWatched?.(movie.title);
              }}
              style={{
                flex: 1,
                height: 50,
                borderRadius: 14,
                backgroundColor: watched
                  ? "#34C759"
                  : "rgba(255,255,255,0.1)",
                color: watched ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                fontSize: 15,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                transition: "background-color 0.2s ease, color 0.2s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {watched ? (
                  <path d="M20 6L9 17l-5-5" />
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </>
                )}
              </svg>
              {watched ? "Watched" : "Watched?"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
