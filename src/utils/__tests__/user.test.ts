import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { formatMembershipDuration, isAdult } from '../user'

const now = new Date('2026-05-07T12:00:00.000Z')

describe('formatMembershipDuration', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    vi.setSystemTime(now)
  })

  it('describes very recent accounts in days', () => {
    expect(formatMembershipDuration('2026-05-06T12:00:00.000Z')).toBe('1 day')
  })

  it('describes older accounts in months', () => {
    expect(formatMembershipDuration('2026-04-07T12:00:00.000Z')).toBe('1 month')
  })

  it('switches to years after twelve months', () => {
    expect(formatMembershipDuration('2025-05-07T12:00:00.000Z')).toBe('1 year')
  })
})

describe('isAdult', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    vi.setSystemTime(now)
  })

  it('returns false when the birthday is one day before adulthood', () => {
    expect(isAdult('2008-05-08T12:00:00.000Z')).toBe(false)
  })

  it('returns true on the eighteenth birthday', () => {
    expect(isAdult('2008-05-07T12:00:00.000Z')).toBe(true)
  })
})
