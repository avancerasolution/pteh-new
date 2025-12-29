"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";

export default function VerticalSwiper({ swiperRef, setActiveSlide, activeSlide }) {
  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      mousewheel
      speed={800}
      modules={[Mousewheel]}
      onSwiper={swiper => (swiperRef.current = swiper)}
      onSlideChange={swiper => setActiveSlide(swiper.activeIndex)}
      className="vertical-swiper">
      <SwiperSlide>
        <SlideOne isActive={activeSlide === 0} />
      </SwiperSlide>

      <SwiperSlide>
        <SlideTwo isActive={activeSlide === 1} />
      </SwiperSlide>
    </Swiper>
  );
}
