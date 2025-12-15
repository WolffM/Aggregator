import { useState, useMemo } from 'react'
import type { Project } from '../api/types'

interface ProjectSelectorProps {
  projects: Project[]
  selectedProjects: string[]
  onSelectionChange: (slugs: string[]) => void
  disabled?: boolean
}

export function ProjectSelector({
  projects,
  selectedProjects,
  onSelectionChange,
  disabled
}: ProjectSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects
    const query = searchQuery.toLowerCase()
    return projects.filter(p => p.name.toLowerCase().includes(query))
  }, [projects, searchQuery])

  const handleToggle = (slug: string) => {
    if (selectedProjects.includes(slug)) {
      onSelectionChange(selectedProjects.filter(s => s !== slug))
    } else {
      onSelectionChange([...selectedProjects, slug])
    }
  }

  const handleSelectAll = () => {
    onSelectionChange(projects.map(p => p.slug))
  }

  const handleClearAll = () => {
    onSelectionChange([])
  }

  return (
    <div className="project-selector">
      <div className="project-selector__header">
        <input
          type="text"
          className="project-selector__search"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          disabled={disabled}
        />
        <div className="project-selector__actions">
          <button
            type="button"
            className="project-selector__action"
            onClick={handleSelectAll}
            disabled={disabled}
          >
            All
          </button>
          <button
            type="button"
            className="project-selector__action"
            onClick={handleClearAll}
            disabled={disabled}
          >
            None
          </button>
        </div>
      </div>

      <div className="project-selector__list">
        {filteredProjects.map(project => (
          <label
            key={project.slug}
            className={`project-selector__item ${selectedProjects.includes(project.slug) ? 'project-selector__item--selected' : ''}`}
          >
            <input
              type="checkbox"
              className="project-selector__checkbox"
              checked={selectedProjects.includes(project.slug)}
              onChange={() => handleToggle(project.slug)}
              disabled={disabled}
            />
            <span className="project-selector__name">{project.name}</span>
          </label>
        ))}
      </div>

      <div className="project-selector__count">
        {selectedProjects.length} of {projects.length} selected
      </div>
    </div>
  )
}
