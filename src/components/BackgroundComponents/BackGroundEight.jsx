"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoPosts, selectVideoPosts, selectVideoLoading } from "@/store/slices/VideoSlice";
import { motion, AnimatePresence } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import AnimatedMidHeading from "../Reuseable/AnimatedMidHeading";

/* 🔹 SWIPER */
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/* 🔹 YouTube helper */
const getYouTubeEmbed = (url) => {
  if (!url) return "";
  const id = url.split("v=")[1]?.split("&")[0];
  return `https://www.youtube.com/embed/${id}?controls=0&rel=0&modestbranding=1&playsinline=1`;
};

/* ======================================================
   VIDEO SLIDE (WITH GLOBAL LOADER + FADE IN)
====================================================== */
function VideoSlide({ embedUrl, title }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="video-iframe-wrap">
      {/* LOADER */}
      {!loaded && (
        <div className="video-loader-wrap">
          <GlobalLoader />
        </div>
      )}

      {/* IFRAME */}
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        className={`video-iframe ${loaded ? "loaded" : ""}`}
      />
    </div>
  );
}

/* ======================================================
   MAIN COMPONENT
====================================================== */
export default function BackGroundEight({ isActive }) {
  const dispatch = useDispatch();

  const posts = useSelector(selectVideoPosts);
  const loading = useSelector(selectVideoLoading);
  const globalLoading = useSelector((state) => state.loader.loading);

  useEffect(() => {
    dispatch(fetchVideoPosts());
  }, [dispatch]);

  /* LOADER STATES */
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts?.length || globalLoading) return null;

  const slideSevenHeading = "What is the Plan to end Homelessness?";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="background-slide-eight"
          variants={rowAnim}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="container verticalSlides slide-eight"
        >
          {/* HEADING */}
          <div className="row background-text mb-5">
            <div className="col-sm-12 text-center">
              <AnimatedMidHeading key={isActive} text={slideSevenHeading} className="hero-title" isActive={isActive} />
            </div>
          </div>

          {/* VIDEO SLIDER */}
          <div className="row">
            <div className="col-sm-12">
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={24}
                slidesPerView={3}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1200: { slidesPerView: 3 },
                }}
                className="video-swiper"
              >
                {posts.map((post) => {
                  const embedUrl = getYouTubeEmbed(post?.acf?.youtube_video_url_here);

                  return (
                    <SwiperSlide key={post.id}>
                      <VideoSlide embedUrl={embedUrl} title={post.title.rendered} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
