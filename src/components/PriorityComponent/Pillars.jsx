"use client";

import React, { Fragment, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPillars,
  selectPillars,
  selectPillarsLoading,
  selectActivePillar,
  setActivePillar,
  selectPillarPage,
  selectPillarTotalPages,
} from "@/store/slices/pillarSlice";

import AnimatedMidHeading from "../Reuseable/AnimatedMidHeading";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import PillarTable from "./PillarTable";

export default function Pillars() {
  const dispatch = useDispatch();

  const pillars = useSelector(selectPillars);
  const loading = useSelector(selectPillarsLoading);
  const activePillar = useSelector(selectActivePillar);
  const page = useSelector(selectPillarPage);
  const totalPages = useSelector(selectPillarTotalPages);

  const tableRef = useRef(null);

  /* 🔹 INITIAL LOAD */
  useEffect(() => {
    dispatch(fetchPillars({ page: 1 }));
  }, [dispatch]);

  const handleView = (pillar) => {
    dispatch(setActivePillar(pillar));
    setTimeout(() => {
      tableRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  };

  const loadMore = () => {
    dispatch(fetchPillars({ page: page + 1 }));
  };

  return (
    <Fragment>
      <div className="container-fluid pillars-container">
        <div className="container ">
          <div className="row">
            <div className="col-sm-12">
              <h2>
                Explore each of the headings to view
                <br /> the progress
              </h2>
            </div>
            {pillars.map((pillar) => (
              <div className="col-sm-4 mb-5" key={pillar.id}>
                <motion.div
                  variants={rowAnim}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: false, amount: 0.3 }}
                >
                  <h4>{pillar.description} </h4>
                  <motion.button
                    whileHover={{ scale: 0.95 }}
                    className="taranparent-btn"
                    onClick={() => handleView(pillar)}
                  >
                    View Details →
                  </motion.button>
                </motion.div>
              </div>
            ))}

            {/* 🔹 LOADER (Load More ke waqt) */}
            {loading && (
              <div className="col-sm-12 text-center my-4">
                <GlobalLoader />
              </div>
            )}

            {/* 🔹 LOAD MORE BUTTON */}
            {!loading && page < totalPages && (
              <div className="col-sm-12 text-center mt-4">
                <button className="yellow-btn" onClick={loadMore}>
                  Load More
                </button>
              </div>
            )}
          </div>

          {/* 🔻 TABLE SECTION */}
          <div ref={tableRef}>
            <AnimatePresence>{activePillar && <PillarTable pillar={activePillar} />}</AnimatePresence>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
