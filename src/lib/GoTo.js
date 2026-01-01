// lib/GoTo.js
export const goToVision = (swiperRef, router) => {
  // 🔴 clear old junk
  sessionStorage.removeItem("HOME_TARGET_SLIDE");

  // ✅ set ONLY for home
  sessionStorage.setItem("HOME_TARGET_SLIDE", "1");

  if (swiperRef?.current) {
    swiperRef.current.slideTo(1);
  } else {
    router.push("/");
  }
};
