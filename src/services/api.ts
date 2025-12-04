/**
 * API Service Layer
 * Handles all HTTP requests to the backend API
 */
import type { 
  ApiResponse, 
  Project, 
  PersonalInfo, 
  Skill, 
  ContactFormData,
  ContactSubmitResponse 
} from '@/types'

// Check if API is configured
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const IS_API_CONFIGURED = Boolean(import.meta.env.VITE_API_BASE_URL)

interface RequestOptions extends RequestInit {
  headers?: HeadersInit
}

class ApiService {
  private baseURL: string
  private isConfigured: boolean

  constructor(baseURL: string, isConfigured: boolean) {
    this.baseURL = baseURL || 'http://localhost:3000/api'
    this.isConfigured = isConfigured
  }

  /**
   * Generic request method
   */
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    // If API is not configured, immediately return error without making request
    if (!this.isConfigured) {
      return { data: null, error: 'API not configured' }
    }

    const url = `${this.baseURL}${endpoint}`
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json() as T
      return { data, error: null }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      // Only log errors in development when API is explicitly configured
      if (import.meta.env.DEV && import.meta.env.VITE_API_BASE_URL) {
        console.warn('API Request Error:', errorMessage)
      }
      return { data: null, error: errorMessage }
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...options,
    })
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data: unknown, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options,
    })
  }

  // ============ Specific API Methods ============

  /**
   * Get all projects
   */
  async getProjects(): Promise<ApiResponse<Project[]>> {
    return this.get<Project[]>('/projects')
  }

  /**
   * Submit contact form
   */
  async submitContact(formData: ContactFormData): Promise<ApiResponse<ContactSubmitResponse>> {
    // Additional server-side validation should be implemented
    // This is just client-side sanitization
    const sanitizedData: ContactFormData = {
      name: formData.name.trim().slice(0, 100),
      email: formData.email.trim().toLowerCase().slice(0, 254),
      message: formData.message.trim().slice(0, 2000),
    }
    return this.post<ContactSubmitResponse>('/contact', sanitizedData)
  }

  /**
   * Get personal information
   */
  async getPersonalInfo(): Promise<ApiResponse<PersonalInfo>> {
    return this.get<PersonalInfo>('/personal-info')
  }

  /**
   * Get skills
   */
  async getSkills(): Promise<ApiResponse<Skill[]>> {
    return this.get<Skill[]>('/skills')
  }
}

// Create and export a singleton instance
export const apiService = new ApiService(API_BASE_URL, IS_API_CONFIGURED)
export default apiService
