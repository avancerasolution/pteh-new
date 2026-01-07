"use client";

import { useRef, useState, useEffect, Fragment, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPriorityPagePosts, selectPriorityPagePosts } from "@/store/slices/PriorityPageSlice";
import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import Banner from "./Banner";
import VisionText from "./VisionText";
import GlobalLoader from "@/components/Global/GlobalLoader";
import Pillars from "./Pillars";

export default function PriorityClient() {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const posts = useSelector(selectPriorityPagePosts);
  const loading = useSelector((state) => state.loader.loading);
  const globalLoading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    dispatch(fetchPriorityPagePosts());
  }, [dispatch]);

  useEffect(() => {
    const target = sessionStorage.getItem("targetSlide");
    if (target && swiperRef.current) {
      swiperRef.current.slideTo(Number(target));
      sessionStorage.removeItem("targetSlide");
    }
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts?.length || globalLoading) return null;

  const post = posts[0];
  const Title = post?.title?.rendered || "no data found";
  const subTitle = post?.acf?.second_heading || "no data found";
  const subText = post?.acf?.second_description || "no data found";

  return (
    <Fragment>
      <Header swiperRef={swiperRef} activeSlide={activeSlide} />

      <Suspense fallback={<div className="text-center py-5">Loading banner…</div>}>
        <Banner Title={Title} />
        <VisionText subTitle={subTitle} subText={subText} />
        <Pillars />
      </Suspense>

      <Footer />
    </Fragment>
  );
}
