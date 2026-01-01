"use client";

import { useRef, useState, useEffect, Fragment, Suspense } from "react";
import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import PrivacyBanner from "./PrivacyBanner";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivacyPosts, selectPrivacyPosts } from "@/store/slices/PrivacySlice";
import PrivacyContent from "./PrivacyContent";

export default function PrivacyClients() {
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const loading = useSelector((state) => state.loader.loading);

  const dispatch = useDispatch();
  const posts = useSelector(selectPrivacyPosts);

  useEffect(() => {
    dispatch(fetchPrivacyPosts());
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
            <PrivacyBanner />
          </Suspense>
          <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
            <PrivacyContent posts={posts} loading={loading} />
          </Suspense>
        </>
      )}

      <Footer />
    </Fragment>
  );
}
