import { blogPosts } from "@/lib/blogData";

export default function sitemap() {
  const baseUrl = "https://www.teravoltdigital.website";

  const blogUrls = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
  }));

  return [
    { url: baseUrl },
    { url: `${baseUrl}/blog` },
    { url: `${baseUrl}/portfolio` },
    { url: `${baseUrl}/services` },
    ...blogUrls,
  ];
}