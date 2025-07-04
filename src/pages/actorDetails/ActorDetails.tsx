import { useActors } from "@/api/hooks/useActors";
import { IMAGE_URL } from "@/const";
import React from "react";
import { data, useParams } from "react-router-dom";
import defaultImg from "@/assets/default.jpg";
import MovieView from "@/components/movie-view/MovieView";

const ActorDetails = () => {
  const { id } = useParams();
  const { getActorsDetails, getActorsMovie } = useActors();
  const { data: actor, isLoading, isError } = getActorsDetails(id || "");
  const { data: movies } = getActorsMovie(id || "");
  console.log(movies);

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
      <div className="flex justify-between items-start gap-4 p-2 max-md:flex-col border-gray-400 dark:border-violet-700 shadow-[0px_0px_4px_2px_#999999] dark:shadow-[0px_0px_4px_2px_#a752f7]">
        <div className="flex flex-col justify-center mx-auto">
          <div className="min-w-[300px] border border-gray-400  h-[300px] rounded-[50%] overflow-hidden">
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
          <h1 className="text-[30px] font-semibold text-center mt-2">
            {actor?.name}
          </h1>
          <div className=" text-[16px] text-center font-medium mt-2">
            <p>{actor?.birthday}</p>
            <p>{actor?.place_of_birth}</p>
          </div>
        </div>
        <div className="flex flex-col px-2 py-1 max-md:text-center">
          <p className="text-[15px] dark:text-gray-300 text-gray-800">
            {actor?.biography}
          </p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-center mt-6 mb-4">
          🎬 Movies with Actor
        </h2>
        <MovieView data={movies?.cast?.slice(0,4)}/>
      </div>
    </div>
  );
};

export default React.memo(ActorDetails);
