export const goToVision = swiperRef => {
  if (swiperRef?.current) {
    swiperRef.current.slideTo(1);
  }
};
