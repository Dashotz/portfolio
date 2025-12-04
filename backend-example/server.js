/**
 * Example Backend Server for Portfolio API
 * This is a simple Express.js server to demonstrate API integration
 * 
 * Install dependencies:
 * npm install express cors dotenv
 * 
 * Run the server:
 * node server.js
 */

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Sample data
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
    github: 'https://github.com',
    live: 'https://example.com',
  },
];

const personalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer & Creative Problem Solver',
  subtitle: 'Full Stack Developer',
  bio: 'I create beautiful, functional, and user-centered digital experiences. Let\'s bring your ideas to life with modern web technologies.',
  about: [
    'I\'m a full-stack developer passionate about building innovative web applications that solve real-world problems. With a strong foundation in modern web technologies, I bring creativity and technical expertise to every project.',
    'My journey in web development started with curiosity and has evolved into a career where I continuously learn and adapt to new technologies and best practices.',
    'When I\'m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.',
  ],
};

const skills = [
  {
    icon: 'FaCode',
    title: 'Frontend',
    description: 'React, Vue, Next.js, TypeScript'
  },
  {
    icon: 'FaRocket',
    title: 'Backend',
    description: 'Node.js, Express, Python, Databases'
  },
  {
    icon: 'FaPalette',
    title: 'Design',
    description: 'UI/UX, Figma, Tailwind CSS'
  },
  {
    icon: 'FaHeart',
    title: 'Tools',
    description: 'Git, Docker, CI/CD, Testing'
  },
];

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all projects
app.get('/api/projects', (req, res) => {
  // Simulate API delay
  setTimeout(() => {
    res.json(projects);
  }, 500);
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

// Get personal information
app.get('/api/personal-info', (req, res) => {
  res.json(personalInfo);
});

// Get skills
app.get('/api/skills', (req, res) => {
  res.json(skills);
});

// Submit contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Missing required fields',
      success: false 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Invalid email format',
      success: false 
    });
  }

  try {
    // Here you would:
    // 1. Save to database
    // 2. Send email notification
    // 3. Log the submission
    
    console.log('Contact form submission received:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    // Example: Send email using a service
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Portfolio Contact: ${name}`,
    //   text: `From: ${name} (${email})\n\n${message}`
    // });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
      success: true,
      message: 'Thank you! Your message has been received.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your message. Please try again later.'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  /health`);
  console.log(`  GET  /api/projects`);
  console.log(`  GET  /api/personal-info`);
  console.log(`  GET  /api/skills`);
  console.log(`  POST /api/contact`);
});
