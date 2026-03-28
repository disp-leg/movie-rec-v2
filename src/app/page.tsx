"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import FeaturedPick from "@/components/FeaturedPick";
import CategoryRows from "@/components/CategoryRows";
import FullCollection from "@/components/FullCollection";
import Footer from "@/components/Footer";
import MovieOverlay from "@/components/MovieOverlay";
import BottomTabBar from "@/components/BottomTabBar";
import { movies } from "@/lib/movies";
import { Movie } from "@/lib/types";
import { useBehavior } from "@/hooks/useBehavior";

export default function Home() {
  const { rankedMovies, save, skip, markSeen, recordExpand } = useBehavior(movies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <main className="bg-black min-h-screen" style={{ paddingBottom: 84 }}>
      <Hero />
      <FeaturedPick />
      <CategoryRows
        movies={movies}
        onSave={save}
        onExpand={recordExpand}
        onPosterTap={setSelectedMovie}
      />
      <FullCollection
        rankedMovies={rankedMovies}
        onSave={save}
        onSkip={skip}
        onMarkSeen={markSeen}
        onExpand={recordExpand}
      />
      <Footer />
      <MovieOverlay
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onSave={save}
        onWatched={markSeen}
      />
      <BottomTabBar />
    </main>
  );
}
