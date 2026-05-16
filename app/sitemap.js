import { blogPosts } from "@/lib/blogData";
import { projects } from "@/lib/projectsData";
import { servicesData } from "@/lib/servicesData";

export default function sitemap() {
  const baseUrl = "https://www.teravoltdigital.website";

  // Blog URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  // Portfolio URLs
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
  }));

  // Services URLs
  const serviceUrls = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
    },

    ...blogUrls,
    ...projectUrls,
    ...serviceUrls,
  ];
}