/**
 * `field.state.meta.errors` is an array. Entries can be strings or Standard Schema issue objects.
 */
function formatOneFieldError(error: unknown): string {
  if (error == null) return ''
  if (typeof error === 'string') return error
  if (typeof error === 'object' && 'message' in error) {
    const msg = (error as { message?: unknown }).message
    if (typeof msg === 'string') return msg
  }
  return ''
}

export function formatFieldErrors(errors: readonly unknown[]): string {
  return errors.map(formatOneFieldError).filter(Boolean).join(', ')
}
