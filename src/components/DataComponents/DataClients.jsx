"use client";

import { useRef, useState, useEffect, Fragment, Suspense } from "react";
import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataPagePosts, selectDataPagePosts } from "@/store/slices/DataPageSlice";
import DataBanner from "./DataBanner";
import DataPageContent from "./DataPageContent";

export default function DataClients() {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const loading = useSelector((state) => state.loader.loading);

  const dispatch = useDispatch();
  const posts = useSelector(selectDataPagePosts);

  useEffect(() => {
    dispatch(fetchDataPagePosts());
  }, [dispatch]);

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
        <>
          <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
            <DataBanner />
          </Suspense>

          <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
            <DataPageContent posts={posts} loading={loading} />
          </Suspense>
        </>
      )}

      <Footer />
    </Fragment>
  );
}
