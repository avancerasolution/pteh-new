"use client";

import { useRef, useState, useEffect, Fragment, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardPagePosts, selectDashboardPagePosts } from "@/store/slices/DashboardPageSlice";
import Header from "@/components/Global/Header";
import Footer from "@/components/Global/Footer";
import GlobalLoader from "@/components/Global/GlobalLoader";
import BannerDashBoard from "./BannerDashBoard";
import DashboardText from "./DashboardText";
import Stats from "./Stats";

export default function DashboardClinet() {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const posts = useSelector(selectDashboardPagePosts);
  const loading = useSelector((state) => state.loader.loading);
  const globalLoading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    dispatch(fetchDashboardPagePosts());
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
        <BannerDashBoard Title={Title} />
        <DashboardText subTitle={subTitle} subText={subText} />
        <Stats />
        {/* <Pillars /> */}
      </Suspense>

      <Footer />
    </Fragment>
  );
}
