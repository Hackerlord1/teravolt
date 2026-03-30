'use client'
import { useState } from 'react'
import { projects, featuredProject, projectCategories } from '@/lib/projectsData'
import ProjectSidebar from '@/components/portfolio/ProjectSidebar'
import ProjectFeatured from '@/components/portfolio/ProjectFeatured'
import ProjectCard from '@/components/portfolio/ProjectCard'

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const regularProjects = projects.filter((p) => !p.featured)
  const filteredProjects =
    activeFilter === 'All'
      ? regularProjects
      : regularProjects.filter((p) => p.category === activeFilter)

  return (
    <div className="blog-page">

      {/* Mobile Sidebar Toggle */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open project navigation"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="18" y2="18" />
        </svg>
        <span>Projects</span>
      </button>

      {/* Sidebar */}
      <ProjectSidebar
        projects={projects}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <main className="blog-content">

        {/* Header */}
        <div className="blog-page-header">
          <p className="section-label">// Our Work</p>
          <h1 className="blog-page-title">
            Featured <span>Works</span>
          </h1>
          <p className="blog-page-subtitle">
            A curated selection of our best projects — let the work speak for itself.
          </p>
        </div>

        {/* Featured project */}
        <ProjectFeatured project={featuredProject} />

        {/* Filter Tabs + Count */}
        <div className="pf-section-header">
          <div className="pf-filters">
            <button
              className={`pf-filter-tab ${activeFilter === 'All' ? 'pf-filter-tab--active' : ''}`}
              onClick={() => setActiveFilter('All')}
            >
              All
            </button>
            {projectCategories.map((cat) => (
              <button
                key={cat}
                className={`pf-filter-tab ${activeFilter === cat ? 'pf-filter-tab--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="pf-count">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Grid */}
        <div className="pf-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="pf-empty">
            <p>No projects in this category yet.</p>
          </div>
        )}

      </main>
    </div>
  )
}