"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedText({ text, className, staggerDelay = 0.12 }) {
  // 🔹 split text into lines first
  const lines = text.split("\n");

  const parent = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const wordVariant = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={parent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      aria-label={text}
      style={{ overflowWrap: "break-word" }}
    >
      {lines.map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line.split(" ").map((word, wordIndex) => (
            <motion.span
              key={`${lineIndex}-${wordIndex}`}
              variants={wordVariant}
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                marginRight: "12px",
              }}
            >
              {word}
            </motion.span>
          ))}

          {/* ✅ real line break */}
          {lineIndex !== lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </motion.h1>
  );
}
