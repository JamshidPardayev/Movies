import React, { useEffect, useState } from "react";
import type { IMovie } from "@/types";
import MovieView from "@/components/movie-view/MovieView";

const Favorites = () => {
  const [favorites, setFavorites] = useState<IMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
    setIsLoading(false);
  }, []);

  const expectedCount = favorites.length || 8;

  if (!isLoading && favorites.length === 0) {
    return (
      <div className="container text-center text-2xl py-10">
        No favorites yet!
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        My Favorite Movies ❤️
      </h2>
      <MovieView
        data={favorites}
        genreMap={[]}
        isLoading={isLoading}
        expectedCount={expectedCount}
      />
    </div>
  );
};

export default React.memo(Favorites);
