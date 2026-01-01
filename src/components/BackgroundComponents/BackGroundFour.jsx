"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBackgroundPosts, selectBackgroundPosts, selectBackgroundLoading } from "@/store/slices/BackgroundSlice";
import { motion, AnimatePresence } from "framer-motion";
import { rowAnim, fromLeft, fromRight } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import Image from "next/image";
import { useWpImage } from "@/hooks/useWpImage";

export default function BackGroundFour({ isActive }) {
  const dispatch = useDispatch();

  // 🔹 Redux hooks (ALWAYS called)
  const posts = useSelector(selectBackgroundPosts);
  const loading = useSelector(selectBackgroundLoading);
  const globalLoading = useSelector((state) => state.loader.loading);

  // 🔹 Safe post reference
  const post = posts?.[0];

  // 🔹 ✅ CUSTOM HOOK MUST BE HERE (ALWAYS)
  const image = useWpImage(post?.acf?.slide_four_image);

  // 🔹 Fetch data
  useEffect(() => {
    dispatch(fetchBackgroundPosts());
  }, [dispatch]);

  /* =============================
     LOADER STATES (AFTER hooks)
  ============================== */
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!post || globalLoading) return null;
  const heading = post.acf.slide_four_heading || "";
  const text = post.acf.slide_four_text || "";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="background-slide-four"
          variants={rowAnim}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="container-fluid verticalSlides slide-four"
        >
          <div className="container">
            <div className="row align-items-center">
              {/* TEXT */}
              <motion.div className="col-sm-6 right-pad" variants={fromLeft}>
                <h3 className="mb-3">{heading}</h3>
                <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: text }} />
              </motion.div>

              {/* IMAGE */}
              <motion.div className="col-sm-6" variants={fromRight}>
                <Image src={image} width={500} height={500} alt="Slide Four Image" className="img-fluid" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
