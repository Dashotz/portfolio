
import { ProjectData } from './ProjectCard';

export const projects: ProjectData[] = [
    {
        name: 'Imus United Football Club',
        description: 'A modern, animated website for Imus United Football Club built with Next.js 14 and Supabase. Features include a public event system with attendance tracking, an admin dashboard for operations, 3D graphics, and SEO optimization.',
        tech: ['Next.js 14', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        codeLink: 'https://github.com/Dashotz/IUFC',
        demoLink: 'https://iufc.netlify.app',
        image: '/images/IUFC.PNG',
        // video: '/videos/iufc.mp4', 
        category: 'website'
    },
    {
        name: 'ClinicSync',
        description: 'A modern dental practice management platform focused on digital patient records, smart appointment scheduling, real-time analytics (revenue & patient flow), and HIPAA-conscious security — all wrapped in an intuitive dashboard. Currently in development, with backend API integration planned next.',
        tech: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
        demoLink: 'https://clinicsync-snowy.vercel.app',
        image: '/images/clinicsync.PNG',
        // video: '/videos/clinicsync.mp4',
        category: 'app'
    },
    {
        name: 'The Ridge Realty Group',
        description: 'A modern real estate website for Marci Metzger, showcasing properties in Pahrump, Nevada. Features include advanced property search filters, an interactive 3D circular gallery, achievement highlights, and seamless contact integration.',
        tech: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'ogl', 'React Leaflet'],
        codeLink: 'https://github.com/Dashotz/homepage',
        demoLink: 'https://paruhmprealtor.netlify.app',
        image: '/images/realtor.PNG',
        // video: '/videos/realtor.mp4',
        category: 'website'
    },
    {
        name: 'Prism Event Registration',
        description: 'A modern, responsive Event Registration application built with Quasar Framework (Vue.js 3) and Supabase. Features include seamless registration flow, speaker showcase, internationalization, and a comprehensive management system.',
        tech: ['Vue.js 3', 'Quasar', 'Supabase', 'TypeScript', 'Pinia'],
        codeLink: 'https://github.com/Dashotz/prism',
        demoLink: 'https://prism-2npun5jsm-francis-cruzs-projects.vercel.app/#/',
        image: '/images/prism.PNG',
        // video: '/videos/prism.mp4', 
        category: 'app'
    },
    {
        name: 'Prism Telegram Bot',
        description: 'A Python-based Telegram bot designed for managing groups and user invitations. Features include automated group creation via conversation handlers, user management, invite link generation, and security validation using allowed phone numbers and usernames.',
        tech: ['Python', 'Telethon', 'python-telegram-bot', 'python-dotenv'],
        codeLink: 'https://github.com/Dashotz/prismbot',
        demoLink: '#',
        image: '/images/prismbot.PNG',
        // video: '/videos/prismbot.mp4', 
        category: 'app'
    },
    {
        name: 'HTML Email Template Builder',
        description: 'A comprehensive email template builder for creating, testing, and managing professional email campaigns. Features include drag-and-drop visual builder, Monaco code editor with live preview, multi-client testing across 40+ email clients, AI-powered template generation, real-time analytics, ESP integrations, and automated spam and accessibility testing.',
        tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'React DnD', 'Lucide React'],
        codeLink: 'https://github.com/Dashotz',
        demoLink: '#',
        image: '/images/emailbuilder.jpg',
        // video: '/videos/email-builder.mp4',
        category: 'app'
    },
    {
        name: 'Drag & Drop Website Builder',
        description: 'A modern drag-and-drop website builder inspired by WordPress and Shopify. Features include intuitive visual editor, pre-built component library, custom code injection, real-time preview, responsive design, save and export functionality, extensible plugin system, and built-in SEO optimization tools.',
        tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', '@dnd-kit', 'Lucide React'],
        codeLink: 'https://github.com/Dashotz',
        demoLink: '#',
        image: '/images/websitebuilder.jpg',
        // video: '/videos/website-builder.mp4',
        category: 'app'
    },
    {
        name: 'Dental Scheduling System',
        description: 'A comprehensive web-based dental clinic management system designed to streamline patient management, appointment scheduling, and clinic operations. Features include patient profiles with dental records and teeth chart tracking, interactive calendar interface, treatment plan creation with quote/invoice generation, multi-role system with role-based access control, and administrative tools with multi-tenant support and comprehensive reporting.',
        tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'jQuery', 'JavaScript'],
        codeLink: 'https://github.com/Dashotz/dental_schedule',
        demoLink: 'https://dental-schedule.helioho.st',
        image: '/images/dental.jpg',
        // video: '/videos/dental-schedule.mp4',
        category: 'app'
    },
    {
        name: 'Weather App',
        description: 'A beautiful weather application with location-based forecasts and interactive maps. Features include 5-day forecasts, nearby cities weather, city search with autocomplete, and interactive Leaflet maps. Built with free APIs (Open-Meteo & Nominatim) - no API keys required!',
        tech: ['React', 'Leaflet', 'React-Leaflet', 'Open-Meteo API', 'Nominatim', 'Tailwind CSS', 'Vite'],
        codeLink: 'https://github.com/Dashotz/weather',
        demoLink: 'https://dashotz.github.io/weather/',
        image: '/images/weather.png',
        // video: '/videos/weather.mp4',
        category: 'website'
    },
    {
        name: 'Social Media Dashboard',
        description: 'A comprehensive, real-time dashboard for managing multiple social media accounts with advanced analytics, post scheduling, and performance insights. Features include multi-platform support (Facebook, Instagram, Twitter), interactive charts, smart post scheduling with live preview, activity tracking, and enterprise-grade security with rate limiting and XSS protection.',
        tech: ['Next.js 14', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'Zod', 'date-fns'],
        codeLink: 'https://github.com/Dashotz/Social_Media_Dashboard',
        demoLink: 'https://dashotz.github.io/Social_Media_Dashboard/',
        image: '/images/socialmedia.jpg',
        // video: '/videos/socialmedia.mp4',
        category: 'website'
    },
    {
        name: 'Learning Management System',
        description: 'A comprehensive LMS platform for Gov D.M. Camerino with student dashboard, grade tracking, assignments, quizzes, and attendance management. Features include subject management, calendar integration, and real-time activity tracking.',
        tech: ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL'],
        codeLink: 'https://github.com/Dashotz/Camerino-Hub',
        demoLink: 'https://camerinohub.helioho.st',
        image: '/images/camerino.jpg',
        // video: '/videos/camerino.mp4',
        category: 'website'
    },
    {
        name: 'St. Thomas More School',
        description: 'An academic website developed for St. Thomas More School, featuring essential functions for information sharing, student access, and school updates. Includes a Learning Management System portal with login functionality for students and teachers.',
        tech: ['PHP', 'JavaScript', 'CSS', 'HTML', 'Bootstrap', 'MySQL'],
        codeLink: 'https://github.com/Dashotz',
        demoLink: 'https://stthomasmore.helioho.st',
        image: '/images/sttma.jpg',
        // video: '/videos/sttma.mp4',
        category: 'website'
    }
];
