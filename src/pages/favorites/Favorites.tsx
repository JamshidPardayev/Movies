import React, { useEffect, useState } from "react";
import type { IMovie } from "@/types";
import MovieView from "@/components/movie-view/MovieView";

const Favorites = () => {
  const [favorites, setFavorites] = useState<IMovie[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="container text-center text-2xl py-10">
        No favorites yet!
      </div>
    );
  }

  return (
    <div className="container py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Favorite Movies ❤️</h2>
      <MovieView data={favorites} genreMap={undefined} />
    </div>
  );
};

export default React.memo(Favorites);
