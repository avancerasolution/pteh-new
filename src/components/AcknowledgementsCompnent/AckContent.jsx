"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAckPosts, selectAckPosts, selectAckLoading } from "@/store/slices/AckSlice";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";

import { makeTOC } from "@/lib/simpleTOC";
import { formatText } from "@/lib/FormatText";

export default function AckContent() {
  const dispatch = useDispatch();
  const posts = useSelector(selectAckPosts);
  const loading = useSelector(selectAckLoading);

  useEffect(() => {
    dispatch(fetchAckPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts?.length) return null;

  const rawHTML = posts[0]?.content?.rendered || "";
  const heading = posts[0]?.title?.rendered || "";

  // 🔥 GLOBAL TOC
  const { html, headings } = makeTOC(rawHTML);

  return (
    <motion.div variants={rowAnim} initial="hidden" animate="show" className="container Ack">
      <div className="row ">
        <div className="col-sm-12">
          <h2> {heading}</h2>
          <div
            className="wysiwyg-text"
            dangerouslySetInnerHTML={{
              __html: formatText(html),
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
