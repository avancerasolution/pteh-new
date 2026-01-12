"use client";

export default function FutureTOC({ toc = [] }) {
  if (!toc.length) return null;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="future-toc">
      <h4>Table of Contents</h4>

      {toc.map((section) => (
        <div key={section.id} className="toc-section">
          {/* H2 */}
          <div className="toc-h2" onClick={() => scrollTo(section.id)}>
            {section.text}
          </div>

          {/* H3 as LI */}
          {section.children.length > 0 && (
            <ul className="toc-list">
              {section.children.map((item) => (
                <li key={item.id} onClick={() => scrollTo(item.id)}>
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
