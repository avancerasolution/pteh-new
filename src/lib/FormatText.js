export function formatText(text) {
  if (!text) return "";
  const normalized = text.replace(/\r\n|\r/g, "\n");
  return normalized
    .split("\n\n")
    .map(block => block.replace(/\n/g, "<br />"))
    .join("<br /><br />");
}

export const decodeHTML = str => {
  if (!str) return "";
  if (typeof document === "undefined") {
    return str
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  }

  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
};
