# Portfolio Website - Francis Cruz

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and a beautiful UI showcasing projects, skills, and contact information.

![Portfolio Preview](https://img.shields.io/badge/React-18.2.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.8-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38bdf8)

## ✨ Features

- 🎨 **Modern & Responsive Design** - Beautiful UI that works on all devices
- 🌙 **Dark Mode** - Toggle between light and dark themes with persistent preference
- ✨ **Smooth Animations** - Powered by Framer Motion for engaging user experience
- 📱 **Mobile-First** - Fully responsive with mobile-optimized navigation
- 🔒 **Security** - Input validation, rate limiting, and XSS protection
- ⚡ **Fast Performance** - Optimized with Vite for lightning-fast builds
- 🎯 **SEO Friendly** - Proper meta tags and semantic HTML
- 📊 **Project Showcase** - Display your projects with images, descriptions, and links

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

Preview the production build:
```bash
npm run preview
```

## 🌐 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions

1. **Update Base Path** in `vite.config.ts`:
   - If your repo is `username.github.io`, change `base: '/portfolio/'` to `base: '/'`
   - Otherwise, replace `'portfolio'` with your actual repository name

2. **Enable GitHub Pages**:
   - Go to your repository → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

4. **Automatic Deployment**:
   - The GitHub Actions workflow will automatically build and deploy
   - Check the **Actions** tab to see deployment status
   - Your site will be live at: `https://your-username.github.io/portfolio/`

### Manual Deployment

If you prefer manual deployment:

```bash
npm install --save-dev gh-pages
npm run deploy
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.tsx   # Navigation header with dark mode toggle
│   │   │   └── Footer.tsx   # Footer component
│   │   └── sections/        # Page sections
│   │       ├── Hero.tsx     # Hero/landing section
│   │       ├── About.tsx    # About me section
│   │       ├── Projects.tsx # Projects showcase
│   │       └── Contact.tsx  # Contact form section
│   ├── hooks/               # Custom React hooks
│   │   ├── useContact.ts    # Contact form handling
│   │   ├── usePersonalInfo.ts
│   │   ├── useProjects.ts
│   │   ├── useSkills.ts
│   │   └── useTheme.ts      # Dark mode theme management
│   ├── services/            # API services
│   │   └── api.ts           # API service layer
│   ├── utils/               # Utility functions
│   │   ├── scrollTo.ts      # Smooth scroll utility
│   │   ├── validation.ts    # Input validation
│   │   └── rateLimit.ts     # Rate limiting
│   ├── constants/           # Static data
│   │   └── index.ts         # Projects, skills, contact info
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── styles/              # Global styles
│   │   └── index.css        # Tailwind imports
│   ├── assets/              # Static assets
│   │   └── images/          # Project images
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions deployment
├── public/                  # Public assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎨 Customization

### Personal Information

Edit `src/constants/index.ts` to update:
- Personal info (name, title, bio, about)
- Projects (add/edit your projects)
- Skills
- Contact information
- Social links

### Colors & Theme

Customize colors in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom color palette
  }
}
```

### Images

Add your project images to `src/assets/images/` and import them in `src/constants/index.ts`:
```typescript
import projectImage from '@/assets/images/project.jpg'
```

### Dark Mode

Dark mode is automatically handled. The theme preference is saved in localStorage and persists across sessions.

## 🔒 Security Features

- **Input Validation** - All form inputs are validated and sanitized
- **Rate Limiting** - Prevents spam and DoS attacks (5 requests per minute)
- **XSS Protection** - Input sanitization to prevent XSS attacks
- **Security Headers** - CSP, X-Frame-Options, and other security headers
- **Error Handling** - Generic error messages to prevent information leakage

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages (requires gh-pages)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👤 Author

**Francis Cruz**

- GitHub: [@Dashotz](https://github.com/Dashotz)
- Email: frncsgerard02@gmail.com
- LinkedIn: [Francis Cruz](https://ph.linkedin.com/in/frncszxc)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

⭐ If you like this project, please give it a star!
