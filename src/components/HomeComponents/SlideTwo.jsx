"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { centerScale, fromLeft, fromRight, fromTop } from "@/lib/slideTwoAnimations";

export default function SlideTwo({ isActive }) {
  const future = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Frame-1357.png";
  const data = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Frame-1358.png";
  const priority = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Frame-1355.png";
  const action = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2026/01/CM.jpeg";
  const dashboard = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Frame-1359.png";
  const visionHouse = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/visionHome.png";
  const powered = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2025/12/Group-1000002295.png";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key="slide-two"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="container verticalSlides visionHouse"
        >
          <div className="row">
            {/* LEFT COLUMN */}
            <div className="col-sm-3">
              <motion.div
                whileHover={{ scale: 1.09 }}
                className="future equal"
                custom={0}
                variants={fromLeft}
                initial="hidden"
                animate="show"
              >
                <Link href="/future-state">
                  <Image src={future} alt="Future State" width={300} height={100} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.09 }}
                className="data equal"
                custom={1}
                variants={fromLeft}
                initial="hidden"
                animate="show"
              >
                <Link href="/our-data">
                  <Image src={data} alt="Data" width={300} height={100} />
                </Link>
              </motion.div>
            </div>

            {/* CENTER HOUSE */}
            <div className="col-sm-6 text-center">
              <motion.div variants={centerScale} initial="hidden" animate="show">
                <Image src={visionHouse} alt="Vision Home" width={600} height={400} />
              </motion.div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="col-sm-3">
              <motion.div
                whileHover={{ scale: 1.09 }}
                className="priority equal"
                variants={fromTop}
                initial="hidden"
                animate="show"
              >
                <Link href="/priorities">
                  <Image src={priority} alt="Priorities" width={300} height={100} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.09 }}
                className="action equal"
                custom={0}
                variants={fromRight}
                initial="hidden"
                animate="show"
              >
                <Link href="/get-involved">
                  <Image src={action} alt="Actions" width={300} height={100} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.09 }}
                className="dashboard equal"
                custom={1}
                variants={fromRight}
                initial="hidden"
                animate="show"
              >
                <Link href="/get-involved">
                  <Image src={dashboard} alt="Dashboard" width={300} height={100} />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* <Image src={powered} width={400} height={100} className="powered" alt="powered" /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
