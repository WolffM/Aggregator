# OSS Issue Aggregator

> A dashboard to discover beginner-friendly issues across popular open source projects

Find your first open source contribution! This dashboard aggregates beginner-friendly issues from popular open source projects, making it easy to discover opportunities to contribute.

**Live at:** [hadoku.me/aggregator](https://hadoku.me/aggregator)

## Features

- **Multi-Project View**: Browse issues from 20+ major open source projects
- **Project Selection**: Choose which projects to display with multi-select checkboxes
- **Difficulty Indicators**: Issues tagged as beginner, intermediate, or unknown
- **Multi-Platform**: GitHub, GitLab, Gitea, Phabricator, Bugzilla, and Trac projects
- **Beautiful Themes**: 16 light/dark theme options
- **Responsive Design**: Works on desktop and mobile
- **Smart Caching**: Fast loading with 4-minute client-side cache

## Package Exports

This package provides both UI components and API logic:

```typescript
// UI components (React)
import { OSSAggregator } from '@wolffm/oss-aggregator'
import '@wolffm/oss-aggregator/style.css'

// API handler (Cloudflare Workers)
import { createOSSHandler, type OSSEnv } from '@wolffm/oss-aggregator/api'
```

## Supported Projects

| Project                   | Platform    | Category |
| ------------------------- | ----------- | -------- |
| MediaWiki                 | Phabricator | Web Dev  |
| Blender                   | Gitea       | Creative |
| Node.js                   | GitHub      | Web Dev  |
| PyTorch                   | GitHub      | ML/AI    |
| React                     | GitHub      | Web Dev  |
| Hugging Face Transformers | GitHub      | ML/AI    |
| Open Library              | GitHub      | Web Dev  |
| Krita                     | GitLab      | Creative |
| VLC Media Player          | GitLab      | Media    |
| Linux Kernel              | Bugzilla    | Systems  |
| FFmpeg                    | Trac        | Media    |
| ...and more               |             |          |

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build (UI + API)
pnpm build

# Lint
pnpm lint
```

### Build Output

The build produces:

```
dist/
├── index.js          # UI bundle (React components)
├── style.css         # UI styles
└── api/
    └── index.js      # API bundle (Hono handler)
```

## API Usage

### For Cloudflare Workers

```typescript
import { createOSSHandler, type OSSEnv } from '@wolffm/oss-aggregator/api'

// Create handler with base path
const app = createOSSHandler('/oss/api')

export default app
```

### Environment Variables

| Variable            | Required    | Description                            |
| ------------------- | ----------- | -------------------------------------- |
| `GITHUB_TOKEN`      | Recommended | GitHub PAT for higher rate limits      |
| `PHABRICATOR_TOKEN` | Optional    | API token for Phabricator projects     |
| `CACHE_KV`          | Optional    | KV namespace for caching blocked sites |

### API Endpoints

| Method | Endpoint                 | Description                           |
| ------ | ------------------------ | ------------------------------------- |
| GET    | `/health`                | Health check                          |
| GET    | `/projects`              | List all projects with pools          |
| GET    | `/projects/:slug/issues` | Get issues for a specific project     |
| GET    | `/issues?pool=:pool`     | Get issues for all projects in a pool |
| GET    | `/openapi.json`          | OpenAPI specification                 |
| POST   | `/issues/:id/mark`       | Mark an issue (ignored/process)       |
| DELETE | `/issues/:id/mark`       | Unmark an issue                       |
| GET    | `/marked?status=:status` | Get marked issues                     |

### Programmatic Access

For direct access without HTTP:

```typescript
import { createOSSFetcher } from '@wolffm/oss-aggregator/api'

const fetcher = createOSSFetcher(env)
const issues = await fetcher.fetchIssuesByPool('web-dev')
const projects = fetcher.getProjects()
```

## Versioning

This package uses automatic versioning with dual safeguards:

1. **Pre-commit Hook** (Primary): Bumps patch version when code changes are committed
2. **Workflow Check** (Safety Net): Checks registry and bumps if version exists

Version format: `major.minor.patch` with automatic rollover at `.20`.

## License

MIT
