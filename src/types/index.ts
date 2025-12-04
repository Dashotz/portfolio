// Type definitions for the portfolio application

export interface NavItem {
  name: string
  href: string
}

export interface SocialLink {
  icon: string
  href: string
  label: string
}

export interface PersonalInfo {
  name: string
  title: string
  subtitle: string
  bio: string
  about: string[]
}

export interface Skill {
  icon: string
  title: string
  description: string
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
  github: string
  live: string
}

export interface ContactInfo {
  icon: string
  text: string
  href: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export interface ApiResponse<T> {
  data: T | null
  error: string | null
}

export interface ContactSubmitResponse {
  success: boolean
  message?: string
  error?: string
}
