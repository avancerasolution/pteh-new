"use client";

import React, { Fragment, useRef } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import { selectPillarPostsLoading } from "@/store/slices/pillarSlice";
import useDragScroll from "@/hooks/useDragScroll";
import moment from "moment";

const statusClassMap = {
  "Not started": "status-not-started",
  Completed: "status-completed",
  "In progress": "status-in-progress",
  Blocked: "status-blocked",
  Stalled: "status-stalled",
};

export default function PillarTable({ pillar }) {
  const postsLoading = useSelector(selectPillarPostsLoading);
  const statusValue = pillar?.acf?.status || "In progress";

  const posts = Array.isArray(pillar?.posts) ? [...pillar.posts].sort((a, b) => a.id - b.id) : [];

  /* 🔥 DRAG SCROLL REF */
  const scrollRef = useRef(null);
  useDragScroll(scrollRef);

  return (
    <Fragment>
      <motion.div
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="tableheading col-sm-11"
      >
        <h2>{pillar?.acf?.table_heading}</h2>
        <p>{pillar?.acf?.table_description}</p>
      </motion.div>

      <motion.div
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="col-sm-11 pillar-table"
      >
        {/* 🔥 IMPORTANT: ref here */}
        <div ref={scrollRef} className="ethos-wrap mt-5">
          <table className="ethos-table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Future State</th>
                <th>Action</th>
                <th>Owner</th>
                <th>Government Ministry</th>
                <th>NGO</th>
                <th>Start Date</th>
                <th>Due Date</th>
                <th>Metric</th>
                <th>Budget</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {postsLoading ? (
                <tr>
                  <td colSpan="11" className="no-data-cell">
                    <GlobalLoader />
                  </td>
                </tr>
              ) : posts.length > 0 ? (
                posts.map((post, i) => (
                  <tr key={post.id || i}>
                    <td className="ref-cell">{post?.title?.rendered || "-"}</td>
                    <td>{post?.acf?.future_state || "-"}</td>
                    <td>{post?.acf?.action || "-"}</td>
                    <td>{post?.acf?.owner || "-"}</td>
                    <td>{post?.acf?.government_ministry || "-"}</td>
                    <td>{post?.acf?.ngo || "-"}</td>
                    <td className="center">{moment(post?.acf?.start_date || "-").format("DD MMMM YYYY")}</td>
                    <td className="center">{moment(post?.acf?.due_date || "-").format("DD MMMM YYYY")}</td>
                    <td className="center">{post?.acf?.metric || "-"}</td>
                    <td className="center">{post?.acf?.budget || "-"}</td>
                    <td className={`status-cell ${statusClassMap[post?.acf?.status]}`}>{post?.acf?.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="no-data-cell">
                    <GlobalLoader />
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </Fragment>
  );
}
