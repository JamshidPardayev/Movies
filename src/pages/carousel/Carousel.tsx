import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useMovie } from "@/api/hooks/useMovie";
import type { IGenre, IMovie } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { PlayCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

interface Props {
  genreMap: IGenre[] | undefined;
}

const Carousel: React.FC<Props> = ({ genreMap }) => {
  const navigate = useNavigate();
  const genreIdToName = new Map(genreMap?.map((g) => [g.id, g.name]));

  const { getMovies } = useMovie();
  const { data, isLoading } = getMovies({ sort_by: "popularity.desc" });
  const movies: IMovie[] = data?.results?.slice(0, 10) || [];

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const skeletonArray = new Array(4).fill(null);

  if (isLoading) {
    return (
      <div className="w-full h-[650px] max-md:h-[530px] mx-auto flex flex-col gap-5">
        {/* Main skeleton slide */}
        <div className="w-full h-[500px] max-md:h-[400px] rounded-[16px] bg-gray-300 dark:bg-slate-800 animate-pulse" />
        {/* Thumbnails skeleton */}
        <div className="flex gap-3 mt-4">
          {skeletonArray.map((_, i) => (
            <div
              key={i}
              className="w-[120px] h-[80px] max-md:h-[60px] rounded-[12px] bg-gray-300 dark:bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[650px] max-md:h-[530px] rounded-[16px] overflow-hidden mx-auto">
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs, Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="mySwiper2"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative">
              <img
                src={`${IMAGE_URL}${movie.backdrop_path || movie.poster_path}`}
                alt={movie.title}
                className="w-full rounded-[16px] h-[500px] max-md:h-[400px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white p-4 rounded-[12px]">
                <h2 className="text-xl font-semibold text-center">
                  {movie.title}
                </h2>
                <div className="text-sm flex flex-wrap items-center justify-center gap-3 mt-3">
                  <span className="text-gray-300">
                    {movie.release_date?.split("-")[0]}
                  </span>
                  <hr className="h-[15px] w-[2px] bg-gray-200 border-none" />
                  <span className="text-gray-100">
                    {movie.genre_ids
                      .map((id) => genreIdToName.get(id))
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                  <hr className="h-[15px] w-[2px] bg-gray-200 border-none" />
                  <span className="uppercase text-gray-300">
                    {movie.original_language}
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="flex items-center justify-center gap-2 text-[18px] mx-auto mt-3 h-[50px] bg-white text-[#c61f1f] font-semibold w-[220px] rounded cursor-pointer hover:text-red-500"
                >
                  <PlayCircleFilled />
                  <p>Watch Film</p>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Thumbs]}
        className="mySwiper mt-4 max-w-[600px]"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <img
              src={`${IMAGE_URL}${movie.poster_path}`}
              alt={movie.title}
              className={`w-full h-[80px] max-md:h-[60px] object-cover cursor-pointer rounded-[12px] transition duration-300
                ${
                  index === activeIndex
                    ? "opacity-100 scale-105"
                    : "opacity-50 hover:opacity-80"
                }
              `}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(Carousel);
