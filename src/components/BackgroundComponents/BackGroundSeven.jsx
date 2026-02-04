"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBackgroundPosts, selectBackgroundPosts, selectBackgroundLoading } from "@/store/slices/BackgroundSlice";
import { motion, AnimatePresence } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import AnimatedSubHeading from "@/components/Reuseable/AnimatedSubHeading";
import GlobalLoader from "@/components/Global/GlobalLoader";
import AnimatedMidHeading from "../Reuseable/AnimatedMidHeading";
import { formatText } from "@/lib/FormatText";

export default function BackGroundSeven({ isActive }) {
  const dispatch = useDispatch();

  //    Redux hooks
  const posts = useSelector(selectBackgroundPosts);
  const loading = useSelector(selectBackgroundLoading);
  const globalLoading = useSelector((state) => state.loader.loading);

  //    Fetch data
  useEffect(() => {
    dispatch(fetchBackgroundPosts());
  }, [dispatch]);

  /* =============================
     LOADER STATES
  ============================== */
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts?.length || globalLoading) return null;

  const post = posts[0];
  const slideSevenHeading = (post?.acf?.slide_seven_heading || "").replace(/\u00A0/g, " ");
  const slideSeventext = (post?.acf?.slide_seven_text || "").replace(/\u00A0/g, " ");

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="background-slide-one"
          variants={rowAnim}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="container verticalSlides slide-seven"
        >
          <div className="row background-text">
            <div className="col-sm-12">
              {/* <AnimatedMidHeading key={isActive} text={slideSevenHeading} className="hero-title" isActive={isActive} /> */}
              <h3
                dangerouslySetInnerHTML={{
                  __html: formatText(slideSevenHeading),
                }}
              />
              <div
                className="wysiwyg-text"
                dangerouslySetInnerHTML={{
                  __html: formatText(slideSeventext),
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
