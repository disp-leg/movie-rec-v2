"use client";

import { getAllCategories } from "@/lib/movies";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CATEGORY_DISPLAY: Record<string, string> = {
  survival: "Survival",
  isolation: "Isolation",
  bunker: "Bunker",
  psychological: "Psychological",
  "group-dynamics": "Group Dynamics",
  "post-apocalyptic": "Post-Apocalyptic",
  claustrophobic: "Claustrophobic",
  confined: "Confined",
};

interface CategoryLinksProps {
  activeCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function CategoryLinks({
  activeCategory,
  onCategorySelect,
}: CategoryLinksProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const categories = getAllCategories();

  return (
    <section ref={ref} className="py-24 px-6 bg-surface-secondary">
      <div className="max-w-2xl mx-auto">
        <p className="text-[14px] font-normal text-text-secondary mb-8">
          Browse by theme
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => onCategorySelect(null)}
            className={`text-left transition-all duration-500 ease-out ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <span
              className={`text-[24px] font-semibold transition-colors ${
                activeCategory === null
                  ? "text-accent"
                  : "text-text-primary hover:text-accent"
              }`}
            >
              All
            </span>
          </button>

          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`text-left transition-all duration-500 ease-out ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${(i + 2) * 80}ms` }}
            >
              <span className="relative inline-block">
                {/* Hand-drawn bracket accents for active category */}
                {activeCategory === cat && (
                  <>
                    <svg
                      className="absolute -left-5 top-1/2 -translate-y-1/2"
                      width="12"
                      height="32"
                      viewBox="0 0 12 32"
                      fill="none"
                    >
                      <path
                        d="M10 3C5 5 3 10 3 16C3 22 5 27 10 29"
                        stroke="#0496FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <svg
                      className="absolute -right-5 top-1/2 -translate-y-1/2"
                      width="12"
                      height="32"
                      viewBox="0 0 12 32"
                      fill="none"
                    >
                      <path
                        d="M2 3C7 5 9 10 9 16C9 22 7 27 2 29"
                        stroke="#0496FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </>
                )}
                <span
                  className={`text-[24px] font-semibold transition-colors ${
                    activeCategory === cat
                      ? "text-accent"
                      : "text-text-primary hover:text-accent"
                  }`}
                >
                  {CATEGORY_DISPLAY[cat] || cat}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
