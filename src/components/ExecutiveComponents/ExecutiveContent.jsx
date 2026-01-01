"use client";

import { formatText } from "@/lib/FormatText";

export default function ExecutiveContent({ html }) {
  return (
    <div
      className="wysiwyg-text"
      dangerouslySetInnerHTML={{
        __html: formatText(html),
      }}
    />
  );
}
