"use client";

import React, { useEffect } from "react";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import { formatText } from "@/lib/FormatText";

export default function GitFeedback({ posts, loading }) {
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }
  if (!posts?.length) return null;

  const heading = posts[0]?.acf?.feedback_heading || "";
  const rawHTML = posts[0]?.acf?.feeedback_description || "";

  return (
    <motion.div
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="container Git"
    >
      <div className="row ">
        <div className="col-sm-12">
          <h2> {heading}</h2>
          <div
            className="wysiwyg-text"
            dangerouslySetInnerHTML={{
              __html: formatText(rawHTML),
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
