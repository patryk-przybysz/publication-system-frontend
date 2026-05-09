import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

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

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [
    githubPagesSpaFallback(),
    tanstackRouter({
      autoCodeSplitting: true,
      routesDirectory: './src/app/routes',
      routeFileIgnorePattern: '.*\\.test\\.tsx',
    }),
    viteReact(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/testing/setup-tests.ts'],
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
