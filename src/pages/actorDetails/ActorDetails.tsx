import { useActors } from "@/api/hooks/useActors";
import { IMAGE_URL } from "@/const";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import defaultImg from "@/assets/default.jpg";
import MovieView from "@/components/movie-view/MovieView";
import { useGenre } from "@/api/hooks/useGenre";
import {
  InstagramOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
const ActorDetails = () => {
  const { id } = useParams();
  const { getActorsDetails, getActorsMovie } = useActors();
  const { data: actor, isLoading, isError } = getActorsDetails(id || "");
  const { data: movies } = getActorsMovie(id || "");
  console.log(actor);
  const { genreMap } = useGenre();
  const [showMore, setShowMore] = useState(false);
  if (isLoading || !actor) {
    return (
      <div className="text-center text-2xl">
        Loading actor details... <span className="loader ml-2" />
      </div>
    );
  }

  if (isError || !actor) {
    return (
      <div className="text-center text-red-500 text-xl">Actor not found.</div>
    );
  }
  return (
    <div className="container">
      <div className="flex justify-between items-start gap-4 p-2 max-sm:flex-col ">
        <div className="flex flex-col justify-center mx-auto">
          <div className="min-w-[300px] max-w-[500px] max-h-[500px] rounded overflow-hidden">
            <img
              src={
                actor?.profile_path
                  ? IMAGE_URL + actor?.profile_path
                  : defaultImg
              }
              alt={actor?.name}
              className="w-full h-full object-cover rounded hover:scale-105 duration-300 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex gap-5 justify-center mt-5 text-[25px] ">
              <InstagramOutlined className="cursor-pointer" />
              <TwitterOutlined className="cursor-pointer" />
              <WhatsAppOutlined className="cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex flex-col px-2 py-1">
          <h1 className="text-[30px] font-semibold">
            {actor?.name}{" "}
            <span className="text-[18px] text-gray-800 italic dark:text-gray-200">
              {actor?.known_for_department}
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-1 my-1 text-[18px] font-medium">
            <p>{actor?.birthday}</p>
            <p>in {actor?.place_of_birth}</p>
          </div>
          <div className="relative">
            <p
              className={`text-[15px] dark:text-gray-300 text-gray-800 ${
                showMore ? "" : "line-clamp-3"
              }`}
            >
              {actor?.biography}
            </p>

            {actor?.biography?.length > 150 && (
              <button
                onClick={() => setShowMore(!showMore)}
                className=" text-blue-500  py-1 rounded hover:underline hover:text-blue-700 duration-300 cursor-pointer"
              >
                {showMore ? "Show less" : "Read more"}
              </button>
            )}
          </div>
          <div>
            <h3 className="text-[20px] font-semibold mt-2">Also Knows</h3>
            <div className="flex flex-col text-[15px] text-gray-800 dark:text-gray-300">
              {actor?.also_known_as?.map((name: string, index: number) => (
                <li key={index}>{name}</li>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-center mt-6 mb-4">
          🎬 Movies with Actor
        </h2>
        <MovieView data={movies?.cast?.slice(0, 4)} genreMap={genreMap} />
      </div>
    </div>
  );
};

export default React.memo(ActorDetails);
