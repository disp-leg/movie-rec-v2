"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Footer() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <footer ref={ref} className="pt-24 pb-16 px-6 bg-surface">
      <div
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Hand-drawn squiggle */}
        <div className="flex justify-center mb-8 opacity-40">
          <svg
            width="64"
            height="16"
            viewBox="0 0 64 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 8C8 3 14 13 20 8C26 3 32 13 38 8C44 3 50 13 56 8C60 5 62 6 62 8"
              stroke="#0496FF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <p className="text-[14px] font-normal text-text-secondary">
          A film list, not an algorithm
        </p>
        <p className="text-[12px] font-normal text-text-secondary opacity-60 mt-2">
          Seeded from The Divide (2011, dir. Xavier Gens)
        </p>
      </div>
    </footer>
  );
}
