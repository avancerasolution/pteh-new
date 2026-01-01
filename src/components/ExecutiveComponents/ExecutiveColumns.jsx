"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExecutivePosts, selectExecutivePosts, selectExecutiveLoading } from "@/store/slices/ExecutiveSlice";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";

import { makeTOC } from "@/lib/simpleTOC";
import SimpleTOC from "@/components/Reuseable/SimpleTOC";
import ExecutiveContent from "./ExecutiveContent";

export default function ExecutiveColumns() {
  const dispatch = useDispatch();
  const posts = useSelector(selectExecutivePosts);
  const loading = useSelector(selectExecutiveLoading);

  useEffect(() => {
    dispatch(fetchExecutivePosts());
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

  // 🔥 GLOBAL TOC
  const { html, headings } = makeTOC(rawHTML);

  return (
    <motion.div variants={rowAnim} initial="hidden" animate="show" className="container-fluid">
      <div className="row Executive">
        <div className="col-sm-3">
          <SimpleTOC headings={headings} />
        </div>

        <div className="col-sm-9">
          <ExecutiveContent html={html} />
        </div>
      </div>
    </motion.div>
  );
}
