"use client";

import { RankedMovie } from "@/lib/behavior";
import MovieEntry from "./MovieEntry";
import TypographyBreak from "./TypographyBreak";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const VARIANTS: Array<"full-bleed" | "inset" | "landscape" | "text-first"> = [
  "full-bleed",
  "inset",
  "landscape",
  "text-first",
];

const CATEGORY_LABELS: Record<string, { label: string; sublabel?: string }> = {
  survival: { label: "Sealed in", sublabel: "Bunkers, shelters, and nowhere to go" },
  isolation: { label: "Sealed in", sublabel: "Bunkers, shelters, and nowhere to go" },
  bunker: { label: "Sealed in", sublabel: "Bunkers, shelters, and nowhere to go" },
  psychological: { label: "Slow rot", sublabel: "Dread that builds by the frame" },
  "group-dynamics": { label: "Fracture point", sublabel: "When the group turns on itself" },
  "post-apocalyptic": { label: "After everything", sublabel: "What remains when the dust settles" },
  claustrophobic: { label: "Sealed in", sublabel: "Bunkers, shelters, and nowhere to go" },
  confined: { label: "Sealed in", sublabel: "Bunkers, shelters, and nowhere to go" },
};

interface MovieBrowseProps {
  rankedMovies: RankedMovie[];
  onSave: (title: string) => void;
  onSkip: (title: string) => void;
  onMarkSeen: (title: string) => void;
  onExpand: (title: string) => void;
}

export default function MovieBrowse({ rankedMovies, onSave, onSkip, onMarkSeen, onExpand }: MovieBrowseProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  const visibleMovies = rankedMovies.filter((rm) => !rm.isSeen);

  const elements: React.ReactNode[] = [];
  const usedLabels = new Set<string>();

  visibleMovies.forEach((ranked, i) => {
    if (i > 0 && i % 5 === 0) {
      const upcomingCats = visibleMovies
        .slice(i, i + 5)
        .flatMap((rm) => rm.movie.categories);
      const freshCat = upcomingCats.find((c) => !usedLabels.has(c));
      const catKey = freshCat || upcomingCats[0] || "survival";
      usedLabels.add(catKey);
      const labelInfo = CATEGORY_LABELS[catKey] || {
        label: catKey.charAt(0).toUpperCase() + catKey.slice(1),
      };

      elements.push(
        <TypographyBreak
          key={`break-${i}`}
          label={labelInfo.label}
          sublabel={labelInfo.sublabel}
        />
      );
    }

    const variant = VARIANTS[i % VARIANTS.length];
    elements.push(
      <MovieEntry
        key={ranked.movie.title}
        movie={ranked.movie}
        variant={variant}
        index={i}
        isNew={ranked.isNew}
        isSaved={ranked.isSaved}
        isSkipped={ranked.isSkipped}
        onSave={() => onSave(ranked.movie.title)}
        onSkip={() => onSkip(ranked.movie.title)}
        onMarkSeen={() => onMarkSeen(ranked.movie.title)}
        onExpand={() => onExpand(ranked.movie.title)}
      />
    );
  });

  return (
    <section id="collection" className="pb-24 bg-surface">
      <div
        ref={ref}
        className={`max-w-2xl mx-auto px-6 mb-16 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-[36px] font-bold text-text-primary">
          The{" "}
          <span className="relative inline-block">
            Collection
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 160 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8C22 3 42 10 62 6C82 2 102 9 122 5C142 1 158 7 158 7"
                stroke="#0496FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </h2>
      </div>

      <div className="max-w-2xl mx-auto">{elements}</div>
    </section>
  );
}
