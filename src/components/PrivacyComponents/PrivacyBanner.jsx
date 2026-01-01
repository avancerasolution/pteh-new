"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../Reuseable/AnimatedHeading";
import Link from "next/link";
import { rowAnim } from "@/lib/Animation";

export default function PrivacyBanner() {
  const title = "Privacy\nand Policy";

  return (
    <Fragment>
      <div className="container-fluid common-banner">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <motion.div
                variants={rowAnim}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
              >
                <AnimatedText text={title} className="hero-title" />
              </motion.div>

              <motion.div whileHover={{ scale: 0.95 }} className="ab-btn">
                <Link href="/?slide=1" className="yellow-btn">
                  Back to vision house →
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
