"use client";

import AnimatedText from "@/components/Reuseable/AnimatedHeading";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { linkVariants } from "@/lib/Animation";
import { useSelector } from "react-redux";

export default function SlideOne({ isActive }) {
  const title = "The Plan to end\n homelessness\nIn Bermuda";

  //  GLOBAL LOADER STATE
  const loading = useSelector((state) => state.loader.loading);

  //  Gate animation while loader is active
  if (loading) return null;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="slide-one"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="container verticalSlides"
        >
          {/* TITLE */}
          <div className="row">
            <div className="col-sm-6 tab-slide mobile-set">
              <AnimatedText
                key={isActive} //  reset typing animation on re-enter
                text={title}
                className="hero-title"
              />
            </div>
          </div>

          {/* LINKS */}
          <div className="row mt-4">
            <div className="col-sm-2  tab-width">
              <motion.div
                custom={0}
                variants={linkVariants}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 0.95 }}
              >
                <Link href="/executive-summary" className="yellow-btn">
                  What is the Plan? →
                </Link>
              </motion.div>
            </div>

            <div className="col-sm-2 tab-width">
              <motion.div
                custom={1}
                variants={linkVariants}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 0.95 }}
              >
                <Link href="/dashboard" className="yellow-btn">
                  Check the Status →
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
