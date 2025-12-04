/**
 * Input validation and sanitization utilities
 * Protects against XSS, injection attacks, and malicious input
 */

/**
 * Sanitizes string input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return ''
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .slice(0, 10000) // Limit length to prevent DoS
}

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email.trim()) && email.length <= 254
}

/**
 * Validates name input
 */
export const validateName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false
  
  const sanitized = sanitizeInput(name)
  return sanitized.length >= 2 && sanitized.length <= 100
}

/**
 * Validates message input
 */
export const validateMessage = (message: string): boolean => {
  if (!message || typeof message !== 'string') return false
  
  const sanitized = sanitizeInput(message)
  return sanitized.length >= 10 && sanitized.length <= 2000
}

/**
 * Validates contact form data
 */
export interface ValidationResult {
  isValid: boolean
  errors: {
    name?: string
    email?: string
    message?: string
  }
}

export const validateContactForm = (data: { name: string; email: string; message: string }): ValidationResult => {
  const errors: ValidationResult['errors'] = {}
  
  if (!validateName(data.name)) {
    errors.name = 'Name must be between 2 and 100 characters'
  }
  
  if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!validateMessage(data.message)) {
    errors.message = 'Message must be between 10 and 2000 characters'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

