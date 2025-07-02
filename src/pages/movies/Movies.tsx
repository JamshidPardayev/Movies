import { useMovie } from "@/api/hooks/useMovie";
import MovieView from "@/components/movie-view/MovieView";
import React from "react";
import { Pagination } from "antd";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";

const Movies = () => {
  const { getMovies } = useMovie();
  const { getGenres } = useGenre();

  const { data: genreData } = getGenres();
  const { data, isPending, error, isError } = getMovies({
    page: 1,
    without_genres: "18,36,27,10749",
  });
  if (isPending) return <div>Loading.....</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(genreData);

  return (
    <div>
      <div className="mb-4">
        <Genre data={genreData?.genres} />
      </div>
      <MovieView data={data?.results} />
      <div className="">
        <Pagination total={500} />
      </div>
    </div>
  );
};

export default React.memo(Movies);
