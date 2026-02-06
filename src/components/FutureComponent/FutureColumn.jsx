"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFuturePosts, selectFuturePosts, selectFutureLoading } from "@/store/slices/FutureSlice";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";

import { makeFutureTOC } from "@/lib/futureTOC";
import FutureTOC from "@/components/Reuseable/FutureTOC";

import FutureContent from "./FutureContent";
import FutureETHOSTable from "./FutureETHOSTable";

//React Bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

export default function FutureColumn() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFuturePosts);
  const loading = useSelector(selectFutureLoading);

  //Offcanvas State
  const [showTOC, setShowTOC] = useState(false);

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

  //Merge content for TOC
  const mergedForTOC = `
    ${rawHTML}
    ${SPLIT_MARKER}
    ${rawHTML2}
  `;

  //Generate TOC
  const { html: tocHTML, toc } = makeFutureTOC(mergedForTOC);

  //Split safely
  const [html1, html2] = tocHTML.split(SPLIT_MARKER);

  return (
    <motion.div variants={rowAnim} initial="hidden" animate="show" className="container-fluid">
      <div className="row Executive">
        {/*MOBILE TOC BUTTON */}
        <div className="d-block d-sm-none mb-3">
          <Button variant="dark" className="w-100" onClick={() => setShowTOC(true)}>
            {" > "}
          </Button>
        </div>

        {/*MOBILE OFFCANVAS */}
        <Offcanvas
          show={showTOC}
          onHide={() => setShowTOC(false)}
          placement="start"
          className="d-sm-none"
          restoreFocus={false}
          scroll={true}
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>

          <Offcanvas.Body>
            <FutureTOC toc={toc} onLinkClick={() => setShowTOC(false)} />
          </Offcanvas.Body>
        </Offcanvas>

        {/*DESKTOP SIDEBAR */}
        <div className="col-sm-3 d-none d-sm-block">
          <FutureTOC toc={toc} />
        </div>

        {/*MAIN CONTENT */}
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
