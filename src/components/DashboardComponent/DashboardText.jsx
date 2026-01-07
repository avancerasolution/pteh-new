"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import AnimatedParagraph from "../Reuseable/AnimatedParagraph";
import AnimatedMidHeading from "../Reuseable/AnimatedMidHeading";

export default function DashboardText({ subTitle, subText }) {
  const title = "Where Do We Focus?\nAnd What Are the Key\nPriorities";

  return (
    <Fragment>
      <div className="container vision-container">
        <div className="row">
          <div className="col-sm-8">
            <motion.div variants={rowAnim} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }}>
              <AnimatedMidHeading text={subTitle} className="hero-title" />
              <AnimatedParagraph text={subText} className="hero-title" />
            </motion.div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
