import type { Issue, ProjectConfig } from '../types'
import { scoreIssue } from '../scoring'
import { buildHeaders, checkApiResponse } from '../utils'

interface GitLabIssue {
  id: number
  iid: number
  title: string
  description: string | null
  web_url: string
  labels: string[]
  created_at: string
  updated_at: string
  author: { username: string } | null
}

function normalizeGitLabIssue(issue: GitLabIssue, config: ProjectConfig): Issue {
  const scoring = scoreIssue({
    title: issue.title,
    body: issue.description || undefined,
    labels: issue.labels,
    beginnerLabels: config.beginnerLabels
  })

  return {
    id: `gitlab-${config.slug}-${issue.iid}`,
    platform: 'gitlab',
    project: config.name,
    title: issue.title,
    url: issue.web_url,
    difficulty: scoring.difficulty,
    difficultyScore: scoring.score,
    difficultySignals: scoring.signals,
    labels: issue.labels,
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    author: issue.author?.username ?? 'unknown'
  }
}

export async function fetchGitLabIssues(config: ProjectConfig): Promise<Issue[]> {
  const projectId = encodeURIComponent(config.projectId)
  const labels = config.beginnerLabels.join(',')
  const url = `${config.apiBase}/projects/${projectId}/issues?labels=${encodeURIComponent(labels)}&state=opened&per_page=100`

  const res = await fetch(url, { headers: buildHeaders() })
  checkApiResponse(res, 'GitLab')

  const data: GitLabIssue[] = await res.json()

  return data.map(issue => normalizeGitLabIssue(issue, config))
}
