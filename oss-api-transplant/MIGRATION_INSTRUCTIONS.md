# OSS Aggregator API Migration - COMPLETED

> **Status**: Migration completed. This document is now a reference for hadoku-site integration.

## What Was Done

The API module was migrated into `@wolffm/oss-aggregator` as a subpath export (`/api`).

**Package structure:**

```
@wolffm/oss-aggregator
├── dist/index.js      # UI bundle (React)
├── dist/style.css     # Styles
└── dist/api/index.js  # API bundle (Hono)
```

**Exports:**

- `@wolffm/oss-aggregator` - UI components
- `@wolffm/oss-aggregator/api` - API handler
- `@wolffm/oss-aggregator/style.css` - Styles

---

## hadoku-site Integration

### 1. Update dependency

```bash
pnpm update @wolffm/oss-aggregator
```

### 2. Replace worker code

```typescript
// workers/oss-issues-api/src/index.ts
import { createOSSHandler } from '@wolffm/oss-aggregator/api'

const app = createOSSHandler('/oss/api')

export default app
```

### 3. Configure wrangler.toml

```toml
name = "oss-issues-api"
main = "src/index.ts"

[[kv_namespaces]]
binding = "CACHE_KV"
id = "your-kv-namespace-id"
```

### 4. Set secrets

```bash
wrangler secret put GITHUB_TOKEN
wrangler secret put PHABRICATOR_TOKEN  # if using Phabricator
```

---

## Learnings & Corrections

### What the original instructions got wrong:

1. **Separate `./types` export was unnecessary**
   - Types are already exported from `./api`
   - Removed to simplify the package

2. **ESLint configuration was missing**
   - API code uses Cloudflare Workers globals (`fetch`, `KVNamespace`, etc.)
   - Had to add a separate ESLint config block with these globals
   - Had to add `tsconfig: 'tsconfig.api.json'` to tsup config for DTS generation

3. **tsup needs explicit tsconfig**
   - Without `tsconfig: 'tsconfig.api.json'`, DTS build fails
   - `KVNamespace` type comes from `@cloudflare/workers-types`

### What worked well:

1. **Single package with subpath exports** is cleaner than two packages
   - UI and API share types
   - One version to track
   - Simpler CI/CD

2. **tsup for API bundling** works great alongside Vite for UI
   - `clean: false` prevents overwriting UI build output

3. **Existing publish workflow needed minimal changes**
   - Just added `api/` to change detection pattern

### Files created/modified:

| File                | Action   | Purpose                          |
| ------------------- | -------- | -------------------------------- |
| `api/`              | Created  | API module (copied from here)    |
| `tsconfig.api.json` | Created  | TypeScript config for API        |
| `tsup.config.ts`    | Created  | Build config for API bundling    |
| `eslint.config.js`  | Modified | Added API + config file rules    |
| `package.json`      | Modified | Added deps, scripts, exports     |
| `publish.yml`       | Modified | Added `api/` to change detection |

### Code fixes required:

1. **Exhaustive switch default** - Changed from template literal with `never` to `String(_exhaustiveCheck)`
2. **Inferrable type annotation** - Removed redundant `: string` from default parameter

---

## Cleanup

The `oss-api-transplant/` folder can be deleted after hadoku-site integration is complete. The canonical API code now lives in `api/`.
