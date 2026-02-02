import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'api/index': 'api/index.ts'
  },
  format: ['esm'],
  dts: true,
  tsconfig: 'tsconfig.api.json',
  clean: false, // Don't clean - UI build outputs to same dist
  outDir: 'dist',
  external: ['hono', '@hono/zod-openapi', 'zod']
})
