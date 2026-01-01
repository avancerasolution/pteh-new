"use client";

import React from "react";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import { formatText } from "@/lib/FormatText";
import Image from "next/image";
import Link from "next/link";

export default function GitDonate({ posts, loading }) {
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }
  if (!posts?.length) return null;

  const heading = posts[0]?.acf?.donate_heading || "";
  const rawHTML = posts[0]?.acf?.donate_description || "";
  const tagline = posts[0]?.acf?.donate_tagline || "";
  const accountName = posts[0]?.acf?.account_name || "";
  const accountNumber = posts[0]?.acf?.account_number || "";
  const bankDetail = posts[0]?.acf?.bank_detail || "";
  const image = posts[0]?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";

  return (
    <motion.div
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="container-fluid GitDonate"
      id="donate"
    >
      <div className="container">
        <div className="row ">
          <div className="col-sm-5">
            <Image src={image} alt="asd" width={400} height={400} />
          </div>
          <div className="col-sm-7">
            <h2>{heading}</h2>
            <div className="wysiwyg-text " dangerouslySetInnerHTML={{ __html: formatText(rawHTML) }} />
            <motion.div className="btm-marg" whileHover={{ scale: 0.95 }}>
              <Link href="">Donate Online →</Link>
            </motion.div>

            <div className="donateDetails">
              <p>{tagline}</p>
              <h4>Account Name:</h4>
              <p>{accountName}</p>
              <h4>Account Number: </h4>
              <p>{accountNumber}</p>
              <h4>Bank: </h4>
              <div className="wysiwyg-text " dangerouslySetInnerHTML={{ __html: formatText(bankDetail) }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
