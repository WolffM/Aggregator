import { useState, useEffect, useCallback } from 'react'
import { logger } from '@wolffm/task-ui-components'
import { ossIssuesClient } from '../api/client'
import type { Project, Pool } from '../api/types'

interface UseProjectsResult {
  projects: Project[]
  pools: Pool[]
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([])
  const [pools, setPools] = useState<Pool[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await ossIssuesClient.getProjects()
      setProjects(response.data.projects)
      setPools(response.data.pools)
      logger.info('[useProjects] Fetched projects successfully', {
        projectCount: response.data.projects.length,
        poolCount: response.data.pools.length
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch projects'
      setError(message)
      logger.error('[useProjects] Failed to fetch projects', { error: String(err) })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchProjects()
  }, [fetchProjects])

  return {
    projects,
    pools,
    isLoading,
    error,
    refetch: fetchProjects
  }
}
