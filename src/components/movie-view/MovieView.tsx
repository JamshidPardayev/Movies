import React, { type FC } from "react";
import { IMAGE_URL } from "@/const";
import type { IGenre, IMovie } from "@/types";
import { CheckCircleOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import defaultImg from "@/assets/default.jpg";
import FavoriteButton from "../favoriteButton/FavoriteButton";

interface Props {
  data: IMovie[] | undefined;
  genreMap: IGenre[] | undefined;
  isLoading?: boolean;
}

const MovieView: FC<Props> = ({ data, genreMap, isLoading }) => {
  const genreIdToName = new Map(genreMap?.map((g) => [g.id, g.name]));
  const navigate = useNavigate();
  const skeletonArray = new Array(8).fill(null);

  return (
    <div className="container grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 max-sm:gap-2">
      {isLoading
        ? skeletonArray.map((_, index) => (
            <div
              key={index}
              className="relative rounded-[12px] bg-gray-200 dark:bg-slate-900 border border-gray-200 dark:border-none animate-pulse"
            >
              <div className="h-[400px] max-sm:h-[260px] bg-gray-300 dark:bg-slate-700 rounded-t-[12px]" />
              <div className="p-3 space-y-2">
                <div className="h-5 bg-gray-300 dark:bg-slate-700 rounded w-3/4" />
                <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-1/2" />
                <div className="flex justify-between mt-4">
                  <div className="h-4 w-10 bg-gray-300 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-10 bg-gray-300 dark:bg-slate-700 rounded" />
                </div>
              </div>
            </div>
          ))
        : data?.map((movie) => (
            <div
              key={movie.id}
              className="relative group dark:bg-slate-900 bg-gray-200 rounded-[12px] border border-gray-200 dark:border-none hover:shadow-[0px_0px_4px_2px_#999999] hover:dark:shadow-[0px_0px_4px_2px_#a752f7]"
            >
              <div className="h-[400px] max-sm:h-[260px] overflow-hidden rounded-[12px]">
                <img
                  src={
                    movie.poster_path
                      ? IMAGE_URL + movie.poster_path
                      : defaultImg
                  }
                  alt={movie.title}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="h-full w-full object-cover rounded hover:scale-105 duration-300 cursor-pointer"
                  loading="lazy"
                />
              </div>
              <p className="absolute hidden group-hover:block top-2 right-2">
                <FavoriteButton movie={movie} />
              </p>
              <div className="p-3">
                <h3
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="text-xl font-semibold line-clamp-1 hover:underline hover:dark:text-gray-300 hover:text-gray-700 cursor-pointer"
                >
                  {movie.title}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">
                  {movie.genre_ids
                    .map((id) => genreIdToName.get(id))
                    .filter(Boolean)
                    .join(", ")}
                </div>
                <div className="flex justify-between items-center mt-2 text-gray-800 dark:text-gray-300">
                  <p>
                    {movie.vote_average?.toFixed(1)} <StarFilled />
                  </p>
                  <p>
                    {movie.vote_count} <CheckCircleOutlined />
                  </p>
                  <p className="absolute left-2 top-2 bg-red-600 text-white px-2 rounded text-sm">
                    {movie.release_date?.split("-")[0]}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default React.memo(MovieView);
