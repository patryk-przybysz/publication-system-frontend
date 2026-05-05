import dayjs from 'dayjs'

export function formatContentDate(dateString: string): string {
  return dayjs(dateString).format('MMM D, YYYY [at] h:mm A')
}

export function formatFullDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
