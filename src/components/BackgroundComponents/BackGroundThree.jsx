"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBackgroundPosts, selectBackgroundPosts, selectBackgroundLoading } from "@/store/slices/BackgroundSlice";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedMidHeading from "@/components/Reuseable/AnimatedMidHeading";
import Image from "next/image";
import { useWpImage } from "@/hooks/useWpImage";
import { formatText } from "@/lib/FormatText";
import { rowAnim, fromLeft, imageUp } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";

export default function BackGroundThree({ isActive }) {
  const dispatch = useDispatch();

  // 🔹 Redux hooks
  const posts = useSelector(selectBackgroundPosts);
  const loading = useSelector(selectBackgroundLoading);
  const globalLoading = useSelector((state) => state.loader.loading);

  const post = posts?.[0];

  // 🔹 Custom hooks (ALWAYS called)
  const imageOne = useWpImage(post?.acf?.slide_three_image);
  const imageTwo = useWpImage(post?.acf?.slide_three_image_vertical);
  const imagethree = useWpImage(post?.acf?.slide_three_image_backgground);

  // 🔹 Fetch data
  useEffect(() => {
    dispatch(fetchBackgroundPosts());
  }, [dispatch]);

  /* =============================
     LOADER STATES
  ============================== */

  // 🔄 While fetching background posts
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  // ⛔ No data
  if (!posts?.length || globalLoading) return null;

  /* =============================
     SLIDE CONTENT
  ============================== */

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="background-slide-three"
          variants={rowAnim}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="container-fluid verticalSlides thirdslide"
        >
          <div className="row align-items-end tab-three-adjust">
            {/* 🔹 COL 1 — HEADING + IMAGE */}
            <div className="col-sm-4">
              <AnimatedMidHeading
                key={isActive}
                text={post.acf.slide_3_heading}
                className="hero-title mb-4"
                isActive={isActive}
              />

              <motion.div variants={imageUp}>
                <Image src={imageOne} width={500} height={600} alt="Slide Three Image One" className="img-fluid" />
              </motion.div>
            </div>

            {/* 🔹 COL 2 — IMAGE SLIDE UP */}
            <div className="col-sm-3">
              <motion.div variants={imageUp} transition={{ delay: 0.15 }}>
                <Image src={imageTwo} width={400} height={700} alt="Slide Three Image Two" className="img-fluid" />
              </motion.div>
            </div>

            {/* 🔹 COL 3 — LEFT → RIGHT */}
            <motion.div
              className="col-sm-5"
              variants={fromLeft}
              style={{
                backgroundImage: `url(${imagethree})`,
                backgroundSize: "contain",
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className="wysiwyg-text"
                dangerouslySetInnerHTML={{
                  __html: formatText(post.acf.slide_3_text),
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
