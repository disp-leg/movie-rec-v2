"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Hero() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 bg-surface-secondary relative"
    >
      <div
        className={`text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="text-[48px] font-extrabold text-text-primary leading-tight">
          Movie{" "}
          <span className="relative inline-block">
            Rec
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 80 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8C12 3 22 10 32 6C42 2 52 9 62 5C72 1 78 7 78 7"
                stroke="#0496FF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </span>
        </h1>
        <p className="text-[18px] font-normal text-text-secondary mt-6 max-w-md mx-auto leading-relaxed">
          Films that share DNA with The Divide
        </p>
      </div>

      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ease-out delay-300 ${
          isVisible ? "opacity-50" : "opacity-0"
        }`}
      >
        <span className="text-[14px] font-normal text-text-secondary">
          Scroll to explore
        </span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 10C8 13 10 15 12 17C14 15 16 13 19 10"
            stroke="#0496FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
