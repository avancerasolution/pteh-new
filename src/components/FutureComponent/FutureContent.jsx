"use client";

import { formatText } from "@/lib/FormatText";

export default function FutureContent({ html }) {
  return (
    <div
      className="wysiwyg-text"
      dangerouslySetInnerHTML={{
        __html: formatText(html),
      }}
    />
  );
}
