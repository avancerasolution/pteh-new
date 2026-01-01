"use client";

import React from "react";

import { motion } from "framer-motion";
import { rowAnim } from "@/lib/Animation";
import GlobalLoader from "@/components/Global/GlobalLoader";
import { formatText } from "@/lib/FormatText";
import GitForm from "./GitForm";
import Image from "next/image";

export default function GitContact({ posts, loading }) {
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }
  if (!posts?.length) return null;

  const PhoneImg = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2026/01/Icon.png";
  const EmailImg = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2026/01/Icon-1.png";
  const Heading = posts[0]?.acf?.second_heading || "";
  const CallUs = posts[0]?.acf?.call_us || "";
  const EmailUs = posts[0]?.acf?.email_us || "";

  return (
    <motion.div
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="container-fluid Git form"
    >
      <div className="container">
        <div className="row ">
          <div className="col-sm-4 form-comp">
            <GitForm />
          </div>

          <div className="col-sm-8">
            <h2>{Heading}</h2>
            <div className="phonecard">
              <Image src={PhoneImg} alt="image" width={400} height={400} />
              <div>
                <h4>Call Us</h4>
                <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: formatText(CallUs) }} />
              </div>
            </div>

            <div className="phonecard">
              <Image src={EmailImg} alt="image" width={400} height={400} />
              <div>
                <h4>Email Us</h4>
                <div className="wysiwyg-text" dangerouslySetInnerHTML={{ __html: formatText(EmailUs) }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
