import { Movie } from "@/lib/types";

interface MovieEntryProps {
  movie: Movie;
}

export default function MovieEntry({ movie }: MovieEntryProps) {
  return (
    <div className="border-b border-separator py-6">
      <h3 className="text-xl font-semibold text-text-primary">
        {movie.title}{" "}
        <span className="text-text-secondary font-normal">({movie.year})</span>
      </h3>
      <p className="text-text-secondary mt-1">
        Directed by {movie.director}
      </p>
    </div>
  );
}
