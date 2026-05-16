import { blogPosts } from "@/lib/blogData";
import { projectsData } from "@/lib/projectsData";
import { servicesData } from "@/lib/servicesData";

export default function sitemap() {
  const baseUrl = "https://www.teravoltdigital.website";

  // Blog URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  // Portfolio URLs
  const projectUrls = projectsData.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  // Services URLs
  const serviceUrls = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    priority: 0.9,
  }));

  return [
    // Core pages
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      priority: 0.9,
    },

    // Dynamic routes
    ...blogUrls,
    ...projectUrls,
    ...serviceUrls,
  ];
}