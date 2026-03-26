import { projects, featuredProject } from '@/lib/projectsData'
import ProjectSidebar from '@/components/portfolio/ProjectSidebar'
import ProjectFeatured from '@/components/portfolio/ProjectFeatured'
import ProjectCard from '@/components/portfolio/ProjectCard'

export default function PortfolioPage() {
  const regularProjects = projects.filter((p) => !p.featured)

  return (
    <div className="blog-page">

      {/* Sidebar */}
      <ProjectSidebar projects={projects} />

      {/* Main */}
      <main className="blog-content">

        {/* Header */}
        <div className="blog-page-header">
          <p className="section-label">// Our Work</p>
          <h1 className="blog-page-title">
            Featured <span>Works</span>
          </h1>
          <p className="blog-page-subtitle">
            A curated selection of web development, UI/UX design,
            branding, and mobile app projects from the Teravolt studio.
          </p>

          
        </div>

        {/* Featured project */}
        <ProjectFeatured project={featuredProject} />

        {/* Grid header */}
        <div className="blog-grid-header">
          <p className="blog-grid-label">All Projects</p>
          <span className="blog-grid-count">
            {regularProjects.length} projects
          </span>
        </div>

        {/* Grid */}
        <div className="blog-grid">
          {regularProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </main>
    </div>
  )
}