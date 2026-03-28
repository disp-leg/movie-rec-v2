"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TypographyBreakProps {
  label: string;
  sublabel?: string;
}

export default function TypographyBreak({ label, sublabel }: TypographyBreakProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="py-16 px-6"
    >
      <div
        className={`max-w-2xl mx-auto text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="relative inline-block">
          {/* Hand-drawn bracket accents */}
          <svg
            className="absolute -left-8 top-1/2 -translate-y-1/2"
            width="20"
            height="48"
            viewBox="0 0 20 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4C8 6 5 14 4 24C5 34 8 42 16 44"
              stroke="#0496FF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <svg
            className="absolute -right-8 top-1/2 -translate-y-1/2"
            width="20"
            height="48"
            viewBox="0 0 20 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4C12 6 15 14 16 24C15 34 12 42 4 44"
              stroke="#0496FF"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <h3 className="text-[28px] font-bold text-text-primary px-4">
            {label}
          </h3>
        </div>

        {sublabel && (
          <p className="text-[14px] font-normal text-text-secondary mt-3">
            {sublabel}
          </p>
        )}
      </div>
    </section>
  );
}
