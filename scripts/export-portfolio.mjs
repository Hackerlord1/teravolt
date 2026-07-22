import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { pathToFileURL } from 'node:url'

const ROOT = process.cwd()

const INPUT_FILE = path.join(
  ROOT,
  'lib',
  'projectsData.js'
)

const OUTPUT_FILE = path.join(
  ROOT,
  'locales',
  'en',
  'portfolio.json'
)

async function main() {
  const moduleUrl =
    pathToFileURL(INPUT_FILE).href

  const { projects } =
    await import(moduleUrl)

  if (!Array.isArray(projects)) {
    throw new Error(
      'lib/projectsData.js does not export a projects array.'
    )
  }

  const translatedProjects = {}

  for (const project of projects) {
    if (!project.slug) {
      throw new Error(
        `Project ${project.id ?? 'unknown'} has no slug.`
      )
    }

    translatedProjects[project.slug] = {
      title: project.title ?? '',
      category: project.category ?? '',
      excerpt: project.excerpt ?? '',
      description:
        typeof project.description === 'string'
          ? project.description.trim()
          : '',
      challenge:
        typeof project.challenge === 'string'
          ? project.challenge.trim()
          : '',
      solution:
        typeof project.solution === 'string'
          ? project.solution.trim()
          : '',
      readTime: project.readTime ?? '',
      tags: Array.isArray(project.tags)
        ? project.tags
        : [],
    }
  }

  const output = {
    listing: {
      open_navigation:
        'Open project navigation',
      projects: 'Projects',
      section_label: '// Our Work',
      title: 'Featured',
      title_highlight: 'Works',
      subtitle:
        'A curated selection of our best projects — let the work speak for itself.',
      all: 'All',
      project_count_one:
        '{{count}} project',
      project_count_other:
        '{{count}} projects',
      empty:
        'No projects in this category yet.'
    },

    card: {
      featured_project:
        'Featured Project',
      visit_site: 'Visit Site ↗',
      view_project: 'View Project →',
      details: 'Details'
    },

    detail: {
      back_to_portfolio:
        'Back to Portfolio',
      view_live_site:
        'View Live Site ↗',
      github: 'GitHub →',
      overview: 'Project Overview',
      challenge: 'The Challenge',
      solution: 'Our Solution',
      screenshots: 'Screenshots',
      screenshot_alt:
        '{{title}} screenshot {{number}}',
      tech_stack: 'Tech Stack',
      related_projects:
        'Related Projects'
    },

    sidebar: {
      close:
        'Close project navigation',
      projects: 'Projects',
      categories: 'Categories',
      back_to_home: 'Back to Home'
    },

    projects: translatedProjects
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
    `Exported ${projects.length} portfolio projects.`
  )

  console.log(
    `Saved: ${path.relative(
      ROOT,
      OUTPUT_FILE
    )}`
  )
}

main().catch((error) => {
  console.error(
    'Portfolio export failed:'
  )
  console.error(error)
  process.exitCode = 1
})