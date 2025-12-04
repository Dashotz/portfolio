import { useState } from 'react'
import { apiService } from '@/services/api'
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
      const { data, error } = await apiService.submitContact(formData)

      if (error) {
        setSubmitStatus('error')
        setErrorMessage(error || 'Failed to send message. Please try again.')
        return { success: false, error }
      }

      setSubmitStatus('success')
      return { success: true, data }
    } catch (err) {
      setSubmitStatus('error')
      const errorMsg = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.'
      setErrorMessage(errorMsg)
      return { success: false, error: errorMsg }
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
