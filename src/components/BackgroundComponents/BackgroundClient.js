"use client";

import { useRef, useState, useEffect, Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import Header from "@/components/Global/Header";
import BackgroundVertical from "./BackgroundVertical";

export default function BackgroundClient() {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const loading = useSelector(state => state.loader.loading);

  useEffect(() => {
    const target = sessionStorage.getItem("targetSlide");

    if (target && swiperRef.current) {
      swiperRef.current.slideTo(Number(target));
      sessionStorage.removeItem("targetSlide");
    }
  }, []);

  return (
    <Fragment>
      <Header swiperRef={swiperRef} activeSlide={activeSlide} />

      {!loading && (
        <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
          <BackgroundVertical swiperRef={swiperRef} activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
        </Suspense>
      )}
    </Fragment>
  );
}
