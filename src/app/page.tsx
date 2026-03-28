"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import BrowseRows from "@/components/BrowseRows";
import TabBar from "@/components/TabBar";
import DetailOverlay from "@/components/DetailOverlay";
import { movies } from "@/lib/movies";
import { useBehavior } from "@/hooks/useBehavior";
import { Movie } from "@/lib/types";

export default function Home() {
  const { rankedMovies, save, skip, markSeen, recordExpand } = useBehavior(movies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div style={{ background: "#000", minHeight: "100vh", paddingBottom: 80 }}>
      <HeroSection onSelect={setSelectedMovie} />
      <BrowseRows
        movies={movies}
        onSelect={(movie) => {
          setSelectedMovie(movie);
          recordExpand(movie.title);
        }}
      />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      {selectedMovie && (
        <DetailOverlay
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSave={() => save(selectedMovie.title)}
          onMarkSeen={() => markSeen(selectedMovie.title)}
          isSaved={
            rankedMovies.find((rm) => rm.movie.title === selectedMovie.title)
              ?.isSaved || false
          }
        />
      )}
    </div>
  );
}
