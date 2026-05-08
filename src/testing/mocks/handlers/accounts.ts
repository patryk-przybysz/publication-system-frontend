import { http, HttpResponse } from 'msw'

import { env } from '@/config/env'
import type { AccountPublicDetails, AccountSummary, User } from '@/types/api'

import { db } from '../db'
import { delay, getAgeFromBirth, unauthorized } from '../utils'

const toPublicDetails = (user: User): AccountPublicDetails => ({
  username: user.username,
  verified: user.verified,
  role: user.role,
  subscriptionLevel: user.subscriptionLevel,
  adult: getAgeFromBirth(user.birth) >= 18,
  membership: '2 years',
})

export const handlers = [
  http.get(`${env.VITE_API_URL}/accounts`, async () => {
    await delay()
    return HttpResponse.json(
      db.users.findMany().map(
        (user) =>
          ({
            username: user.username,
          }) satisfies AccountSummary,
      ),
    )
  }),

  http.get(`${env.VITE_API_URL}/accounts/details`, async () => {
    await delay()
    return HttpResponse.json(db.users.findMany().map(toPublicDetails))
  }),

  http.get(
    `${env.VITE_API_URL}/accounts/:username`,
    async ({ params, request }) => {
      await delay()
      if (!request.headers.get('authorization')) return unauthorized()
      const account = db.users.findFirst((q) =>
        q.where({ username: String(params.username) }),
      )
      if (!account)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 })

      return HttpResponse.json({
        username: account.username,
        verified: account.verified,
        role: account.role,
        subscriptionLevel: account.subscriptionLevel,
        adult: getAgeFromBirth(account.birth) >= 18,
        membership: '2 years',
      })
    },
  ),

  http.patch(
    `${env.VITE_API_URL}/accounts/:username`,
    async ({ params, request }) => {
      await delay()
      const body = (await request.json()) as { birth: string }
      const account = db.users.findFirst((q) =>
        q.where({ username: String(params.username) }),
      )
      if (!account)
        return HttpResponse.json({ message: 'Not found' }, { status: 404 })
      await db.users.update((q) => q.where({ username: account.username }), {
        data(user) {
          user.birth = body.birth
        },
      })
      return HttpResponse.json({
        username: account.username,
        verified: account.verified,
        role: account.role,
        subscriptionLevel: account.subscriptionLevel,
        birth: body.birth,
        createdAt: account.createdAt,
      })
    },
  ),
]
