# Portfolio Website

A modern, animated portfolio website built with React.js, featuring smooth animations, API integration, and a beautiful UI.

## Features

- 🎨 Modern and responsive design
- ✨ Smooth animations using Framer Motion
- 📱 Fully responsive layout
- 🎯 Smooth scroll navigation
- 🌈 Beautiful gradient effects
- ⚡ Fast performance with Vite
- 🔌 **API integration with graceful fallback**
- 📁 **Clean, organized folder structure**

## Tech Stack

- **React.js** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. (Optional) Configure API:
   - Create a `.env` file in the root directory
   - Add your API URL: `VITE_API_BASE_URL=http://localhost:3000/api`
   - See `README_API.md` for detailed API documentation

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## API Integration

This portfolio supports dynamic content through API integration. The application gracefully falls back to static data if the API is unavailable.

**Features:**
- Fetch projects from API
- Dynamic personal information
- Contact form submission
- Automatic fallback to static data

See `README_API.md` for complete API documentation and backend examples.

### Quick Start with API

1. Start the example backend server (optional):
```bash
cd backend-example
npm install
npm start
```

2. Create `.env` file in root:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

3. Start the frontend:
```bash
npm run dev
```

## Customization

### Personal Information

You can customize your portfolio in two ways:

**Option 1: Edit Constants File** (Static)
- Update `src/constants/index.js` with your information

**Option 2: Use API** (Dynamic)
- Set up a backend API (see `README_API.md`)
- Configure `VITE_API_BASE_URL` in `.env`
- Data will be fetched automatically

### Colors

The color scheme can be customized in `tailwind.config.js`. The primary color is set to blue, but you can change it to match your brand.

### Images

Replace the placeholder project images in `src/constants/index.js` or via API with your own images.

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── sections/        # Page sections
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Projects.jsx
│   │       └── Contact.jsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useProjects.js
│   │   ├── usePersonalInfo.js
│   │   ├── useSkills.js
│   │   └── useContact.js
│   ├── services/            # API services
│   │   └── api.js
│   ├── utils/               # Utility functions
│   │   └── scrollTo.js
│   ├── constants/           # Static data & config
│   │   └── index.js
│   ├── config/              # Configuration
│   │   └── api.js
│   ├── styles/              # Stylesheets
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── backend-example/         # Example backend server
│   ├── server.js
│   └── package.json
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── README.md
└── README_API.md
```

## Folder Organization

The project is organized into logical folders:

- **`components/layout/`** - Reusable layout components (Header, Footer)
- **`components/sections/`** - Main page sections (Hero, About, Projects, Contact)
- **`hooks/`** - Custom React hooks for data fetching and state management
- **`services/`** - API service layer for HTTP requests
- **`utils/`** - Helper functions and utilities
- **`constants/`** - Static data and configuration
- **`config/`** - App configuration files
- **`styles/`** - Global stylesheets

## Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration (optional)
VITE_API_BASE_URL=http://localhost:3000/api
```

If not provided, the app will use static data from constants.

## License

MIT License - feel free to use this for your portfolio!

## Credits

Built with ❤️ using React.js and Framer Motion