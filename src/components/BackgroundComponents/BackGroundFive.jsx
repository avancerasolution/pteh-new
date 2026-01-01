"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBackgroundPosts, selectBackgroundPosts, selectBackgroundLoading } from "@/store/slices/BackgroundSlice";
import { motion, AnimatePresence } from "framer-motion";
import { rowAnim, fromLeft, fromRight, galleryAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import AnimatedMidHeading from "@/components/Reuseable/AnimatedMidHeading";
import { useWpImage } from "@/hooks/useWpImage";

/* ======================================
   ✅ CHILD COMPONENT (HOOK SAFE)
====================================== */
function GalleryImage({ imageId, item }) {
  const src = useWpImage(imageId);

  if (!src) return null;

  return (
    <motion.img
      src={src}
      className="gallery-img"
      variants={galleryAnim[item.anim]}
      initial="hidden"
      animate="show"
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        width: item.size,
        height: "auto",
        top: item.top,
        left: item.left,
        right: item.right,
        zIndex: item.index,
      }}
    />
  );
}

/* ======================================
   MAIN COMPONENT
====================================== */
export default function BackGroundFive({ isActive }) {
  const dispatch = useDispatch();

  // 🔹 REDUX (ALWAYS)
  const posts = useSelector(selectBackgroundPosts);
  const loading = useSelector(selectBackgroundLoading);
  const globalLoading = useSelector((state) => state.loader.loading);

  const post = posts?.[0];

  // 🔹 FETCH
  useEffect(() => {
    dispatch(fetchBackgroundPosts());
  }, [dispatch]);

  // 🔹 LOADERS
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!post || globalLoading) return null;

  // 🔹 SAFE DATA
  const heading = post?.acf?.slide_five_heading || "";
  const galleryIds = post?.acf?.slide_five_image_gallery || [];

  // 🔹 LAYOUT
  const galleryLayout = [
    { i: 12, top: "10%", left: "16%", size: "auto", index: "99", anim: "left" },
    { i: 11, top: "12%", left: "36%", size: "auto", index: "99", anim: "up" },
    { i: 10, top: "13%", right: "23%", size: "auto", index: "99", anim: "right" },

    { i: 9, top: "40%", left: "13%", size: "auto", index: "99", anim: "down" },
    { i: 8, top: "65%", left: "13%", size: "auto", index: "99", anim: "left" },

    { i: 7, top: "25%", left: "20%", size: "50%", anim: "center" },

    { i: 6, top: "33%", right: "22%", size: "auto", anim: "right" },
    { i: 5, top: "62%", right: "39%", size: "auto", anim: "down" },

    { i: 4, top: "62%", left: "30%", size: "auto", anim: "left" },
    { i: 3, top: "82%", left: "30%", size: "auto", anim: "up" },
    { i: 2, top: "82%", left: "46%", size: "auto", anim: "down" },
    { i: 1, top: "82%", right: "22%", size: "auto", anim: "up" },
    { i: 0, top: "62%", right: "22%", size: "auto", anim: "right" },
  ];

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="background-slide-five"
          variants={rowAnim}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="container-fluid verticalSlides slide-five"
        >
          <div className="container">
            <div className="row align-items-center">
              {/* TEXT */}
              <motion.div className="col-sm-6 right-pad" variants={fromRight}>
                <AnimatedMidHeading key={isActive} text={heading} className="hero-title mb-4" isActive={isActive} />
              </motion.div>

              {/* GALLERY */}
              <motion.div className="col-sm-6" variants={fromLeft}>
                <div className="gallery-wrapper">
                  {galleryLayout.map((item, idx) => (
                    <GalleryImage key={idx} imageId={galleryIds[item.i]} item={item} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
