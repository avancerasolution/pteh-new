"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchExecutivePosts, selectExecutivePosts, selectExecutiveLoading } from "@/store/slices/ExecutiveSlice";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";

import GlobalLoader from "@/components/Global/GlobalLoader";
import { makeTOC } from "@/lib/simpleTOC";

import SimpleTOC from "@/components/Reuseable/SimpleTOC";
import ExecutiveContent from "./ExecutiveContent";

// ✅ React Bootstrap
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";

export default function ExecutiveColumns() {
  const dispatch = useDispatch();
  const posts = useSelector(selectExecutivePosts);
  const loading = useSelector(selectExecutiveLoading);

  // ✅ Offcanvas state
  const [showTOC, setShowTOC] = useState(false);

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

  // ✅ Generate TOC headings + updated HTML
  const { html, headings } = makeTOC(rawHTML);

  return (
    <motion.div variants={rowAnim} initial="hidden" animate="show" className="container-fluid">
      <div className="row Executive">
        {/* MOBILE BUTTON */}
        <div className="d-block d-sm-none mb-3">
          <Button variant="dark" className="w-100" onClick={() => setShowTOC(true)}>
            {" > "}
          </Button>
        </div>

        {/* MOBILE OFFCANVAS */}
        <Offcanvas
          show={showTOC}
          onHide={() => setShowTOC(false)}
          placement="start"
          className="d-sm-none"
          restoreFocus={false} //  Fix scroll jump
          scroll={true} //  Allow body scroll
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>

          <Offcanvas.Body>
            <SimpleTOC headings={headings} onLinkClick={() => setShowTOC(false)} />
          </Offcanvas.Body>
        </Offcanvas>

        {/* DESKTOP SIDEBAR */}
        <div className="col-sm-3 d-none d-sm-block">
          <SimpleTOC headings={headings} />
        </div>

        {/*  MAIN CONTENT */}
        <div className="col-sm-9">
          <ExecutiveContent html={html} />
        </div>
      </div>
    </motion.div>
  );
}
