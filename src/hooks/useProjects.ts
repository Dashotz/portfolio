import { useState, useEffect } from 'react'
import { apiService } from '@/services/api'
import { projects as defaultProjects } from '@/constants'
import type { Project } from '@/types'

interface UseProjectsReturn {
  projects: Project[]
  loading: boolean
  error: string | null
}

/**
 * Custom hook to fetch projects from API
 * Falls back to constants if API is unavailable
 */
export const useProjects = (): UseProjectsReturn => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async (): Promise<void> => {
      try {
        setLoading(true)
        const { data, error: apiError } = await apiService.getProjects()

        if (apiError) {
          // Fallback to default projects from constants
          // Only log if API is explicitly configured
          if (import.meta.env.VITE_API_BASE_URL) {
            console.warn('API unavailable, using default projects')
          }
          setProjects(defaultProjects)
        } else {
          setProjects(data || defaultProjects)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
        console.error('Error fetching projects:', err)
        setError(errorMessage)
        // Fallback to default projects
        setProjects(defaultProjects)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}
