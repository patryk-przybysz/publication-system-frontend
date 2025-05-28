export type DateString = string
export type DateTimeString = string
export type Period = string

export type Role = 'USER' | 'EDITOR' | 'ADMIN'
export type SubscriptionLevel = 'FREE' | 'PREMIUM'

export type User = {
  username: string
  verified: boolean
  role: Role
  subscriptionLevel: SubscriptionLevel
  birth: DateString
  createdAt: DateTimeString
}

export type AccountSummary = {
  username: string
}

export type AccountPublicDetails = {
  username: string
  verified: boolean
  role: Role
  subscriptionLevel: SubscriptionLevel
  adult: boolean
  membership: Period
}

export type Article = {
  id: string
  title: string
  author: string
  createdAt: DateTimeString
}

export type ArticleDetails = {
  title: string
  author: string
  createdAt: DateTimeString
  content: string
  comments: Comment[]
}

export type Comment = {
  author: string
  content: string
  createdAt: DateTimeString
}
