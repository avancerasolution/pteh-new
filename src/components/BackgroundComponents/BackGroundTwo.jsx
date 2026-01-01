"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBackgroundPosts, selectBackgroundPosts, selectBackgroundLoading } from "@/store/slices/BackgroundSlice";
import { motion, AnimatePresence } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import AnimatedSubHeading from "@/components/Reuseable/AnimatedSubHeading";
import GlobalLoader from "@/components/Global/GlobalLoader";

export default function BackGroundTwo({ isActive }) {
  const dispatch = useDispatch();

  // 🔹 Redux hooks
  const posts = useSelector(selectBackgroundPosts);
  const loading = useSelector(selectBackgroundLoading);
  const globalLoading = useSelector((state) => state.loader.loading);

  // 🔹 Fetch background data
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
  const slideTwoText = post?.acf?.slide_two_text || "";

  /* =============================
     SLIDE CONTENT
  ============================== */
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="background-slide-two"
          variants={rowAnim}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="container verticalSlides"
        >
          <div className="row background-text">
            <div className="col-sm-8">
              <AnimatedSubHeading key={isActive} text={slideTwoText} className="hero-title" isActive={isActive} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
