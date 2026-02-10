"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import AnimatedMidHeading from "@/components/Reuseable/AnimatedMidHeading";
import CommunityPost from "./CommunityPost";
import Link from "next/link";

export default function BackGroundNine({ isActive }) {
  const heading = "Our community partners";

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="container steering-section slide-nine">
          <div className="row align-items-center">
            <motion.div
              className="col-sm-12"
              variants={rowAnim}
              initial="hidden"
              animate={isActive ? "show" : "hidden"}
            >
              <AnimatedMidHeading key={isActive} text={heading} className="hero-title mb-4" isActive={isActive} />
            </motion.div>

            <motion.div
              className="col-sm-12"
              variants={rowAnim}
              initial="hidden"
              animate={isActive ? "show" : "hidden"}
            >
              <CommunityPost isActive={isActive} />
            </motion.div>
            <Link href="/?slide=1" className="yellow-btn executive">
              Back to vision house →
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
