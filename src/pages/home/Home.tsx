import React from "react";
import { useMovie } from "@/api/hooks/useMovie";
import { useGenre } from "@/api/hooks/useGenre";
import MovieView from "@/components/movie-view/MovieView";
import Carousel from "../carousel/Carousel";

const Home = () => {
  const { genres } = useGenre();
  const { getMovies } = useMovie();

  const { data, isLoading, isError, error } = getMovies({
    page: 1,
    without_genres: "18,36,27,10749",
  });

  const slicedData = data?.results?.slice(0, 12);
  const expectedCount = slicedData?.length || 12;

  if (isError)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div>
      <Carousel genreMap={genres} />
      <MovieView
        data={slicedData}
        genreMap={genres}
        isLoading={isLoading}
        expectedCount={expectedCount}
      />
    </div>
  );
};

export default React.memo(Home);
