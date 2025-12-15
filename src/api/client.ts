import type { IssuesResponse, ProjectsResponse, ProjectIssuesResponse } from './types'

// Base URL for API calls
// In production: https://hadoku.me/oss/api
// In development: http://localhost:8787/oss/api (if running worker locally)
const API_BASE =
  (import.meta.env.VITE_API_BASE as string | undefined) || 'https://hadoku.me/oss/api'

class OssIssuesClient {
  private baseUrl: string

  constructor(baseUrl = API_BASE) {
    this.baseUrl = baseUrl
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`)

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({ error: 'Unknown error' }))) as {
        error?: string
      }
      throw new Error(errorData.error ?? `HTTP ${response.status}`)
    }

    return response.json() as Promise<T>
  }

  /**
   * Fetch all available projects and pools
   */
  async getProjects(): Promise<ProjectsResponse> {
    return this.fetch<ProjectsResponse>('/projects')
  }

  /**
   * Fetch issues for a specific pool
   * @param pool - Pool to fetch issues for (all, ml-ai, web-dev, creative, media)
   */
  async getIssues(pool = 'all'): Promise<IssuesResponse> {
    return this.fetch<IssuesResponse>(`/issues?pool=${encodeURIComponent(pool)}`)
  }

  /**
   * Fetch issues for a specific project
   * @param slug - Project slug (e.g., 'pytorch', 'react')
   */
  async getProjectIssues(slug: string): Promise<ProjectIssuesResponse> {
    return this.fetch<ProjectIssuesResponse>(`/issues/${encodeURIComponent(slug)}`)
  }

  /**
   * Health check
   */
  async health(): Promise<{ status: string }> {
    return this.fetch('/health')
  }
}

// Singleton instance
export const ossIssuesClient = new OssIssuesClient()

// Export class for custom instances
export { OssIssuesClient }
