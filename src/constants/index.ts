import type { NavItem, SocialLink, PersonalInfo, Skill, Project, ContactInfo } from '@/types'
import type { Variants } from 'framer-motion'
import camerinoImage from '@/assets/images/camerino.jpg'
import sttmaImage from '@/assets/images/sttma.jpg'

// Navigation items
export const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

// Social links
export const socialLinks: SocialLink[] = [
  { 
    icon: 'FaGithub', 
    href: 'https://github.com/Dashotz', 
    label: 'GitHub' 
  },
  { 
    icon: 'FaLinkedin', 
    href: 'https://ph.linkedin.com/in/frncszxc?trk=people-guest_people_search-card', 
    label: 'LinkedIn' 
  },
  { 
    icon: 'FaEnvelope', 
    href: 'mailto:frncsgerard02@gmail.com', 
    label: 'Email' 
  },
]

// Personal information
export const personalInfo: PersonalInfo = {
  name: 'Francis Cruz',
  title: 'Full Stack Developer & Creative Problem Solver',
  subtitle: 'Full Stack Developer',
  bio: 'I create beautiful, functional, and user-centered digital experiences. Let\'s bring your ideas to life with modern web technologies.',
  about: [
    'I\'m a full-stack developer passionate about building innovative web applications that solve real-world problems. With a strong foundation in modern web technologies, I bring creativity and technical expertise to every project.',
    'My journey in web development started with curiosity and has evolved into a career where I continuously learn and adapt to new technologies and best practices.',
    'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.',
  ],
}

// Skills
export const skills: Skill[] = [
  { 
    icon: 'FaCode', 
    title: 'Frontend', 
    description: 'React, Next.js, JavaScript, TypeScript' 
  },
  { 
    icon: 'FaRocket', 
    title: 'Backend', 
    description: 'Node.js, Express, PHP, MySQL, Laravel' 
  },
  { 
    icon: 'FaPalette', 
    title: 'Design', 
    description: 'UI/UX, Figma, Tailwind CSS' 
  },
  { 
    icon: 'FaHeart', 
    title: 'Tools', 
    description: 'Git, Github, CI/CD, Testing' 
  },
]

// Projects
export const projects: Project[] = [
  {
    title: 'Learning Management System',
    description: 'A comprehensive LMS platform for Gov D.M. Camerino with student dashboard, grade tracking, assignments, quizzes, and attendance management. Features include subject management, calendar integration, and real-time activity tracking.',
    technologies: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
    image: camerinoImage,
    github: 'https://github.com/Dashotz/Camerino-Hub',
    live: 'https://camerinohub.helioho.st',
  },
  {
    title: 'St. Thomas More School',
    description: 'An academic website developed for St. Thomas More School, featuring essential functions for information sharing, student access, and school updates. Includes a Learning Management System portal with login functionality for students and teachers.',
    technologies: ['PHP', 'JavaScript', 'CSS', 'HTML', 'Bootstrap', 'MySQL'],
    image: sttmaImage,
    github: 'https://github.com/Dashotz',
    live: 'https://stthomasmore.helioho.st',
  },
  {
    title: 'Social Media Dashboard',
    description: 'A comprehensive dashboard for managing social media accounts with analytics and scheduling.',
    technologies: ['Next.js', 'TypeScript', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    title: 'Weather App',
    description: 'A beautiful weather application with location-based forecasts and interactive maps.',
    technologies: ['React', 'OpenWeather API', 'Leaflet'],
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
]

// Contact information
export const contactInfo: ContactInfo[] = [
  { 
    icon: 'FaEnvelope', 
    text: 'your.email@example.com', 
    href: 'mailto:your.email@example.com' 
  },
  { 
    icon: 'FaPhone', 
    text: '+1 (234) 567-8900', 
    href: 'tel:+12345678900' 
  },
  { 
    icon: 'FaMapMarkerAlt', 
    text: 'Your City, Country', 
    href: '#' 
  },
]

// Animation variants
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}
