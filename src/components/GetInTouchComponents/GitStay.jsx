"use client";

import React from "react";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import { formatText } from "@/lib/FormatText";
import SocialIcons from "../Reuseable/SocialIcons";

export default function GitStay({ posts, loading }) {
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }
  if (!posts?.length) return null;

  const heading = posts[0]?.acf?.connected_heading || "";
  const rawHTML = posts[0]?.acf?.connected_description_one || "";
  const rawHTML2 = posts[0]?.acf?.connected_description_two || "";

  return (
    <motion.div
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="container-fluid Git-stay"
    >
      <div className="container">
        <div className="row ">
          <div className="col-sm-12">
            <h2> {heading}</h2>
            <div
              className="wysiwyg-text"
              dangerouslySetInnerHTML={{
                __html: formatText(rawHTML),
              }}
            />

            <SocialIcons />

            <div
              className="wysiwyg-text"
              dangerouslySetInnerHTML={{
                __html: formatText(rawHTML2),
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
