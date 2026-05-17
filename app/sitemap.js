import { blogPosts } from "@/lib/blogData";
import { projects } from "@/lib/projectsData";
import { servicesData } from "@/lib/servicesData";

export default function sitemap() {
  const baseUrl = "https://teravoltdigital.website";

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
    },

    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date().toISOString(),
    })),

    ...projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date().toISOString(),
    })),

    ...servicesData.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date().toISOString(),
    })),
  ];
}
