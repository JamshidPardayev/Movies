import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import heroImg1 from "@/assets/heroImg1.png";
import heroImg2 from "@/assets/heroImg2.webp";
import heroImg3 from "@/assets/heroImg3.png";
import heroImg4 from "@/assets/heroImg4.webp";
import heroImg5 from "@/assets/heroImg5.webp";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

const images = [
  heroImg1,
  heroImg2,
  heroImg3,
  heroImg4,
  heroImg5,
];

const Carousel: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="w-full h-[650px] max-md:h-[530px] rounded-[16px] overflow-hidden mx-auto">
      <Swiper
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full rounded-[16px] h-[500px] max-md:h-[400px] object-cover"
            />
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
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Thumb ${index + 1}`}
              className="w-full h-[80px] max-md:h-[60px] object-cover opacity-50 hover:opacity-100 transition duration-300 cursor-pointer rounded-[12px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default React.memo(Carousel);
