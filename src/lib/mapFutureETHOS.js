// 🔹 HTML strip
const stripHTML = (html = "") => html.replace(/<[^>]*>/g, "").trim();

// 🔹 rows helper
const parseRows = (rows) => {
  if (!rows) return null;

  return stripHTML(rows)
    .split("\n")
    .map((line) => {
      const [code, living] = line.split("|");
      return {
        code: code?.trim(),
        living: living?.trim(),
      };
    });
};

/* ==================================================
   🔥 FIXED SECTION ORDER (VERY IMPORTANT)
   ================================================== */
const SECTION_ORDER = ["Roofless", "Houseless", "Insecure housing", "Inadequate housing"];

export function mapFutureETHOS(posts) {
  const sectionsMap = {};

  posts.forEach((post) => {
    /* 🔹 taxonomy name */
    const terms = post._embedded?.["wp:term"] || [];
    const sectionTerm = terms.flat().find((t) => t.taxonomy === "table-texanomies");

    const sectionName = sectionTerm?.name || "Other";

    if (!sectionsMap[sectionName]) {
      sectionsMap[sectionName] = {
        section: sectionName,
        items: [],
      };
    }

    /* 🔹 operational */
    let operational = stripHTML(post.acf.operational);

    if (post.acf.bullets) {
      const bullets = stripHTML(post.acf.bullets)
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean);

      if (bullets.length) {
        operational = {
          title: stripHTML(post.acf.operational),
          bullets,
        };
      }
    }

    /* 🔹 push item */
    sectionsMap[sectionName].items.push({
      no: Number(post.title.rendered), // 🔥 number for sorting
      operational,
      code: post.acf.code || null,
      living: post.acf.living || null,
      rows: parseRows(post.acf.rows),
      definition: stripHTML(post.acf.definition),
      y2021: Number(post.acf.y2021),
      y2022: Number(post.acf.y2022),
    });
  });

  /* ==================================================
     🔥 FINAL ORDERING (THIS FIXES EVERYTHING)
     ================================================== */

  return SECTION_ORDER.filter((section) => sectionsMap[section]) // sirf existing
    .map((section) => ({
      section,
      items: sectionsMap[section].items.sort(
        (a, b) => a.no - b.no // 🔥 1 → 13
      ),
    }));
}
