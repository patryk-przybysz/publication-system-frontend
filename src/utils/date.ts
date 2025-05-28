import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export function formatDate(dateString: string, format: string): string {
  return dayjs(dateString).format(format)
}

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

export function formatSimpleDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString()
}

export function formatMemberSinceDate(dateString: string): string {
  return dayjs(dateString).format('MMM D, YYYY')
}

export function formatRelativeTime(dateString: string): string {
  return dayjs(dateString).fromNow()
}

export function isToday(dateString: string): boolean {
  return dayjs(dateString).isSame(dayjs(), 'day')
}

export function isWithinLastWeek(dateString: string): boolean {
  return dayjs(dateString).isAfter(dayjs().subtract(1, 'week'))
}

export function formatSmartDate(dateString: string): string {
  const date = dayjs(dateString)

  if (isToday(dateString)) {
    return `Today at ${date.format('h:mm A')}`
  }

  if (isWithinLastWeek(dateString)) {
    return date.fromNow()
  }

  return formatContentDate(dateString)
}

export function formatPeriod(periodString: string): string {
  if (!periodString || !periodString.startsWith('P')) {
    return 'Unknown duration'
  }

  const period = periodString.slice(1)

  const yearMatch = period.match(/(\d+)Y/)
  const monthMatch = period.match(/(\d+)M/)
  const dayMatch = period.match(/(\d+)D/)

  const years = yearMatch ? Number.parseInt(yearMatch[1], 10) : 0
  const months = monthMatch ? Number.parseInt(monthMatch[1], 10) : 0
  const days = dayMatch ? Number.parseInt(dayMatch[1], 10) : 0

  const parts: string[] = []

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? 'year' : 'years'}`)
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? 'month' : 'months'}`)
  }

  if (days > 0) {
    parts.push(`${days} ${days === 1 ? 'day' : 'days'}`)
  }

  if (parts.length === 0) {
    return '0 days'
  }

  if (parts.length === 1) {
    return parts[0]
  }

  if (parts.length === 2) {
    return parts.join(' and ')
  }

  return `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`
}
