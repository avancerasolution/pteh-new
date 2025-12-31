import { useEffect, useState } from "react";
import { getWpImage } from "@/lib/getWpImage";

export function useWpImage(id) {
  const [src, setSrc] = useState("/placeholder.jpg");

  useEffect(() => {
    let mounted = true;

    if (!id) return;

    getWpImage(id).then((url) => {
      if (mounted) setSrc(url);
    });

    return () => {
      mounted = false;
    };
  }, [id]);

  return src;
}
