import { handlers as accountHandlers } from './accounts'
import { handlers as articleHandlers } from './articles'
import { handlers as authHandlers } from './auth'
export const handlers = [
  ...authHandlers,
  ...accountHandlers,
  ...articleHandlers,
]
