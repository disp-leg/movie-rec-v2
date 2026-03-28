"use client";

import Hero from "@/components/Hero";
import FeaturedPick from "@/components/FeaturedPick";
import CategoryRows from "@/components/CategoryRows";
import FullCollection from "@/components/FullCollection";
import Footer from "@/components/Footer";
import { movies } from "@/lib/movies";
import { useBehavior } from "@/hooks/useBehavior";

export default function Home() {
  const { rankedMovies, save, skip, markSeen, recordExpand } = useBehavior(movies);

  return (
    <main className="bg-white min-h-screen">
      <Hero />
      <FeaturedPick />
      <CategoryRows movies={movies} onSave={save} onExpand={recordExpand} />
      <FullCollection
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
