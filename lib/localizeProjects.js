export function localizeProjects(
  projects,
  translations
) {
  return projects.map((project) => {
    const translatedProject =
      translations?.[project.slug]

    if (
      !translatedProject ||
      typeof translatedProject !== 'object'
    ) {
      return project
    }

    return {
      ...project,

      title:
        translatedProject.title ||
        project.title,

      category:
        translatedProject.category ||
        project.category,

      excerpt:
        translatedProject.excerpt ||
        project.excerpt,

      description:
        translatedProject.description ||
        project.description,

      challenge:
        translatedProject.challenge ||
        project.challenge,

      solution:
        translatedProject.solution ||
        project.solution,

      readTime:
        translatedProject.readTime ||
        project.readTime,

      tags:
        Array.isArray(
          translatedProject.tags
        )
          ? translatedProject.tags
          : project.tags,
    }
  })
}