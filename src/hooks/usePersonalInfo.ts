import { useState, useEffect } from 'react'
import { apiService } from '@/services/api'
import { personalInfo as defaultPersonalInfo } from '@/constants'
import type { PersonalInfo } from '@/types'

interface UsePersonalInfoReturn {
  personalInfo: PersonalInfo
  loading: boolean
  error: string | null
}

/**
 * Custom hook to fetch personal information from API
 * Falls back to constants if API is unavailable
 */
export const usePersonalInfo = (): UsePersonalInfoReturn => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(defaultPersonalInfo)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPersonalInfo = async (): Promise<void> => {
      try {
        setLoading(true)
        const { data, error: apiError } = await apiService.getPersonalInfo()

        if (apiError) {
          // Fallback to default personal info from constants
          // Only log if API is explicitly configured
          if (import.meta.env.VITE_API_BASE_URL) {
            console.warn('API unavailable, using default personal info')
          }
          setPersonalInfo(defaultPersonalInfo)
        } else {
          setPersonalInfo(data || defaultPersonalInfo)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        console.error('Error fetching personal info:', err)
        setError(errorMessage)
        // Fallback to default personal info
        setPersonalInfo(defaultPersonalInfo)
      } finally {
        setLoading(false)
      }
    }

    fetchPersonalInfo()
  }, [])

  return { personalInfo, loading, error }
}
