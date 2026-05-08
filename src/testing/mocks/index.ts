import { env } from '@/config/env'

export const enableMocking = async () => {
  if (!env.VITE_ENABLE_API_MOCKING) return

  const { worker } = await import('./browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}
