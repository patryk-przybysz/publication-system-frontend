import dayjs from 'dayjs'
import { HttpResponse } from 'msw'

export const delay = (ms = 150) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const parseBasicAuth = (authorization: string | null) => {
  if (!authorization?.startsWith('Basic ')) return null
  try {
    return atob(authorization.slice('Basic '.length))
  } catch {
    return null
  }
}

export const getAgeFromBirth = (birth: string, referenceDate = dayjs()) =>
  referenceDate.diff(dayjs(birth), 'year')

export const getAccountAgeInDays = (
  createdAt: string,
  referenceDate = dayjs(),
) => referenceDate.diff(dayjs(createdAt), 'day')

export const unauthorized = () =>
  HttpResponse.json(
    { message: 'You are not authorized to perform this action' },
    { status: 401 },
  )

export const forbidden = () =>
  HttpResponse.json(
    { message: 'You do not have permission to access this resource' },
    { status: 403 },
  )

export const notFound = () =>
  HttpResponse.json(
    { message: 'The requested resource was not found' },
    { status: 404 },
  )
