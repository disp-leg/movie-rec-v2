"use client";

import { useState } from "react";
import { Movie } from "@/lib/types";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface MovieEntryProps {
  movie: Movie;
  variant: "full-bleed" | "inset" | "landscape" | "text-first";
  index: number;
  isNew: boolean;
  isSaved: boolean;
  isSkipped: boolean;
  onSave: () => void;
  onSkip: () => void;
  onMarkSeen: () => void;
  onExpand: () => void;
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "#0496FF" : "none"}
      stroke={filled ? "#0496FF" : "#6E6E73"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18l-7-4-7 4V4z" />
    </svg>
  );
}

function StreamingInfo({ movie }: { movie: Movie }) {
  const { svod, vod, free } = movie.whereToWatch;
  const hasAny = svod.length > 0 || vod.length > 0 || free.length > 0;
  if (!hasAny) return null;

  return (
    <div className="mt-4">
      <p className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider mb-2">
        Where to watch
      </p>
      {free.length > 0 && (
        <p className="text-[14px] text-text-primary">
          <span className="text-accent font-medium">Free: </span>
          {free.join(", ")}
        </p>
      )}
      {svod.length > 0 && (
        <p className="text-[14px] text-text-primary mt-1">
          <span className="text-text-secondary">Streaming: </span>
          {svod.join(", ")}
        </p>
      )}
      {vod.length > 0 && (
        <p className="text-[14px] text-text-primary mt-1">
          <span className="text-text-secondary">Rent/Buy: </span>
          {vod.join(", ")}
        </p>
      )}
    </div>
  );
}

function PosterPlaceholder({ title, aspect = "2 / 3", className = "" }: { title: string; aspect?: string; className?: string }) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  const bg = `linear-gradient(160deg, hsl(${hue}, 12%, 90%) 0%, hsl(${(hue + 30) % 360}, 18%, 82%) 100%)`;

  return (
    <div
      className={`w-full flex items-center justify-center ${className}`}
      style={{ aspectRatio: aspect, background: bg }}
    >
      <span className="text-text-secondary text-[15px] font-semibold text-center px-6 opacity-60">
        {title}
      </span>
    </div>
  );
}

export default function MovieEntry({
  movie, variant, isNew, isSaved, isSkipped, onSave, onSkip, onMarkSeen, onExpand,
}: MovieEntryProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    if (!expanded) onExpand();
    setExpanded(!expanded);
  };

  const hookText =
    movie.description.length > 120
      ? movie.description.slice(0, 120) + "..."
      : movie.description;

  const badges = (
    <span className="inline-flex gap-2 ml-2">
      {isNew && (
        <span className="text-[11px] font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
          New
        </span>
      )}
      {isSkipped && (
        <span className="text-[11px] font-medium text-text-secondary bg-surface-secondary px-2 py-0.5 rounded-full">
          Dismissed
        </span>
      )}
    </span>
  );

  const expandedContent = (
    <div
      className="overflow-hidden transition-all duration-500 ease-out"
      style={{ maxHeight: expanded ? "1200px" : "0", opacity: expanded ? 1 : 0 }}
    >
      <div className="pt-4">
        <p className="text-[16px] text-text-primary leading-[1.6]">
          {movie.description}
        </p>

        {movie.letterboxd.top_positive && (
          <blockquote className="mt-6 pl-4 border-l-2 border-accent">
            <p className="text-[14px] text-text-secondary leading-relaxed italic">
              &ldquo;{movie.letterboxd.top_positive}&rdquo;
            </p>
          </blockquote>
        )}
        {movie.letterboxd.top_negative && (
          <blockquote className="mt-3 pl-4 border-l-2 border-separator">
            <p className="text-[14px] text-text-secondary leading-relaxed italic">
              &ldquo;{movie.letterboxd.top_negative}&rdquo;
            </p>
          </blockquote>
        )}

        <StreamingInfo movie={movie} />

        <div className="mt-5 flex items-center gap-4">
          <button
            onClick={(e) => { e.stopPropagation(); onSave(); }}
            className="flex items-center gap-1.5 py-1 transition-opacity hover:opacity-70"
            aria-label={isSaved ? "Remove bookmark" : "Save"}
          >
            <BookmarkIcon filled={isSaved} />
            <span className="text-[13px] text-text-secondary">
              {isSaved ? "Saved" : "Save"}
            </span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMarkSeen(); }}
            className="text-[13px] text-text-secondary hover:text-text-primary transition-colors py-1"
          >
            Already watched
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onSkip(); }}
            className="text-[13px] text-text-secondary hover:text-text-primary transition-colors py-1"
          >
            {isSkipped ? "Undo dismiss" : "Not for me"}
          </button>
        </div>
      </div>
    </div>
  );

  const titleBlock = (size: string = "28px") => (
    <>
      <h3 className={`text-[${size}] font-bold text-text-primary leading-tight`}>
        {movie.title}
        {badges}
      </h3>
      <p className="text-[14px] text-text-secondary mt-1">
        {movie.year} &middot; {movie.rating}/10
      </p>
    </>
  );

  const baseClass = `border-b border-separator transition-all duration-700 ease-out cursor-pointer ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  } ${isSkipped ? "opacity-60" : ""}`;

  if (variant === "full-bleed") {
    return (
      <article ref={ref} className={baseClass} onClick={handleClick}>
        <PosterPlaceholder title={movie.title} />
        <div className="px-6 py-6">
          {titleBlock()}
          {!expanded && (
            <p className="text-[15px] text-text-secondary mt-2 leading-relaxed">{hookText}</p>
          )}
          {expandedContent}
        </div>
      </article>
    );
  }

  if (variant === "inset") {
    return (
      <article ref={ref} className={`${baseClass} px-6 py-6`} onClick={handleClick}>
        <div className="flex gap-5">
          <div className="shrink-0 rounded-sm overflow-hidden" style={{ width: "140px" }}>
            <PosterPlaceholder title={movie.title} className="rounded-sm" />
          </div>
          <div className="flex-1 min-w-0">
            {titleBlock("22px")}
            <p className="text-[13px] text-text-secondary mt-1">{movie.director}</p>
            {!expanded && (
              <p className="text-[13px] text-text-secondary mt-2 leading-relaxed line-clamp-3">{hookText}</p>
            )}
          </div>
        </div>
        {expandedContent}
      </article>
    );
  }

  if (variant === "landscape") {
    return (
      <article ref={ref} className={baseClass} onClick={handleClick}>
        <PosterPlaceholder title={movie.title} aspect="16 / 9" />
        <div className="px-6 py-6">
          {titleBlock()}
          {!expanded && (
            <p className="text-[15px] text-text-secondary mt-2 leading-relaxed">{hookText}</p>
          )}
          {expandedContent}
        </div>
      </article>
    );
  }

  // text-first
  return (
    <article ref={ref} className={`${baseClass} px-6 py-8`} onClick={handleClick}>
      {titleBlock()}
      <p className="text-[13px] text-text-secondary mt-1">{movie.director}</p>
      {!expanded && (
        <p className="text-[15px] text-text-secondary mt-3 leading-relaxed">{hookText}</p>
      )}
      {expandedContent}
    </article>
  );
}
