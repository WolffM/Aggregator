export type Platform = 'github' | 'gitlab' | 'gitea' | 'phabricator'
export type Difficulty = 'beginner' | 'intermediate' | 'unknown'

export interface Issue {
  id: string
  platform: Platform
  project: string
  title: string
  url: string
  difficulty: Difficulty
  labels: string[]
  createdAt: string
  updatedAt: string
  author: string
}

export interface Project {
  slug: string
  name: string
  platform: Platform
  pools: string[]
  contributingUrl: string
}

export interface Pool {
  value: string
  label: string
}

export interface IssuesResponse {
  data: {
    issues: Issue[]
    pool: string
    projectCount: number
    issueCount: number
    errors?: { project: string; error: string }[]
  }
  timestamp: string
}

export interface ProjectsResponse {
  data: {
    projects: Project[]
    pools: Pool[]
  }
  timestamp: string
}

export interface ProjectIssuesResponse {
  data: {
    issues: Issue[]
    project: string
  }
  timestamp: string
}
