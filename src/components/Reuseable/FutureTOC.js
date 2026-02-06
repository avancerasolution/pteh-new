"use client";

export default function FutureTOC({ toc = [], onLinkClick }) {
  if (!toc.length) return null;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Close Offcanvas after click
    if (onLinkClick) {
      setTimeout(() => {
        onLinkClick();
      }, 400);
    }
  };

  return (
    <div className="future-toc">
      <h4>Table of Contents</h4>

      {toc.map((section) => (
        <div key={section.id} className="toc-section">
          {/* H2 */}
          <div className="toc-h2" onClick={() => scrollTo(section.id)} style={{ cursor: "pointer" }}>
            {section.text}
          </div>

          {/* H3 */}
          {section.children.length > 0 && (
            <ul className="toc-list">
              {section.children.map((item) => (
                <li key={item.id} onClick={() => scrollTo(item.id)} style={{ cursor: "pointer" }}>
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
