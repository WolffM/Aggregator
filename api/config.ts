import type { ProjectConfig } from './types'

export const PROJECTS: ProjectConfig[] = [
  // GitHub Projects
  {
    slug: 'pytorch',
    name: 'PyTorch',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'pytorch/pytorch',
    beginnerLabels: ['good first issue', 'bootcamp'],
    contributingUrl: 'https://github.com/pytorch/pytorch/blob/main/CONTRIBUTING.md',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'react',
    name: 'React',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'facebook/react',
    beginnerLabels: ['good first issue', 'Difficulty: starter'],
    contributingUrl: 'https://reactjs.org/docs/how-to-contribute.html',
    pool: ['web-dev', 'all']
  },
  {
    slug: 'nodejs',
    name: 'Node.js',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'nodejs/node',
    beginnerLabels: ['good first issue'],
    contributingUrl: 'https://github.com/nodejs/node/blob/main/CONTRIBUTING.md',
    pool: ['web-dev', 'all']
  },
  {
    slug: 'huggingface-transformers',
    name: 'Hugging Face Transformers',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'huggingface/transformers',
    beginnerLabels: ['Good First Issue', 'Good Second Issue'],
    contributingUrl: 'https://github.com/huggingface/transformers/blob/main/CONTRIBUTING.md',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'openlibrary',
    name: 'Internet Archive Open Library',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'internetarchive/openlibrary',
    beginnerLabels: ['Good First Issue', 'Hacktoberfest'],
    contributingUrl: 'https://github.com/internetarchive/openlibrary/blob/master/CONTRIBUTING.md',
    pool: ['web-dev', 'all']
  },
  {
    slug: 'tensorflow',
    name: 'TensorFlow',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'tensorflow/tensorflow',
    beginnerLabels: ['good first issue', 'stat:contribution welcome'],
    contributingUrl: 'https://github.com/tensorflow/tensorflow/blob/master/CONTRIBUTING.md',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'langchain',
    name: 'LangChain',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'langchain-ai/langchain',
    beginnerLabels: ['good first issue', 'help wanted'],
    contributingUrl: 'https://python.langchain.com/docs/contributing/',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'langchainjs',
    name: 'LangChain.js',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'langchain-ai/langchainjs',
    beginnerLabels: ['good first issue', 'help wanted'],
    contributingUrl: 'https://github.com/langchain-ai/langchainjs/blob/main/CONTRIBUTING.md',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'langgraphjs',
    name: 'LangGraph.js',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'langchain-ai/langgraphjs',
    beginnerLabels: ['good first issue', 'help wanted'],
    contributingUrl: 'https://github.com/langchain-ai/langgraphjs/blob/main/CONTRIBUTING.md',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'mastra',
    name: 'Mastra AI',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'mastra-ai/mastra',
    beginnerLabels: ['good first issue', 'help wanted'],
    contributingUrl: 'https://github.com/mastra-ai/mastra/blob/main/CONTRIBUTING.md',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'onnxruntime',
    name: 'ONNX Runtime',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'microsoft/onnxruntime',
    beginnerLabels: ['contributions welcome'],
    contributingUrl: 'https://github.com/microsoft/onnxruntime/blob/main/CONTRIBUTING.md',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'deepspeed',
    name: 'DeepSpeed',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'deepspeedai/DeepSpeed',
    beginnerLabels: ['good first issue', 'help wanted'],
    contributingUrl: 'https://github.com/deepspeedai/DeepSpeed/blob/master/CONTRIBUTING.md',
    pool: ['ml-ai', 'all']
  },
  {
    slug: 'dapr',
    name: 'Dapr',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'dapr/dapr',
    beginnerLabels: ['good first issue', 'help wanted'],
    contributingUrl: 'https://docs.dapr.io/contributing/',
    pool: ['web-dev', 'all']
  },
  {
    slug: 'vscode',
    name: 'Visual Studio Code',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'microsoft/vscode',
    beginnerLabels: ['good first issue', 'help wanted'],
    contributingUrl: 'https://github.com/microsoft/vscode/wiki/How-to-Contribute',
    pool: ['web-dev', 'all']
  },
  {
    slug: 'playwright',
    name: 'Playwright',
    platform: 'github',
    apiBase: 'https://api.github.com',
    projectId: 'microsoft/playwright',
    beginnerLabels: ['open-to-a-pull-request'],
    contributingUrl: 'https://github.com/microsoft/playwright/blob/main/CONTRIBUTING.md',
    pool: ['web-dev', 'all']
  },

  // GitLab Projects (VideoLAN instance)
  {
    slug: 'vlc',
    name: 'VLC Media Player',
    platform: 'gitlab',
    apiBase: 'https://code.videolan.org/api/v4',
    projectId: 'videolan/vlc',
    beginnerLabels: ['Difficulty::easy'],
    contributingUrl: 'https://wiki.videolan.org/Contribute/',
    pool: ['media', 'all']
  },

  // Gitea Projects (Blender instance)
  {
    slug: 'blender',
    name: 'Blender',
    platform: 'gitea',
    apiBase: 'https://projects.blender.org/api/v1',
    projectId: 'blender/blender',
    beginnerLabels: ['Good First Issue'],
    contributingUrl: 'https://developer.blender.org/docs/handbook/contributing/',
    pool: ['creative', 'all']
  },

  // Phabricator Projects (Wikimedia instance)
  {
    slug: 'mediawiki',
    name: 'MediaWiki',
    platform: 'phabricator',
    apiBase: 'https://phabricator.wikimedia.org/api',
    projectId: 'PHID-PROJ-onnxucoedheq3jevknyr',
    beginnerLabels: ['good first task'],
    contributingUrl: 'https://www.mediawiki.org/wiki/How_to_contribute',
    pool: ['web-dev', 'all']
  },

  // Bugzilla Projects (kernel.org)
  {
    slug: 'linux-kernel',
    name: 'Linux Kernel',
    platform: 'bugzilla',
    apiBase: 'https://bugzilla.kernel.org/rest',
    projectId: 'kernel', // Not used for Bugzilla, but required by type
    beginnerLabels: ['trivial'],
    contributingUrl: 'https://docs.kernel.org/process/submitting-patches.html',
    pool: ['systems', 'all']
  },

  // Trac Projects (FFmpeg)
  {
    slug: 'ffmpeg',
    name: 'FFmpeg',
    platform: 'trac',
    apiBase: 'https://trac.ffmpeg.org/query',
    projectId: 'ffmpeg', // Not used for Trac, but required by type
    beginnerLabels: ['easy'],
    contributingUrl: 'https://ffmpeg.org/developer.html',
    pool: ['media', 'all']
  }
]

export const POOLS = [
  { value: 'all', label: 'All Projects' },
  { value: 'ml-ai', label: 'ML / AI' },
  { value: 'web-dev', label: 'Web Development' },
  { value: 'creative', label: 'Creative Tools' },
  { value: 'media', label: 'Media / Video' },
  { value: 'systems', label: 'Systems / Kernel' }
]

export function getProjectsByPool(pool: string): ProjectConfig[] {
  if (pool === 'all') {
    return PROJECTS
  }
  return PROJECTS.filter(p => p.pool.includes(pool))
}

export function getProjectBySlug(slug: string): ProjectConfig | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
