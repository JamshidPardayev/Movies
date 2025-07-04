import React from "react";
import { useMovie } from "@/api/hooks/useMovie";
import { useGenre } from "@/api/hooks/useGenre";
import MovieView from "@/components/movie-view/MovieView";
import { useNavigate, useParams } from "react-router-dom";
import { IMAGE_URL } from "@/const";
import defaultImg from "@/assets/default.jpg";
import userImg2 from "@/assets/userImg.png";
import { CheckCircleOutlined, StarFilled } from "@ant-design/icons";
import { Image } from "antd";

const MoviesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getMovieDetails, getMovieDetailSimilars } = useMovie();
  const { genres: genreData, genreMap } = useGenre();

  const { data } = getMovieDetails(id || "");
  const { data: similarData } = getMovieDetailSimilars(id || "", "similar");
  const { data: imagesData } = getMovieDetailSimilars(id || "", "images");
  const { data: creditsData } = getMovieDetailSimilars(id || "", "credits");

  if (!id || !data)
    return (
      <div className="text-2xl text-center content-center">
        Loading movie details... <span className="loader ml-3"></span>
      </div>
    );

  return (
    <div className="container">
      <div className="flex justify-between gap-6 max-sm:flex-col">
        <div className="w-[50%] max-sm:w-[100%] overflow-hidden rounded shadow">
          <img
            src={data.backdrop_path ? IMAGE_URL + data.backdrop_path : defaultImg}
            alt={data.title}
            className="w-full h-full object-cover rounded"
          />
        </div>

        <div className="w-[50%] max-sm:w-[100%] flex flex-col gap-2 px-2 py-1">
          <h1 className="text-[28px] font-semibold">{data.title}</h1>
          <p className="text-[18px] font-medium">{data.tagline}</p>
          <p className="text-[15px]">{data.overview}</p>

          <div className="flex gap-x-2 flex-wrap font-medium">
            <span>Companies:</span>
            {data.production_companies?.map((c, i) => (
              <span key={c.id}>
                {c.name}
                {i < data.production_companies.length - 1 && ","}
              </span>
            ))}
          </div>

          <div className="flex gap-x-2 flex-wrap font-medium">
            <span>Countries:</span>
            {data.production_countries?.map((c, i) => (
              <span key={c.iso_3166_1}>
                {c.name}
                {i < data.production_countries.length - 1 && ","}
              </span>
            ))}
          </div>

          <div className="flex gap-4 font-medium">
            <span>Release:</span>
            <span>{data.release_date}</span>
            <span>
              Runtime: {Math.floor(data.runtime / 60)}h {data.runtime % 60}min
            </span>
          </div>

          <div className="flex gap-4 font-medium">
            {data.budget > 0 && (
              <span>Budget: {data.budget.toLocaleString()} $</span>
            )}
            {data.revenue > 0 && (
              <span>Revenue: {data.revenue.toLocaleString()} $</span>
            )}
          </div>

          <div className="flex gap-8">
            <p className="flex gap-1 items-center">
              {data.vote_average}
              <StarFilled />
            </p>
            <p className="flex gap-1 items-center">
              {data.vote_count}
              <CheckCircleOutlined />
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] mb-2 text-center">Scenes from the Movie</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scroll">
          {imagesData?.backdrops?.map((item: any, inx: number) => (
            <div key={inx} className="w-full">
              <Image
                width={120}
                src={IMAGE_URL + item.file_path}
                alt="scene"
                className="rounded object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-[24px] mb-4 text-center font-semibold">
          Actors from the Movie
        </h2>
        <div className="flex gap-2 overflow-x-auto custom-scroll py-2">
          {creditsData?.cast?.map((actor: any) => (
            <div
              onClick={() => navigate(`/actor/${actor.id}`)}
              key={actor.id}
              className="min-w-[120px] bg-white dark:bg-gray-800 p-1 rounded shadow-md text-center"
            >
              <img
                src={actor.profile_path ? IMAGE_URL + actor.profile_path : userImg2}
                alt={actor.name}
                className="w-full h-[120px] object-cover mb-2"
              />
              <h3 className="text-md font-medium line-clamp-1">{actor.original_name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] mb-2 text-center">Similar Movies</h2>
        <MovieView data={similarData?.results?.slice(0, 4)} genreMap={genreMap} />
      </div>
    </div>
  );
};

export default React.memo(MoviesDetails);
