import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

const projectRoot = process.cwd();

const inputPath = path.join(
  projectRoot,
  "lib",
  "blogData.js"
);

const outputDirectory = path.join(
  projectRoot,
  "locales",
  "en"
);

const outputPath = path.join(
  outputDirectory,
  "blog-posts.json"
);

async function loadBlogPosts() {
  const moduleUrl = new URL(
    `../lib/blogData.js?time=${Date.now()}`,
    import.meta.url
  );

  const blogModule = await import(moduleUrl.href);

  if (!Array.isArray(blogModule.blogPosts)) {
    throw new Error(
      "The blogData.js module does not export a blogPosts array."
    );
  }

  return blogModule.blogPosts;
}

function createTranslationObject(posts) {
  const output = {};

  for (const post of posts) {
    if (!post.slug) {
      throw new Error(
        `Blog post ${post.id ?? "unknown"} does not have a slug.`
      );
    }

    output[post.slug] = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      readTime: post.readTime,
    };
  }

  return output;
}

async function main() {
  console.log("Loading blog posts from lib/blogData.js...");

  const posts = await loadBlogPosts();

  console.log(`Found ${posts.length} blog posts.`);

  const translations = createTranslationObject(posts);

  await fs.mkdir(outputDirectory, {
    recursive: true,
  });

  await fs.writeFile(
    outputPath,
    `${JSON.stringify(translations, null, 2)}\n`,
    "utf8"
  );

  console.log(`Created ${outputPath}`);
}

main().catch((error) => {
  console.error("Blog export failed:");
  console.error(error.message);
  process.exitCode = 1;
});