import { http, HttpResponse } from 'msw'

import { env } from '@/config/env'
import type { Article } from '@/types/api'

import { db } from '../db'
import {
  delay,
  forbidden,
  getAccountAgeInDays,
  getAgeFromBirth,
  notFound,
  parseBasicAuth,
  unauthorized,
} from '../utils'

export const handlers = [
  http.get(`${env.VITE_API_URL}/articles`, async ({ request }) => {
    await delay()

    const auth = parseBasicAuth(request.headers.get('authorization'))
    let accountAge = 0
    let userAge = 0
    if (auth) {
      const [username, password] = auth.split(':')
      const user = db.users.findFirst((q) => q.where({ username }))
      if (!user || user.password !== password) return unauthorized()
      accountAge = getAccountAgeInDays(user.createdAt)
      userAge = getAgeFromBirth(user.birth)
    }

    const filtered = db.articles
      .findMany()
      .filter((article) => {
        if (article.requiredAccountAge) {
          return accountAge >= article.requiredAccountAge
        }
        if (article.requiredAge) {
          return userAge >= article.requiredAge
        }
        return true
      })
      .map(
        ({ id, title, author, createdAt }) =>
          ({
            id,
            title,
            author,
            createdAt,
          }) satisfies Article,
      )

    return HttpResponse.json(filtered)
  }),

  http.get(
    `${env.VITE_API_URL}/articles/:articleId`,
    async ({ params, request }) => {
      await delay()
      const auth = parseBasicAuth(request.headers.get('authorization'))
      let accountAge = 0
      let userAge = 0
      if (auth) {
        const [username, password] = auth.split(':')
        const user = db.users.findFirst((q) => q.where({ username }))
        if (!user || user.password !== password) return unauthorized()
        accountAge = getAccountAgeInDays(user.createdAt)
        userAge = getAgeFromBirth(user.birth)
      }
      const article = db.articles.findFirst((q) =>
        q.where({ id: String(params.articleId) }),
      )
      if (!article) return notFound()
      if (
        article.requiredAccountAge &&
        accountAge < article.requiredAccountAge
      ) {
        return forbidden()
      }
      if (article.requiredAge && userAge < article.requiredAge) {
        return forbidden()
      }

      const comments = db.comments.findMany((q) =>
        q.where({ articleId: article.id }),
      )
      return HttpResponse.json({ ...article, comments })
    },
  ),

  http.post(`${env.VITE_API_URL}/articles`, async ({ request }) => {
    await delay()
    const auth = parseBasicAuth(request.headers.get('authorization'))
    if (!auth) return unauthorized()
    const [username, password] = auth.split(':')
    const user = db.users.findFirst((q) => q.where({ username }))
    if (!user || user.password !== password) return unauthorized()
    if (user.role !== 'EDITOR') return forbidden()

    const body = (await request.json()) as {
      title: string
      content: string
      requiredAge?: number
      requiredAccountAge?: number
    }
    const article = await db.articles.create({
      id: String(db.articles.findMany().length + 1),
      title: body.title,
      author: user.username,
      createdAt: new Date().toISOString(),
      content: body.content,
      requiredAge: body.requiredAge,
      requiredAccountAge: body.requiredAccountAge,
    })
    return HttpResponse.json(article, { status: 201 })
  }),

  http.post(
    `${env.VITE_API_URL}/articles/:articleId/comments`,
    async ({ params, request }) => {
      await delay()
      const auth = parseBasicAuth(request.headers.get('authorization'))
      if (!auth) return unauthorized()
      const [username, password] = auth.split(':')
      const user = db.users.findFirst((q) => q.where({ username }))
      if (!user || user.password !== password) return unauthorized()
      if (user.role !== 'USER') return forbidden()

      const article = db.articles.findFirst((q) =>
        q.where({ id: String(params.articleId) }),
      )
      if (!article) return notFound()

      const body = (await request.json()) as { content: string }

      const comment = await db.comments.create({
        id: db.comments.findMany().length + 1,
        articleId: article.id,
        author: user.username,
        content: body.content,
        createdAt: new Date().toISOString(),
      })

      return HttpResponse.json(comment, { status: 201 })
    },
  ),

  http.delete(
    `${env.VITE_API_URL}/articles/:articleId/comments/:commentId`,
    async ({ params, request }) => {
      await delay()
      const auth = parseBasicAuth(request.headers.get('authorization'))
      if (!auth) return unauthorized()
      const [username, password] = auth.split(':')
      const user = db.users.findFirst((q) => q.where({ username }))
      if (!user || user.password !== password) return unauthorized()
      if (user.role !== 'ADMIN') return forbidden()

      const comment = db.comments.findFirst((q) =>
        q.where({ id: Number(params.commentId) }),
      )
      if (!comment) return notFound()
      db.comments.delete((q) => q.where({ id: comment.id }))

      return new HttpResponse(null, { status: 204 })
    },
  ),
]
