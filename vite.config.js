import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vite'

import { copyFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

const rootDir = dirname(fileURLToPath(import.meta.url))

/**
 * GitHub Pages has no SPA fallback. Serving the same shell as 404.html lets
 * client routing run for deep links (e.g. /app/articles/999) so in-app
 * not-found UI still renders instead of GitHub’s static 404 page.
 */
function githubPagesSpaFallback() {
  let distDir
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      distDir = config.build.outDir
    },
    closeBundle() {
      const indexHtml = resolve(distDir, 'index.html')
      const notFoundHtml = resolve(distDir, '404.html')
      copyFileSync(indexHtml, notFoundHtml)
    },
  }
}

const sharedPlugins = [
  githubPagesSpaFallback(),
  tanstackRouter({
    autoCodeSplitting: true,
    routesDirectory: './src/app/routes',
    routeFileIgnorePattern: '.*\\.test\\.tsx',
  }),
  viteReact(),
  tailwindcss(),
]

const sharedResolve = {
  alias: {
    '@': resolve(rootDir, './src'),
  },
}

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: sharedPlugins,
  resolve: sharedResolve,
  test: {
    passWithNoTests: true,
    projects: [
      {
        plugins: sharedPlugins,
        resolve: sharedResolve,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts'],
          setupFiles: ['./src/testing/setup-unit.ts'],
        },
      },
      {
        plugins: sharedPlugins,
        resolve: sharedResolve,
        test: {
          name: 'browser',
          include: ['src/**/*.test.tsx'],
          setupFiles: ['./src/testing/setup-browser.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
