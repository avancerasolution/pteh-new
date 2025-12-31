"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import BackGroundOne from "./BackGroundOne";
import BackGroundTwo from "./BackGroundTwo";
import BackGroundThree from "./BackGroundThree";
import BackGroundFour from "./BackGroundFour";
import BackGroundFive from "./BackGroundFive";
import BackGroundSix from "./BackGroundSix";
import BackGroundSeven from "./BackGroundSeven";
import BackGroundEight from "./BackGroundEight";
import BackGroundNine from "./BackGroundNine";

export default function BackgroundVertical({ swiperRef, setActiveSlide, activeSlide }) {
  return (
    <Swiper
      slidesPerView={1}
      effect="fade" // 🔥 FADE instead of slide
      fadeEffect={{ crossFade: true }} // smooth dissolve
      mousewheel
      speed={800}
      modules={[Mousewheel, EffectFade]}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
      className="vertical-swiper"
    >
      <SwiperSlide>
        <BackGroundOne isActive={activeSlide === 0} />
      </SwiperSlide>

      <SwiperSlide>
        <BackGroundTwo isActive={activeSlide === 1} />
      </SwiperSlide>

      <SwiperSlide>
        <BackGroundThree isActive={activeSlide === 2} />
      </SwiperSlide>

      <SwiperSlide>
        <BackGroundFour isActive={activeSlide === 3} />
      </SwiperSlide>
      <SwiperSlide>
        <BackGroundFive isActive={activeSlide === 4} />
      </SwiperSlide>
      <SwiperSlide>
        <BackGroundSix isActive={activeSlide === 5} />
      </SwiperSlide>
      <SwiperSlide>
        <BackGroundSeven isActive={activeSlide === 6} />
      </SwiperSlide>
      <SwiperSlide>
        <BackGroundEight isActive={activeSlide === 7} />
      </SwiperSlide>
      <SwiperSlide>
        <BackGroundNine isActive={activeSlide === 8} />
      </SwiperSlide>
    </Swiper>
  );
}
