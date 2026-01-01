export function makeTOC(html) {
  if (!html) return { html: "", headings: [] };

  const wrapper = document.createElement("div");
  wrapper.innerHTML = html;

  const headings = [];

  wrapper.querySelectorAll("h2, h3, h4").forEach((tag, index) => {
    const text = tag.innerText.trim();
    const level = tag.tagName.toLowerCase();

    const id =
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `section-${index}`;

    tag.id = id;
    headings.push({ id, text, level });
  });

  return {
    html: wrapper.innerHTML,
    headings,
  };
}
