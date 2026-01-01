"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";

import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import SlideThree from "./SlideThree";

export default function VerticalSwiper({ swiperRef, setActiveSlide, activeSlide }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const slideParam = searchParams.get("slide");

    if (slideParam !== null && swiperRef.current) {
      const index = Number(slideParam);

      if (!Number.isNaN(index)) {
        swiperRef.current.slideTo(index, 0);
        setActiveSlide(index);
      }
    }
  }, [searchParams]);

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      mousewheel
      speed={800}
      modules={[Mousewheel]}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
      className="vertical-swiper"
    >
      <SwiperSlide>
        <SlideOne isActive={activeSlide === 0} />
      </SwiperSlide>

      <SwiperSlide>
        <SlideTwo isActive={activeSlide === 1} />
      </SwiperSlide>

      <SwiperSlide>
        <SlideThree isActive={activeSlide === 2} />
      </SwiperSlide>
    </Swiper>
  );
}
