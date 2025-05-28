import { env } from '@/config/env'
import { ofetch } from 'ofetch'
import { toast } from 'sonner'
import { authStorage } from './auth'

export const api = ofetch.create({
  baseURL: env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: false,
  onRequest: ({ options }) => {
    const authHeader = authStorage.getAuthHeader()
    if (authHeader) {
      options.headers.set('Authorization', authHeader)
    }
  },
  onRequestError: () => {
    toast.error('Network Error', {
      description:
        'Failed to connect to the server. Please check your internet connection.',
    })
  },
  onResponseError: ({ response }) => {
    const { title, description } = getErrorInfo(Number(response.status))

    toast.error(title, {
      description,
    })
  },
})

const errorMessages = {
  400: 'Invalid data provided. Please check your input',
  401: 'You are not authorized to perform this action',
  403: 'You do not have permission to access this resource',
  404: 'The requested resource was not found',
  422: 'Invalid data provided. Please check your input',
} as const

const getErrorInfo = (status: number) => {
  if (status >= 400 && status < 500) {
    return {
      title: 'Client Error',
      description:
        errorMessages[status as keyof typeof errorMessages] ||
        'There was a problem with your request',
    }
  }
  if (status >= 500) {
    return {
      title: 'Server Error',
      description: 'The server encountered an error. Please try again later',
    }
  }

  return {
    title: 'Error',
    description: 'An unexpected error occurred',
  }
}
