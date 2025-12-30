import { useRouter } from "next/navigation";

export const goToVision = (swiperRef, router) => {
  // Always remember target slide
  sessionStorage.setItem("targetSlide", "1");

  // If swiper exists (already on home)
  if (swiperRef?.current) {
    swiperRef.current.slideTo(1);
  } else {
    // Navigate to home
    router.push("/");
  }
};
