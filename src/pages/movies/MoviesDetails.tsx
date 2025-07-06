import React from "react";
import { useMovie } from "@/api/hooks/useMovie";
import { useGenre } from "@/api/hooks/useGenre";
import { IMAGE_URL } from "@/const";
import { useNavigate, useParams } from "react-router-dom";
import defaultImg from "@/assets/default.jpg";
import userImg2 from "@/assets/userImg.png";
import {
  CheckCircleOutlined,
  PlayCircleFilled,
  StarFilled,
} from "@ant-design/icons";
import { Image, Rate } from "antd";
import MovieView from "@/components/movie-view/MovieView";

const MoviesDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { getMovieDetails, getMovieDetailSimilars } = useMovie();
  const { genreMap } = useGenre();

  const { data } = getMovieDetails(id || "");
  const { data: similarData } = getMovieDetailSimilars(id || "", "similar");
  const { data: imagesData } = getMovieDetailSimilars(id || "", "images");
  const { data: creditsData } = getMovieDetailSimilars(id || "", "credits");
  console.log(data);

  if (!id || !data)
    return (
      <div className="text-2xl text-center content-center">
        Loading movie details... <span className="loader ml-3"></span>
      </div>
    );

  return (
    <div className="container">
      <div className="relative w-full min-h-[500px] mb-10 rounded-xl overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat dark:opacity-30 opacity-70"
          style={{
            backgroundImage: `url(${
              data?.backdrop_path ? IMAGE_URL + data?.backdrop_path : defaultImg
            })`,
            zIndex: 0,
          }}
        ></div>

        <div className="relative z-10 flex justify-between gap-6 max-sm:flex-col p-4 h-full">
          <div className="w-[30%] max-sm:w-[100%] max-sm:max-h-[400px] overflow-hidden rounded">
            <img
              src={
                data?.poster_path ? IMAGE_URL + data?.poster_path : defaultImg
              }
              alt={data?.title}
              className="w-full h-full object-cover rounded hover:scale-105 duration-300 cursor-pointer"
            />
          </div>

          <div className="w-[70%] max-sm:w-full flex flex-col px-2 py-1 text-black dark:text-white">
            <h1 className="text-[32px] font-bold">{data?.title}</h1>
            <div className="flex flex-wrap items-center gap-2 dark:text-gray-300 text-gray-950 font-medium mt-1">
              <p>{data?.release_date}</p>
              <hr className="h-[15px] w-[1px] bg-gray-300" />
              <p>{data?.origin_country}</p>
              <hr className="h-[15px] w-[1px] bg-gray-300" />
              <div className="flex gap-2 flex-wrap">
                {data?.genres?.map((genre: any, index: number) => (
                  <p key={genre?.id}>
                    {genre?.name}
                    {index !== data.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
              <hr className="h-[15px] w-[1px] bg-gray-300" />
              <p>
                {Math.floor(data?.runtime / 60)}h {data?.runtime % 60}min
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p>
                <Rate allowHalf defaultValue={5} />
              </p>
              <button className="flex items-center px-5 rounded gap-1 font-semibold my-1 h-[40px] bg-white text-[#c61f1f] cursor-pointer duration-300 hover:text-red-500">
                <PlayCircleFilled />
                Play Triller
              </button>
            </div>
            <p className="text-[18px] font-medium italic">{data?.tagline}</p>
            <p className="text-[15px] dark:text-gray-300 text-gray-950">
              {data?.overview}
            </p>

            <div className="flex gap-x-2 flex-wrap font-medium dark:text-gray-300 text-gray-950 mt-2">
              <span className="dark:text-white text-black font-bold">Companies:</span>
              {data?.production_companies?.map((c: any, i: number) => (
                <div key={c.id}>
                  {c.name}
                  {i !== data?.production_companies.length - 1 ? "," : ""}
                </div>
              ))}
            </div>

            <div className="flex gap-x-2 flex-wrap font-medium dark:text-gray-300 text-gray-950 mt-1">
              <span className="dark:text-white text-black font-bold">Countries:</span>
              {data.production_countries?.map((c: any, i: number) => (
                <p key={c.iso_3166_1}>
                  {c.name}
                  {i !== data.production_countries.length - 1 ? "," : ""}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 dark:text-gray-300 text-gray-950  mt-1">
              {data.budget && (
                <p>
                  <span className="dark:text-white text-black font-semibold">Budget:</span>{" "}
                  {data.budget.toLocaleString()} $
                </p>
              )}
              {data.revenue && (
                <p>
                  <span className="dark:text-white text-black font-semibold">Revenue:</span>{" "}
                  {data.revenue.toLocaleString()} $
                </p>
              )}
            </div>

            <div className="flex gap-8 mt-2">
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
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] mb-2 text-center">Scenes from the Movie</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 custom-scroll">
          {imagesData?.backdrops?.map((item: any, i: number) => (
            <div key={i} className="w-full">
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

      <div className="mt-8">
        <h2 className="text-[24px] mb-4 text-center font-semibold">
          Actors from the Movie
        </h2>
        <div className="flex gap-2 overflow-x-auto custom-scroll py-2">
          {creditsData?.cast?.map((actor: any) => (
            <div
              onClick={() => navigate(`/actor/${actor.id}`)}
              key={actor.id}
              className="min-w-[120px] bg-white dark:bg-gray-800 p-1 rounded shadow-md text-center cursor-pointer"
            >
              <img
                src={
                  actor.profile_path ? IMAGE_URL + actor.profile_path : userImg2
                }
                alt={actor.name || "Actor image"}
                className="w-full h-[120px] object-cover mb-2"
              />
              <h3 className="text-md font-medium text-gray-900 dark:text-white line-clamp-1">
                {actor.original_name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                {actor.character}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-[24px] mb-2 text-center">Similar Movies</h2>
        <MovieView
          data={similarData?.results?.slice(0, 4)}
          genreMap={genreMap}
        />
      </div>
    </div>
  );
};

export default React.memo(MoviesDetails);
