"use client";

export default function SimpleTOC({ headings = [] }) {
  if (!headings.length) return null;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="simple-toc">
      <h4>Table of Contents</h4>

      {headings.map((item) => (
        <div
          key={item.id}
          className={`toc-${item.level}`}
          onClick={() => scrollTo(item.id)}
          style={{ cursor: "pointer", marginBottom: 8 }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}
