import { Collection } from '@msw/data'
import { z } from 'zod'

export const users = new Collection({
  schema: z.object({
    username: z.string(),
    verified: z.boolean(),
    role: z.enum(['USER', 'EDITOR', 'ADMIN']),
    subscriptionLevel: z.enum(['FREE', 'PREMIUM']),
    birth: z.string(),
    createdAt: z.string(),
    password: z.string(),
  }),
})

export const articles = new Collection({
  schema: z.object({
    id: z.string(),
    title: z.string(),
    author: z.string(),
    createdAt: z.string(),
    content: z.string(),
    requiredAge: z.number().optional(),
    requiredAccountAge: z.number().optional(),
  }),
})

export const comments = new Collection({
  schema: z.object({
    id: z.number(),
    articleId: z.string(),
    author: z.string(),
    content: z.string(),
    createdAt: z.string(),
  }),
})

export const db = { users, articles, comments }

const seedUsers = [
  {
    username: 'user',
    verified: true,
    role: 'USER',
    subscriptionLevel: 'FREE',
    birth: '1995-04-11',
    createdAt: '2024-01-01T10:00:00.000Z',
    password: 'sa',
  },
  {
    username: 'editor',
    verified: true,
    role: 'EDITOR',
    subscriptionLevel: 'PREMIUM',
    birth: '1990-01-31',
    createdAt: '2024-01-01T10:00:00.000Z',
    password: 'sa',
  },
  {
    username: 'admin',
    verified: true,
    role: 'ADMIN',
    subscriptionLevel: 'PREMIUM',
    birth: '1988-06-12',
    createdAt: '2024-01-02T10:00:00.000Z',
    password: 'sa',
  },
] as const

const seedArticles = [
  {
    id: '1',
    title: 'Understanding Access Control',
    author: 'editor',
    createdAt: '2024-02-01T12:00:00.000Z',
    content: 'Access control is central to secure publishing systems.',
  },
] as const

const seedComments = [
  {
    id: 1,
    articleId: '1',
    author: 'admin',
    content: 'Great overview!',
    createdAt: '2024-02-02T12:00:00.000Z',
  },
] as const

for (const user of seedUsers) void users.create(user)
for (const article of seedArticles) void articles.create(article)
for (const comment of seedComments) void comments.create(comment)
