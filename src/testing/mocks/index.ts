import { env } from '@/config/env'

export const enableMocking = async () => {
  if (!env.VITE_ENABLE_API_MOCKING) return

  const { worker } = await import('./browser')
  const baseUrl = import.meta.env.BASE_URL
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: `${baseUrl}mockServiceWorker.js`,
      options: { scope: baseUrl },
    },
  })
}
