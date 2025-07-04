import React, { type FC } from "react";
import { IMAGE_URL } from "@/const";
import type { IGenre, IMovie } from "@/types";
import {
  CheckCircleOutlined,
  HeartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import defaultImg from "@/assets/default.jpg";

interface Props {
  data: IMovie[] | undefined;
  genreMap: IGenre[] | undefined;
}

const MovieView: FC<Props> = ({ data, genreMap }) => {
  const genreIdToName = new Map(genreMap?.map((g) => [g.id, g.name]));
  const navigate = useNavigate();

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 max-sm:gap-2">
      {data?.map((movie) => (
        <div
          key={movie.id}
          className="relative group dark:bg-slate-900 bg-gray-200 rounded-[12px] border border-gray-400 dark:border-violet-700 hover:shadow-md"
        >
          <div className="h-[400px] max-sm:h-[260px] overflow-hidden rounded-[12px]">
            <img
              src={movie.poster_path ? IMAGE_URL + movie.poster_path : defaultImg}
              alt={movie.title}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="h-full w-full object-cover rounded hover:scale-105 duration-300 cursor-pointer"
              loading="lazy"
            />
          </div>
          <p className="absolute hidden group-hover:block top-2 right-2 bg-white p-2 rounded-full text-red-600 text-lg cursor-pointer">
            <HeartOutlined />
          </p>
          <div className="p-3">
            <h3
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="text-xl font-semibold line-clamp-1 hover:underline hover:text-gray-300 cursor-pointer"
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
              <p className="bg-red-600 text-white px-2 rounded text-sm">
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
