import React from "react";
import { Pagination } from "antd";
import { useMovie } from "@/api/hooks/useMovie";
import { useGenre } from "@/api/hooks/useGenre";
import Genre from "@/components/genre/Genre";
import MovieView from "@/components/movie-view/MovieView";
import { useParamsHook } from "@/hooks/useParamsHook";

const Movies = () => {
  const { getMovies } = useMovie();
  const { genres, genreMap } = useGenre();
  const { getParam, setParam } = useParamsHook();

  const genreParam = getParam("genre");
  const genreList = genreParam ? genreParam.split(",") : [];

  const decade = getParam("decade");
  const [gte, lte] = decade ? decade.split("-") : [];

  const page = Number(getParam("page")) || 1;

  const handleGenre = (id: number) => {
    let updatedGenres = [...genreList];
    if (updatedGenres.includes(id.toString())) {
      updatedGenres = updatedGenres.filter((g) => g !== id.toString());
    } else {
      updatedGenres.push(id.toString());
    }
    setParam("genre", updatedGenres.join(","));
    setParam("page", "1");
  };

  const handlePagination = (value: number) => {
    setParam("page", value.toString());
  };

  const handleDecadeChange = (value: string) => {
    setParam("decade", value);
    setParam("page", "1");
  };

  const generateDecadeOptions = () => {
    const options = [];
    const start = 1900;
    const end = new Date().getFullYear();
    for (let from = start; from <= end; from += 10) {
      const to = from + 9;
      options.unshift({ label: `${from}-${to}`, value: `${from}-${to}` });
    }
    return options;
  };

  const { data, isPending, error, isError } = getMovies({
    page,
    with_genres: genreList.join(","),
    without_genres: "18,36,27,10749",
    ...(gte &&
      lte && {
        "primary_release_date.gte": `${gte}-01-01`,
        "primary_release_date.lte": `${lte}-12-31`,
      }),
  });

  if (isPending)
    return (
      <div className=" flex justify-center items-center text-xl">
        Loading... <span className="loader ml-3"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 text-xl">
        Error: {error.message}
      </div>
    );

  const totalResults =
    data?.total_results <= 10_000 ? data?.total_results : 10000;

  return (
    <div className="px-4">
      <div className="mb-4">
        <Genre
          data={genres}
          selectedGenres={genreList}
          onToggle={handleGenre}
        />
      </div>

      <div className="container my-4 flex justify-end">
        <select
          value={decade || ""}
          onChange={(e) => handleDecadeChange(e.target.value)}
          className="w-[200px] border px-3 py-2 rounded dark:bg-black outline-none"
        >
          <option value="">All years</option>
          {generateDecadeOptions().map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <MovieView data={data?.results} genreMap={genreMap} />

      <div className="flex justify-center mt-8 dark:bg-gray-800 py-2 max-w-[600px] mx-auto rounded font-medium">
        <Pagination
          current={page}
          total={totalResults}
          pageSize={20}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
};

export default React.memo(Movies);
