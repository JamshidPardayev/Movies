import { IMAGE_URL } from "@/const";
import type { IMovie } from "@/types";
import React, { type FC } from "react";

interface Props {
  data: undefined | IMovie[];
}

const MovieView: FC<Props> = ({ data }) => {
  return (
    <div className="container mx-auto grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
      {data?.map((movie: IMovie) => (
        <div className="dark:bg-slate-900 bg-gray-200 rounded-[12px] border border-gray-400" key={movie.id}>
          <div>
            <img
              className="rounded-[12px]"
              loading="lazy"
              src={IMAGE_URL + movie.poster_path}
              alt={movie.title}
            />
          </div>
          <div className="px-3 py-2">
            <h3
              title={movie.title}
              className="text-xl font-semibold line-clamp-1"
            >
              {movie.title}
            </h3>
            <p>{movie.vote_average}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(MovieView);
