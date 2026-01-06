// /lib/futureTOC.js

export const makeFutureTOC = (htmlString = "") => {
  if (!htmlString) return { html: "", toc: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const headings = Array.from(doc.querySelectorAll("h2, h3"));

  let toc = [];
  let currentH2 = null;

  headings.forEach((heading, index) => {
    const level = heading.tagName.toLowerCase();
    const text = heading.textContent.trim();

    const id =
      text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "") +
      "-" +
      index;

    heading.setAttribute("id", id);

    if (level === "h2") {
      currentH2 = {
        id,
        text,
        children: [],
      };
      toc.push(currentH2);
    }

    if (level === "h3" && currentH2) {
      currentH2.children.push({
        id,
        text,
      });
    }
  });

  return {
    html: doc.body.innerHTML,
    toc,
  };
};
