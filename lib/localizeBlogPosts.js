export function localizeBlogPosts(
  posts,
  translations
) {
  return posts.map((post) => {
    const translatedPost =
      translations?.[post.slug]

    if (
      !translatedPost ||
      typeof translatedPost !== 'object'
    ) {
      return post
    }

    return {
      ...post,

      title:
        translatedPost.title ||
        post.title,

      excerpt:
        translatedPost.excerpt ||
        post.excerpt,

      content:
        translatedPost.content ||
        post.content,

      category:
        translatedPost.category ||
        post.category,

      tags:
        Array.isArray(
          translatedPost.tags
        )
          ? translatedPost.tags
          : post.tags,

      readTime:
        translatedPost.readTime ||
        post.readTime,
    }
  })
}