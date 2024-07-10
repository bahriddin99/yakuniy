import React, { useState } from "react";
import { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.css";

import Image from "next/image";

interface ImgGalleryProps {
  productImages: string[];
}

const ImgGallery: React.FC<ImgGalleryProps> = ({ productImages }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);

  return (
    <div className="flex gap-3">
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        direction={"vertical"}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        mousewheel={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Mousewheel]}
        className="mySwiper"
      >
        {productImages.map((image, index) => (
          <SwiperSlide
            key={index}
            className="bg-white p-3 rounded-lg cursor-pointer"
          >
            <div className="flex items-center justify-center">
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={20}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Mousewheel]}
        className="mySwiper2"
      >
        {productImages.map((image, index) => (
          <SwiperSlide key={index} className="bg-white rounded-lg">
            <div className="">
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImgGallery;
