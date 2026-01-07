"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFuturePosts, selectFuturePosts, selectFutureLoading } from "@/store/slices/FutureSlice";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";

import { makeFutureTOC } from "@/lib/futureTOC";
import FutureTOC from "@/components/Reuseable/FutureTOC";
import FutureContent from "./FutureContent";
import FutureETHOSTable from "./FutureETHOSTable";

export default function FutureColumn() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFuturePosts);
  const loading = useSelector(selectFutureLoading);

  useEffect(() => {
    dispatch(fetchFuturePosts());
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
  const rawHTML2 = posts[0]?.acf?.cause_and_impact || "";

  const SPLIT_MARKER = "<!-- FUTURE_SPLIT -->";

  /* ✅ merge for TOC */
  const mergedForTOC = `
    ${rawHTML}
    ${SPLIT_MARKER}
    ${rawHTML2}
  `;

  /* ✅ build TOC */
  const { html: tocHTML, toc } = makeFutureTOC(mergedForTOC);

  /* ✅ SAFE split */
  const [html1, html2] = tocHTML.split(SPLIT_MARKER);

  return (
    <motion.div variants={rowAnim} initial="hidden" animate="show" className="container-fluid">
      <div className="row Executive">
        <div className="col-sm-3">
          <FutureTOC toc={toc} />
        </div>
        <div className="col-sm-9">
          <div className="r-pad">
            <FutureContent html={html1} />
          </div>

          <div className="ethos-wrap">
            <FutureETHOSTable />
          </div>
          <div className="img-auto r-pad">
            <FutureContent html={html2} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
