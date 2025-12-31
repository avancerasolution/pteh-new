// 🔥 Global WordPress Media Resolver (ACF Image ID → URL)

const imageCache = new Map();

export async function getWpImage(id) {
  if (!id) return "/placeholder.jpg";

  // ♻️ cache to avoid repeated API calls
  if (imageCache.has(id)) {
    return imageCache.get(id);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_WP_API}/media/${id}`, { cache: "force-cache" });

    if (!res.ok) throw new Error("Media fetch failed");

    const data = await res.json();
    const url = data?.source_url || "/placeholder.jpg";

    imageCache.set(id, url);
    return url;
  } catch (err) {
    console.error("WP Image Error:", err);
    return "/placeholder.jpg";
  }
}
