import { useState } from 'react'
import emailjs from '@emailjs/browser'
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

      // Send email using EmailJS
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
      const recipientEmail = 'frncsgerard02@gmail.com' // Your email address

      if (!serviceId || !templateId || !publicKey) {
        // Fallback to mailto if EmailJS is not configured
        const subject = encodeURIComponent(`Portfolio Contact: ${sanitizedData.name}`)
        const body = encodeURIComponent(
          `Name: ${sanitizedData.name}\nEmail: ${sanitizedData.email}\n\nMessage:\n${sanitizedData.message}`
        )
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
        setSubmitStatus('success')
        return { success: true, data: { method: 'mailto' } }
      }

      // Initialize EmailJS
      emailjs.init(publicKey)

      // Send email
      const emailResult = await emailjs.send(serviceId, templateId, {
        from_name: sanitizedData.name,
        from_email: sanitizedData.email,
        message: sanitizedData.message,
        to_email: recipientEmail,
        reply_to: sanitizedData.email,
      })

      if (emailResult.status === 200) {
        setSubmitStatus('success')
        return { success: true, data: emailResult }
      } else {
        throw new Error('Email sending failed')
      }
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
