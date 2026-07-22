import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()

const INPUT_FILE = path.join(
  ROOT,
  'lib',
  'blogData.js'
)

const OUTPUT_FILE = path.join(
  ROOT,
  'locales',
  'en',
  'blog-posts.json'
)

async function main() {
  const moduleUrl =
    pathToFileURL(INPUT_FILE).href

  const { blogPosts } =
    await import(moduleUrl)

  if (!Array.isArray(blogPosts)) {
    throw new Error(
      'lib/blogData.js does not export a blogPosts array.'
    )
  }

  const output = {}

  for (const post of blogPosts) {
    if (!post.slug) {
      throw new Error(
        `Blog post ${post.id ?? 'unknown'} has no slug.`
      )
    }

    output[post.slug] = {
      title: post.title ?? '',
      excerpt: post.excerpt ?? '',
      content:
        typeof post.content === 'string'
          ? post.content.trim()
          : '',
      category: post.category ?? '',
      tags: Array.isArray(post.tags)
        ? post.tags
        : [],
      readTime: post.readTime ?? '',
    }
  }

  await fs.mkdir(
    path.dirname(OUTPUT_FILE),
    {
      recursive: true,
    }
  )

  await fs.writeFile(
    OUTPUT_FILE,
    `${JSON.stringify(output, null, 2)}\n`,
    'utf8'
  )

  console.log(
    `Exported ${blogPosts.length} blog posts.`
  )

  console.log(
    `Saved: ${path.relative(
      ROOT,
      OUTPUT_FILE
    )}`
  )
}

main().catch((error) => {
  console.error('Blog export failed:')
  console.error(error)
  process.exitCode = 1
})