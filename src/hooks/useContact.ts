import { useState } from 'react'
import { apiService } from '@/services/api'
import { validateContactForm, sanitizeInput } from '@/utils/validation'
import { checkRateLimit, getRateLimitResetTime } from '@/utils/rateLimit'
import type { ContactFormData } from '@/types'

type SubmitStatus = 'success' | 'error' | null

interface UseContactReturn {
  submitContact: (formData: ContactFormData) => Promise<{ success: boolean; error?: string; data?: unknown }>
  isSubmitting: boolean
  submitStatus: SubmitStatus
  errorMessage: string
}

/**
 * Custom hook for contact form submission
 */
export const useContact = (): UseContactReturn => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const submitContact = async (formData: ContactFormData): Promise<{ success: boolean; error?: string; data?: unknown }> => {
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')

    try {
      // Rate limiting check
      if (!checkRateLimit('contact-form', 5, 60000)) {
        const resetTime = getRateLimitResetTime('contact-form')
        setSubmitStatus('error')
        setErrorMessage(`Too many requests. Please try again in ${resetTime} seconds.`)
        setIsSubmitting(false)
        return { success: false, error: 'Rate limit exceeded' }
      }

      // Validate and sanitize input
      const sanitizedData: ContactFormData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email).toLowerCase().trim(),
        message: sanitizeInput(formData.message),
      }

      const validation = validateContactForm(sanitizedData)
      if (!validation.isValid) {
        setSubmitStatus('error')
        const firstError = Object.values(validation.errors)[0]
        setErrorMessage(firstError || 'Please check your input and try again.')
        setIsSubmitting(false)
        return { success: false, error: firstError }
      }

      const { data, error } = await apiService.submitContact(sanitizedData)

      if (error) {
        setSubmitStatus('error')
        // Don't expose internal error details to prevent information leakage
        setErrorMessage('Failed to send message. Please try again.')
        return { success: false, error: 'Submission failed' }
      }

      setSubmitStatus('success')
      return { success: true, data }
    } catch (err) {
      setSubmitStatus('error')
      // Generic error message to prevent information leakage
      setErrorMessage('An unexpected error occurred. Please try again.')
      return { success: false, error: 'Unexpected error' }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    submitContact,
    isSubmitting,
    submitStatus,
    errorMessage,
  }
}
