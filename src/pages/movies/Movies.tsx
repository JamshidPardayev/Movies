import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useMovie } from "@/api/hooks/useMovie";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";
import MovieView from "@/components/movie-view/MovieView";

const Movies = () => {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("movie-page");
    return saved ? Number(saved) : 1;
  });

  const { getMovies } = useMovie();
  const { getGenres } = useGenre();

  const { data: genreData } = getGenres();
  const { data, isPending, error, isError } = getMovies({
    page,
    without_genres: "18,36,27,10749",
  });

  useEffect(() => {
    localStorage.setItem("movie-page", String(page));
  }, [page]);

  if (isPending) return <div>Loading.....</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const totalResults = data?.total_results || 500;

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
          onChange={(newPage) => setPage(newPage)}
          showSizeChanger={false}
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default React.memo(Movies);
