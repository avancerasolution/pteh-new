"use client";

export default function SimpleTOC({ headings = [], onLinkClick }) {
  if (!headings.length) return null;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (onLinkClick) {
      setTimeout(() => {
        onLinkClick();
      }, 400);
    }
  };

  return (
    <div className="simple-toc">
      <h4 className="toc-title">Table of Contents</h4>

      {headings.map((item) => (
        <div key={item.id} className={`toc-item toc-${item.level}`} onClick={() => scrollTo(item.id)}>
          {item.text}
        </div>
      ))}
    </div>
  );
}
