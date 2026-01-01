"use client";

import React from "react";
import GlobalLoader from "@/components/Global/GlobalLoader";
import { formatText } from "@/lib/FormatText";
import { rowAnim } from "@/lib/Animation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function GitStay({ posts, loading }) {
  if (loading) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }
  if (!posts?.length) return null;

  const rawHTML = posts[0]?.content?.rendered || "";
  const PhoneImg = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2026/01/Icon.png";
  const EmailImg = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2026/01/Icon-1.png";
  const Marker = "https://hostedsitedemo.com/new-pteh/wp-content/uploads/2026/01/Icon-2.png";

  return (
    <motion.div
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: false, amount: 0.5 }}
      className="container privacy"
    >
      <div className="row ">
        <div className="col-sm-12">
          <div
            className="wysiwyg-text"
            dangerouslySetInnerHTML={{
              __html: rawHTML,
            }}
          />

          <div className="phonecard">
            <Image src={PhoneImg} alt="image" width={400} height={400} />
            <div>
              <h4>Phone Number</h4>
              <Link href="tel:441 599 9933">441 599 9933</Link>
            </div>
          </div>

          <div className="phonecard">
            <Image src={EmailImg} alt="image" width={400} height={400} />
            <div>
              <h4>Email</h4>
              <Link href="mailto:info@home.bm">info@home.bm</Link>
            </div>
          </div>

          <div className="phonecard">
            <Image src={Marker} alt="image" width={400} height={400} />
            <div>
              <h4>Physical Address</h4>
              <Link href="#">123 Main St. Anytown, USA</Link>
            </div>
          </div>

          <p className="wysiwyg-text">
            By using our website or services, you acknowledge that you have read and understood this Privacy Policy.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
