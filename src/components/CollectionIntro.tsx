"use client";

import { useEffect, useRef, useState } from "react";

const LINE_1_WORDS = "You watched The Divide and wanted more.".split(" ");
const LINE_2_WORDS = "We pulled 26 films from the same dark corner.".split(" ");

export default function CollectionIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const start = viewportH * 0.8;
      const end = -rect.height * 0.3;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalWords = LINE_1_WORDS.length + LINE_2_WORDS.length;

  const getWordColor = (wordIndex: number) => {
    const wordProgress = wordIndex / totalWords;
    return progress > wordProgress ? "#1D1D1F" : "#6E6E73";
  };

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-surface">
      <div className="max-w-2xl mx-auto">
        <p className="text-[32px] font-bold leading-snug">
          {LINE_1_WORDS.map((word, i) => (
            <span
              key={`l1-${i}`}
              className="transition-colors duration-300"
              style={{ color: getWordColor(i) }}
            >
              {word}{" "}
            </span>
          ))}
        </p>
        <p className="text-[32px] font-bold leading-snug mt-2">
          {LINE_2_WORDS.map((word, i) => (
            <span
              key={`l2-${i}`}
              className="transition-colors duration-300"
              style={{ color: getWordColor(LINE_1_WORDS.length + i) }}
            >
              {word}{" "}
            </span>
          ))}
        </p>

        <div className="mt-12 flex justify-center">
          <svg
            width="32"
            height="48"
            viewBox="0 0 32 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 4C16 4 15 12 16 20C17 28 16 36 16 36"
              stroke="#0496FF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M8 30C10 34 14 38 16 40C18 38 22 34 24 30"
              stroke="#0496FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
