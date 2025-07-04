import React from "react";
import { useMovie } from "@/api/hooks/useMovie";
import { useGenre } from "@/api/hooks/useGenre";
import MovieView from "@/components/movie-view/MovieView";
import Carousel from "../carousel/Carousel";

const Home = () => {
  const { genres } = useGenre(); // genreMap emas, genres arrayini olamiz
  const { getMovies } = useMovie();

  const { data, isPending, isError, error } = getMovies({
    page: 1,
    without_genres: "18,36,27,10749",
  });

  if (isPending) return <div className="text-center text-xl">Loading... <span className="loader ml-2" /></div>;
  if (isError) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <Carousel genreMap={genres} />
      <MovieView
        data={data?.results?.slice(0, 10)}
        genreMap={genres}
      />
    </div>
  );
};

export default React.memo(Home);
