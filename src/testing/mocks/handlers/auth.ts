import { http, HttpResponse } from 'msw'

import { env } from '@/config/env'
import type { User } from '@/types/api'

import { db } from '../db'
import { delay, parseBasicAuth, unauthorized } from '../utils'

export const handlers = [
  http.post(`${env.VITE_API_URL}/auth/register`, async ({ request }) => {
    await delay()
    const body = (await request.json()) as {
      username: string
      password: string
      birth: string
    }
    if (db.users.findFirst((q) => q.where({ username: body.username }))) {
      return HttpResponse.json(
        { message: 'The user already exists' },
        { status: 400 },
      )
    }

    await db.users.create({
      username: body.username,
      verified: false,
      role: 'USER',
      subscriptionLevel: 'FREE',
      birth: body.birth,
      createdAt: new Date().toISOString(),
      password: body.password,
    } satisfies User & { password: string })

    return HttpResponse.json({}, { status: 200 })
  }),

  http.get(`${env.VITE_API_URL}/auth/check`, async ({ request }) => {
    await delay()
    const auth = parseBasicAuth(request.headers.get('authorization'))
    if (!auth) return unauthorized()
    const [username, password] = auth.split(':')
    const user = db.users.findFirst((q) => q.where({ username }))
    if (!user || user.password !== password) return unauthorized()
    const { password: _password, ...safeUser } = user
    return HttpResponse.json(safeUser)
  }),
]
