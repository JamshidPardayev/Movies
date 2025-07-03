import React from "react";
import { Pagination } from "antd";
import { useMovie } from "@/api/hooks/useMovie";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";
import MovieView from "@/components/movie-view/MovieView";
import { useParamsHook } from "@/hooks/useParamsHook";

const Movies = () => {

  const { getMovies } = useMovie();
  const { getGenres } = useGenre();
  const { getParam, setParam } = useParamsHook();
  const genre = getParam("genre");

  console.log(genre);

  const { data: genreData } = getGenres();
  const page = Number(getParam("page")) || 1;

  const { data, isPending, error, isError } = getMovies({
    page: page,
    with_genres: genre,
    without_genres: "18,36,27,10749",
  });
  const handlePagination = (value: number) => {
    setParam("page", value.toString());
  };

  if (isPending) return <div>Loading.....</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const totalResults = data?.total_results <= 10_000 ? data?.total_results : 10000;

  return (
    <div className="px-4">
      <div className="mb-4">
        <Genre data={genreData?.genres} />
      </div>

      <MovieView data={data?.results} />

      <div className="flex justify-center mt-8">
        <Pagination
          current={page}
          total={totalResults}
          pageSize={20}
          onChange={handlePagination}
          className="custom-pagination bg-slate-500 hover:text-white"
        />
      </div>
    </div>
  );
};

export default React.memo(Movies);
