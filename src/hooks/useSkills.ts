import { useState, useEffect } from 'react'
import { apiService } from '@/services/api'
import { skills as defaultSkills } from '@/constants'
import type { Skill } from '@/types'

interface UseSkillsReturn {
  skills: Skill[]
  loading: boolean
  error: string | null
}

/**
 * Custom hook to fetch skills from API
 * Falls back to constants if API is unavailable
 */
export const useSkills = (): UseSkillsReturn => {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async (): Promise<void> => {
      try {
        setLoading(true)
        const { data, error: apiError } = await apiService.getSkills()

        if (apiError) {
          // Fallback to default skills from constants
          // Only log if API is explicitly configured
          if (import.meta.env.VITE_API_BASE_URL) {
            console.warn('API unavailable, using default skills')
          }
          setSkills(defaultSkills)
        } else {
          setSkills(data || defaultSkills)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        console.error('Error fetching skills:', err)
        setError(errorMessage)
        // Fallback to default skills
        setSkills(defaultSkills)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  return { skills, loading, error }
}
