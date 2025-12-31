"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const parent = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const letterVariant = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function parseHtml(html) {
  if (!html) return null;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let keyIndex = 0;

  const walk = (node) => {
    /* =============================
       TEXT NODE → animate words
    ============================== */
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent
        .replace(/\u00A0/g, " ") // ✅ NBSP fix
        .split(" ")
        .map((word) =>
          word.trim() ? (
            <motion.span
              key={keyIndex++}
              variants={wordVariant}
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                marginRight: "10px",
              }}
            >
              {word.split("").map((letter, i) => (
                <motion.span key={i} variants={letterVariant} style={{ display: "inline-block" }}>
                  {letter}
                </motion.span>
              ))}
            </motion.span>
          ) : (
            " "
          )
        );
    }

    /* =============================
       <br> TAG HANDLING ✅
    ============================== */
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BR") {
      return <br key={keyIndex++} />;
    }

    /* =============================
       OTHER HTML TAGS
    ============================== */
    if (node.nodeType === Node.ELEMENT_NODE) {
      const Tag = node.tagName.toLowerCase();

      return (
        <Tag key={keyIndex++} {...Object.fromEntries([...node.attributes].map((a) => [a.name, a.value]))}>
          {Array.from(node.childNodes).map(walk)}
        </Tag>
      );
    }

    return null;
  };

  return Array.from(doc.body.childNodes).map(walk);
}

export default function AnimatedMidHeading({ text, className, isActive = true }) {
  const content = useMemo(() => parseHtml(text), [text]);

  return (
    <motion.h3
      className={className}
      variants={parent}
      initial="hidden"
      animate={isActive ? "show" : "hidden"}
      style={{ overflowWrap: "break-word" }}
      aria-label="Animated Mid Heading"
    >
      {content}
    </motion.h3>
  );
}
