import type { User } from '@/types/api'
import { rand, randBetweenDate, randBoolean, randUserName } from '@ngneat/falso'

const roleOptions = ['USER', 'EDITOR', 'ADMIN'] as const
const subscriptionLevelOptions = ['FREE', 'PREMIUM'] as const

export const generateUser = () =>
  ({
    username: randUserName({ withAccents: false }),
    verified: randBoolean(),
    role: rand(roleOptions),
    subscriptionLevel: rand(subscriptionLevelOptions),
    birth: randBetweenDate({
      from: '1970-01-01',
      to: new Date(),
    })
      .toISOString()
      .slice(0, 10),
    createdAt: new Date().toISOString(),
  }) satisfies User

export const createUser = <T extends Partial<ReturnType<typeof generateUser>>>(
  overrides?: T,
) => ({ ...generateUser(), ...overrides })
