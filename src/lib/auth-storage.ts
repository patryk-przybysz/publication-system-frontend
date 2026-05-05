type AuthStorageCredentials = {
  username: string
  password: string
}

const AUTH_STORAGE_KEY = 'user-credentials'

export const authStorage = {
  get: (): AuthStorageCredentials | null => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      return stored ? (JSON.parse(stored) as AuthStorageCredentials) : null
    } catch {
      return null
    }
  },
  set: (credentials: AuthStorageCredentials): void => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(credentials))
  },
  remove: () => localStorage.removeItem(AUTH_STORAGE_KEY),
  getAuthHeader: (): string | null => {
    const credentials = authStorage.get()
    if (!credentials) return null

    const encoded = btoa(`${credentials.username}:${credentials.password}`)
    return `Basic ${encoded}`
  },
}
