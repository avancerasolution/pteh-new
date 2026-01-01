"use client";

import React, { Fragment } from "react";
import SteeringPost from "./SteeringPost";
import Link from "next/link";
import { motion, scale } from "framer-motion";
import { rowAnim } from "@/lib/Animation";

/* 🔹 ROW ANIMATION */

export default function SlideThree({ isActive }) {
  return (
    <Fragment>
      {/* 🔑 MAIN CONTAINER WITH VIEWPORT ANIMATION */}
      <div className="container-fluid steering-bg">
        <div className="container steering-section">
          <div className="row align-items-center">
            <motion.div variants={rowAnim} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="col-sm-6">
              <h2>Steering Committee</h2>
            </motion.div>

            <motion.div variants={rowAnim} whileHover={{ scale: 0.95 }} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} className="col-sm-6">
              <Link href="/the-background" className="trans-btn">
                Donate →
              </Link>
            </motion.div>

            <div className="col-sm-12 mt-4">
              <SteeringPost isActive={isActive} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
