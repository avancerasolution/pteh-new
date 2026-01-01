"use client";

import React from "react";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import { formatText } from "@/lib/FormatText";
import AllData from "./AllData";

export default function DataPageContent({ posts, loading }) {
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }
  if (!posts?.length) return null;

  const heading = posts[0]?.acf?.identify_heading || "";
  const rawHTML = posts[0]?.acf?.identify_text || "";
  const rawHTMLTwo = posts[0]?.acf?.identify_text_2 || "";

  return (
    <motion.div
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="container our-datas"
    >
      <div className="row ">
        <div className="col-sm-12 data-text">
          <h2> {heading}</h2>
          <div
            className="wysiwyg-text"
            dangerouslySetInnerHTML={{
              __html: formatText(rawHTML),
            }}
          />
        </div>

        <AllData />

        <div className="col-sm-12 data-text">
          <div
            className="wysiwyg-text"
            dangerouslySetInnerHTML={{
              __html: formatText(rawHTMLTwo),
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
