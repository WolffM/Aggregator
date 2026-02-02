import type { Issue, ProjectConfig } from '../types'
import { scoreIssue } from '../scoring'
import { buildHeaders, checkApiResponse } from '../utils'

interface GiteaLabel {
  id: number
  name: string
  color: string
}

interface GiteaIssue {
  id: number
  number: number
  title: string
  body: string | null
  html_url: string
  labels: GiteaLabel[]
  created_at: string
  updated_at: string
  user: { login: string } | null
  pull_request?: unknown
}

function normalizeGiteaIssue(issue: GiteaIssue, config: ProjectConfig): Issue {
  const labels = issue.labels.map(l => l.name)

  const scoring = scoreIssue({
    title: issue.title,
    body: issue.body || undefined,
    labels,
    beginnerLabels: config.beginnerLabels
  })

  return {
    id: `gitea-${config.slug}-${issue.number}`,
    platform: 'gitea',
    project: config.name,
    title: issue.title,
    url: issue.html_url,
    difficulty: scoring.difficulty,
    difficultyScore: scoring.score,
    difficultySignals: scoring.signals,
    labels,
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    author: issue.user?.login ?? 'unknown'
  }
}

export async function fetchGiteaIssues(config: ProjectConfig): Promise<Issue[]> {
  const labels = config.beginnerLabels.join(',')
  const url = `${config.apiBase}/repos/${config.projectId}/issues?labels=${encodeURIComponent(labels)}&state=open&limit=50`

  const res = await fetch(url, { headers: buildHeaders() })
  checkApiResponse(res, 'Gitea')

  const data: GiteaIssue[] = await res.json()

  // Filter out pull requests if present
  const issues = data.filter(item => !item.pull_request)

  return issues.map(issue => normalizeGiteaIssue(issue, config))
}
