export const getFeaturedImage = (post) => post?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/placeholder.jpg";
