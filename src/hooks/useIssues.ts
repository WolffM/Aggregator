import { useState, useEffect, useCallback, useRef } from 'react'
import { logger } from '@wolffm/task-ui-components'
import { ossIssuesClient } from '../api/client'
import type { Issue } from '../api/types'

interface FetchError {
  project: string
  error: string
}

interface UseIssuesResult {
  issues: Issue[]
  isLoading: boolean
  error: string | null
  fetchErrors: FetchError[]
  projectCount: number
  issueCount: number
  lastFetched: Date | null
  refetch: () => Promise<void>
}

interface CacheEntry {
  issues: Issue[]
  fetchErrors: FetchError[]
  projectCount: number
  issueCount: number
  timestamp: number
}

// Cache duration: 4 minutes
const CACHE_MAX_AGE = 4 * 60 * 1000

// In-memory cache
const cache = new Map<string, CacheEntry>()

function isCacheFresh(entry: CacheEntry): boolean {
  return Date.now() - entry.timestamp < CACHE_MAX_AGE
}

export function useIssues(pool = 'all'): UseIssuesResult {
  const [issues, setIssues] = useState<Issue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fetchErrors, setFetchErrors] = useState<FetchError[]>([])
  const [projectCount, setProjectCount] = useState(0)
  const [issueCount, setIssueCount] = useState(0)
  const [lastFetched, setLastFetched] = useState<Date | null>(null)

  // Track current pool to avoid race conditions
  const currentPoolRef = useRef(pool)
  currentPoolRef.current = pool

  const fetchIssues = useCallback(
    async (forceRefresh = false) => {
      const cacheKey = pool

      // Check cache first (unless forcing refresh)
      if (!forceRefresh) {
        const cached = cache.get(cacheKey)
        if (cached && isCacheFresh(cached)) {
          setIssues(cached.issues)
          setFetchErrors(cached.fetchErrors)
          setProjectCount(cached.projectCount)
          setIssueCount(cached.issueCount)
          setLastFetched(new Date(cached.timestamp))
          setIsLoading(false)
          logger.info('[useIssues] Using cached data', {
            pool,
            issueCount: cached.issueCount
          })
          return
        }
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await ossIssuesClient.getIssues(pool)

        // Only update state if this is still the current pool
        if (currentPoolRef.current === pool) {
          const now = Date.now()
          setIssues(response.data.issues)
          setFetchErrors(response.data.errors ?? [])
          setProjectCount(response.data.projectCount)
          setIssueCount(response.data.issueCount)
          setLastFetched(new Date(now))

          // Update cache
          cache.set(cacheKey, {
            issues: response.data.issues,
            fetchErrors: response.data.errors ?? [],
            projectCount: response.data.projectCount,
            issueCount: response.data.issueCount,
            timestamp: now
          })

          logger.info('[useIssues] Fetched issues successfully', {
            pool,
            issueCount: response.data.issueCount,
            projectCount: response.data.projectCount,
            errorCount: response.data.errors?.length ?? 0
          })
        }
      } catch (err) {
        if (currentPoolRef.current === pool) {
          const message = err instanceof Error ? err.message : 'Failed to fetch issues'
          setError(message)
          logger.error('[useIssues] Failed to fetch issues', { error: String(err) })
        }
      } finally {
        if (currentPoolRef.current === pool) {
          setIsLoading(false)
        }
      }
    },
    [pool]
  )

  // Fetch when pool changes
  useEffect(() => {
    void fetchIssues()
  }, [fetchIssues])

  const refetch = useCallback(async () => {
    await fetchIssues(true)
  }, [fetchIssues])

  return {
    issues,
    isLoading,
    error,
    fetchErrors,
    projectCount,
    issueCount,
    lastFetched,
    refetch
  }
}
