import React, { type FC } from "react";
import { IMAGE_URL } from "@/const";
import type { IGenre, IMovie } from "@/types";
import {
  CheckCircleOutlined,
  HeartOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import defaultImg from "@/assets/default.jpg"
interface Props {
  data: undefined | IMovie[];
  genreMap: undefined | IGenre[];
}
const MovieView: FC<Props> = ({ data, genreMap }) => {
  const genreIdToName = new Map(genreMap?.map((g) => [g.id, g.name]));
  const navigate = useNavigate();

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 max-sm:gap-2">
        {data?.map((movie: IMovie) => (
          <div
            key={movie.id}
            className="relative group dark:bg-slate-900 bg-gray-200 rounded-[12px] border border-gray-400 dark:border-violet-700 hover:shadow-[0px_0px_4px_2px_#999999] dark:hover:shadow-[0px_0px_4px_2px_#6600da]"
          >
            <div className="h-[400px] max-sm:h-[260px] overflow-hidden rounded-[12px]">
              <img
                className="rounded-[12px] h-full w-full hover:scale-105 duration-300 cursor-pointer"
                onClick={() => navigate(`/movie/${movie?.id}`)}
                loading="lazy"
                src={movie?.poster_path ? IMAGE_URL + movie.poster_path : defaultImg}
                alt={movie.title}
              />
            </div>
            <p className="absolute hidden group-hover:block cursor-pointer duration-100 hover:text-red-500 top-2 right-2 text-[22px] h-[40px] w-[40px] text-center content-center text-[#c61f1f] rounded-[50%] bg-gray-300">
              <HeartOutlined />
            </p>
            <div className="px-3 py-2">
              <h3
              onClick={() => navigate(`/movie/${movie?.id}`)}
                title={movie.title}
                className="text-xl font-semibold line-clamp-1 hover:underline hover:text-gray-300 duration-200"
              >
                {movie.title}
              </h3>
              <div className="text-sm text-gray-600 mt-1 line-clamp-1 dark:text-gray-200">
                {movie.genre_ids
                  .map((id) => genreIdToName.get(id))
                  .filter(Boolean)
                  .join(", ")}
              </div>
              <div className="flex justify-between items-center gap-3">
                <p className="text-gray-800 font-medium dark:text-gray-300">
                  {movie.vote_average?.toFixed(1)} <StarFilled />
                </p>
                <p className="text-gray-800 font-medium dark:text-gray-300">
                  {movie.vote_count} <CheckCircleOutlined />
                </p>
                <p className="bg-red-600 text-white px-2 rounded absolute top-2 left-2 text-[14px]">
                  {movie?.release_date?.split("-")[0]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MovieView);
