import type { Issue, ProjectConfig } from '../types'
import { scoreIssue } from '../scoring'
import { buildHeaders, checkApiResponse, parseDate } from '../utils'

interface PhabricatorTask {
  id: number
  phid: string
  fields: {
    name: string
    description?: { raw?: string }
    dateCreated: number
    dateModified: number
    authorPHID: string
    status: {
      value: string
      name: string
    }
  }
}

interface PhabricatorResponse {
  result: {
    data: PhabricatorTask[]
    cursor: {
      after: string | null
    }
  }
  error_code?: string
  error_info?: string
}

function normalizePhabricatorTask(task: PhabricatorTask, config: ProjectConfig): Issue {
  const taskUrl = `https://phabricator.wikimedia.org/T${task.id}`

  const scoring = scoreIssue({
    title: task.fields.name,
    body: task.fields.description?.raw || undefined,
    labels: config.beginnerLabels, // Phabricator tasks are fetched by project tag
    beginnerLabels: config.beginnerLabels
  })

  return {
    id: `phabricator-${config.slug}-${task.id}`,
    platform: 'phabricator',
    project: config.name,
    title: task.fields.name,
    url: taskUrl,
    difficulty: scoring.difficulty,
    difficultyScore: scoring.score,
    difficultySignals: scoring.signals,
    labels: config.beginnerLabels,
    createdAt: parseDate(task.fields.dateCreated),
    updatedAt: parseDate(task.fields.dateModified),
    author: task.fields.authorPHID
  }
}

export async function fetchPhabricatorIssues(
  config: ProjectConfig,
  token: string
): Promise<Issue[]> {
  const url = `${config.apiBase}/maniphest.search`

  // Phabricator uses POST with form-encoded data
  const params = new URLSearchParams()
  params.append('api.token', token)
  params.append('constraints[projects][0]', config.projectId)
  params.append('constraints[statuses][0]', 'open')
  params.append('limit', '100')

  const res = await fetch(url, {
    method: 'POST',
    headers: buildHeaders({ accept: 'application/json' }),
    body: params.toString()
  })
  checkApiResponse(res, 'Phabricator')

  const data: PhabricatorResponse = await res.json()

  if (data.error_code) {
    throw new Error(`Phabricator API error: ${data.error_code} - ${data.error_info}`)
  }

  return data.result.data.map(task => normalizePhabricatorTask(task, config))
}
