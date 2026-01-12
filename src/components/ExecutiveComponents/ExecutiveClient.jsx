"use client";

import { useRef, useState, useEffect, Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import Header from "@/components/Global/Header";
import Banner from "./Banner";
import ExecutiveColumns from "./ExecutiveColumns";
import Footer from "@/components/Global/Footer";
import GlobalLoader from "../Global/GlobalLoader";

export default function ExecutiveClient() {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const loading = useSelector((state) => state.loader.loading);

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
        <Suspense
          fallback={
            <div className="text-center py-5">
              <GlobalLoader />
            </div>
          }
        >
          <Banner />
          <ExecutiveColumns />
        </Suspense>
      )}

      <Footer />
    </Fragment>
  );
}
