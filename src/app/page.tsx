"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import CollectionIntro from "@/components/CollectionIntro";
import FeaturedPick from "@/components/FeaturedPick";
import MovieBrowse from "@/components/MovieBrowse";
import CategoryLinks from "@/components/CategoryLinks";
import Footer from "@/components/Footer";
import { movies } from "@/lib/movies";
import { useBehavior } from "@/hooks/useBehavior";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredMovies = useMemo(() => {
    if (!activeCategory) return movies;
    return movies.filter((m) =>
      m.categories.some(
        (c) => c.toLowerCase() === activeCategory.toLowerCase()
      )
    );
  }, [activeCategory]);

  const { rankedMovies, save, skip, markSeen, recordExpand } =
    useBehavior(filteredMovies);

  return (
    <main>
      <Hero />
      <CollectionIntro />
      <FeaturedPick />
      <CategoryLinks
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />
      <MovieBrowse
        rankedMovies={rankedMovies}
        onSave={save}
        onSkip={skip}
        onMarkSeen={markSeen}
        onExpand={recordExpand}
      />
      <Footer />
    </main>
  );
}
