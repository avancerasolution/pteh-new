"use client";

import { useRef, useState, useEffect, Fragment, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import Header from "@/components/Global/Header";
import BackgroundVertical from "./BackgroundVertical";
import GlobalLoader from "../Global/GlobalLoader";

export default function BackgroundClient() {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const loading = useSelector((state) => state.loader.loading);
  const searchParams = useSearchParams();

  useEffect(() => {
    const slide = searchParams.get("slide");

    if (slide && swiperRef.current) {
      swiperRef.current.slideTo(Number(slide) - 1);
    }
  }, [searchParams]);

  return (
    <Fragment>
      <Header swiperRef={swiperRef} activeSlide={activeSlide} />

      {!loading && (
        <Suspense
          fallback={
            <div className="text-center py-5">
              <GlobalLoader />
            </div>
          }
        >
          <BackgroundVertical swiperRef={swiperRef} activeSlide={activeSlide} setActiveSlide={setActiveSlide} />
        </Suspense>
      )}
    </Fragment>
  );
}
