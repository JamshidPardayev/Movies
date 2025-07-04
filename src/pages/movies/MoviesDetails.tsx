import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircleOutlined, StarFilled } from "@ant-design/icons";
import { Image } from "antd";
import { useMovie } from "@/api/hooks/useMovie";
import { useGenre } from "@/api/hooks/useGenre";
import { IMAGE_URL } from "@/const";
import defaultImg from "@/assets/default.jpg";
import userImg2 from "@/assets/userImg.png";
import MovieView from "@/components/movie-view/MovieView";

const MoviesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getMovieDetails, getMovieDetailSimilars } = useMovie();
  const { data: movie } = getMovieDetails(id || "");
  const { data: similarData } = getMovieDetailSimilars(id || "", "similar");
  const { data: imagesData } = getMovieDetailSimilars(id || "", "images");
  const { data: creditsData } = getMovieDetailSimilars(id || "", "credits");
  const { genreMap } = useGenre();

  if (!id || !movie)
    return (
      <div className="text-center text-2xl">
        Loading movie details... <span className="loader ml-2" />
      </div>
    );

  return (
    <div className="container">
      {/* Movie Banner + Info */}
      <div className="flex justify-between gap-6 max-sm:flex-col">
        <div className="w-[50%] max-sm:w-full">
          <img
            src={movie.backdrop_path ? IMAGE_URL + movie.backdrop_path : defaultImg}
            alt={movie.title}
            className="w-full rounded shadow hover:scale-105 duration-300"
          />
        </div>
        <div className="w-[50%] max-sm:w-full space-y-2">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-lg font-medium">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <div>
            <strong>Companies:</strong>{" "}
            {movie.production_companies?.map((c) => c.name).join(", ")}
          </div>
          <div>
            <strong>Countries:</strong>{" "}
            {movie.production_countries?.map((c) => c.name).join(", ")}
          </div>
          <div>
            <strong>Release:</strong> {movie.release_date}
          </div>
          <div>
            <strong>Runtime:</strong> {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
          </div>
          <div>
            {movie.budget ? <strong>Budget:</strong> : null} {movie.budget?.toLocaleString()}$
            {" | "}
            {movie.revenue ? <strong>Revenue:</strong> : null} {movie.revenue?.toLocaleString()}$
          </div>
          <div className="flex gap-6 mt-2">
            <p className="flex items-center gap-1">{movie.vote_average} <StarFilled /></p>
            <p className="flex items-center gap-1">{movie.vote_count} <CheckCircleOutlined /></p>
          </div>
        </div>
      </div>

      {/* Scenes */}
      <div className="mt-8">
        <h2 className="text-2xl text-center mb-4">Scenes from the Movie</h2>
        <div className="flex gap-2 overflow-x-auto custom-scroll pb-2">
          {imagesData?.backdrops?.map((img: any, idx: number) => (
            <Image
              key={idx}
              width={120}
              src={IMAGE_URL + img.file_path}
              className="rounded"
              alt="scene"
            />
          ))}
        </div>
      </div>

      {/* Cast */}
      <div className="mt-8">
        <h2 className="text-2xl text-center mb-4">Actors from the Movie</h2>
        <div className="flex gap-3 overflow-x-auto py-2 custom-scroll">
          {creditsData?.cast?.map((actor: any) => (
            <div
              key={actor.id}
              onClick={() => navigate(`/actor/${actor.id}`)}
              className="min-w-[120px] text-center bg-white dark:bg-gray-800 p-2 rounded shadow"
            >
              <img
                src={actor.profile_path ? IMAGE_URL + actor.profile_path : userImg2}
                className="h-[120px] w-full object-cover rounded mb-2"
                alt={actor.name}
              />
              <p className="font-medium">{actor.original_name}</p>
              <p className="text-sm text-gray-500">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies */}
      <div className="mt-10">
        <h2 className="text-2xl text-center mb-4">Similar Movies</h2>
        <MovieView data={similarData?.results?.slice(0, 4)} genreMap={genreMap} />
      </div>
    </div>
  );
};

export default React.memo(MoviesDetails);
