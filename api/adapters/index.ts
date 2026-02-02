import type { Issue, ProjectConfig, OSSEnv, CachedIssues } from '../types'
import { fetchGitHubIssues } from './github'
import { fetchGitLabIssues } from './gitlab'
import { fetchGiteaIssues } from './gitea'
import { fetchPhabricatorIssues } from './phabricator'
import { fetchBugzillaIssues } from './bugzilla'
import { fetchTracIssues } from './trac'

/**
 * Try to get cached issues from KV for blocked platforms (bugzilla, trac).
 * These sites block Cloudflare Worker IPs, so we cache data via GitHub Actions.
 */
async function getCachedIssues(slug: string, env: OSSEnv): Promise<Issue[] | null> {
  if (!env.CACHE_KV) return null

  try {
    const cached = await env.CACHE_KV.get<CachedIssues>(`cached:${slug}`, 'json')
    if (cached?.issues) {
      console.log(`Using cached data for ${slug} (cached at ${cached.cachedAt})`)
      return cached.issues
    }
  } catch (err) {
    console.error(`Failed to read cache for ${slug}:`, err)
  }

  return null
}

export async function fetchIssuesForProject(config: ProjectConfig, env: OSSEnv): Promise<Issue[]> {
  switch (config.platform) {
    case 'github':
      return fetchGitHubIssues(config, env.GITHUB_TOKEN)

    case 'gitlab':
      return fetchGitLabIssues(config)

    case 'gitea':
      return fetchGiteaIssues(config)

    case 'phabricator':
      if (!env.PHABRICATOR_TOKEN) {
        throw new Error('PHABRICATOR_TOKEN is required for Phabricator API')
      }
      return fetchPhabricatorIssues(config, env.PHABRICATOR_TOKEN)

    case 'bugzilla': {
      // Try cache first (kernel.org blocks CF Worker IPs)
      const cached = await getCachedIssues(config.slug, env)
      if (cached) return cached
      // Fallback to direct fetch (may fail in production)
      return fetchBugzillaIssues(config)
    }

    case 'trac': {
      // Try cache first (ffmpeg.org blocks CF Worker IPs)
      const cached = await getCachedIssues(config.slug, env)
      if (cached) return cached
      // Fallback to direct fetch (may fail in production)
      return fetchTracIssues(config)
    }

    default: {
      const _exhaustiveCheck: never = config.platform
      throw new Error(`Unknown platform: ${String(_exhaustiveCheck)}`)
    }
  }
}

export { fetchGitHubIssues } from './github'
export { fetchGitLabIssues } from './gitlab'
export { fetchGiteaIssues } from './gitea'
export { fetchPhabricatorIssues } from './phabricator'
export { fetchBugzillaIssues } from './bugzilla'
export { fetchTracIssues } from './trac'
