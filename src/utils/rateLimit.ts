/**
 * Client-side rate limiting utility
 * Prevents spam and DoS attacks on contact form
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

/**
 * Checks if an action is allowed based on rate limiting
 * @param key - Unique identifier (e.g., IP, user ID, or 'contact-form')
 * @param maxAttempts - Maximum attempts allowed
 * @param windowMs - Time window in milliseconds
 * @returns true if allowed, false if rate limited
 */
export const checkRateLimit = (
  key: string = 'contact-form',
  maxAttempts: number = 5,
  windowMs: number = 60000 // 1 minute
): boolean => {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired entry
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }

  if (entry.count >= maxAttempts) {
    return false // Rate limited
  }

  // Increment count
  entry.count++
  return true
}

/**
 * Gets remaining time until rate limit resets (in seconds)
 */
export const getRateLimitResetTime = (key: string = 'contact-form'): number => {
  const entry = rateLimitStore.get(key)
  if (!entry) return 0
  
  const remaining = Math.max(0, entry.resetTime - Date.now())
  return Math.ceil(remaining / 1000)
}

/**
 * Clears rate limit for a key (useful for testing)
 */
export const clearRateLimit = (key: string = 'contact-form'): void => {
  rateLimitStore.delete(key)
}

