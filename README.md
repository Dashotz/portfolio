# Francis Cruz - Portfolio Website

Hey there! 👋 This is my personal portfolio website where I showcase my work, skills, and experience as a full-stack developer. It's built with modern web technologies and features some cool animations and effects that I'm pretty proud of.

## What's Inside

This portfolio includes:

- **Hero Section** - A striking landing page with glitch effects and a matrix rain animation (because why not?)
- **About Me** - A bit about who I am and what I do
- **Work Experience** - My professional journey and the projects I've worked on
- **Tech Stack** - The technologies and tools I work with
- **Featured Projects** - A showcase of my best work with filtering options
- **Contact Form** - A way for people to reach out (powered by Resend)

## Tech Stack

I built this using:

- **Next.js 16** - For the React framework and server-side rendering
- **TypeScript** - Because type safety is a lifesaver
- **Tailwind CSS** - For styling (makes everything so much easier)
- **GSAP** - For smooth animations and scroll effects
- **Lenis** - For buttery smooth scrolling
- **Resend** - For handling contact form submissions

## Getting Started

If you want to run this locally (maybe you want to fork it or something), here's how:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser and you should see it running.

## Features I'm Particularly Proud Of

- **Scroll-triggered animations** - The "CREATIVE PROJECTS" title animates pixel by pixel as you scroll
- **Matrix rain background** - A binary rain effect in the hero section (changed from Japanese characters to 0s and 1s)
- **Glitch effects** - Applied to my name in the hero section
- **Smooth scrolling** - Everything feels really smooth thanks to Lenis
- **Mobile responsive** - Works great on all devices (I spent way too much time on this)
- **Custom scrollbar** - Sharp edges to match the dark tech theme

## Deployment

I've set this up to deploy on both Vercel and GitHub Pages:

### Vercel (Primary - Recommended)
- Full functionality including API routes
- Automatic deployments on push to main branch
- Just connect your GitHub repo and add environment variables
- **Live URL**: https://portfolio-frncszxc.vercel.app

### GitHub Pages (Redirects to Vercel)
- **GitHub Pages now automatically redirects to Vercel** for the best user experience
- The redirect ensures all images, videos, and API routes work correctly
- Uses GitHub Actions for automatic deployment
- **Live URL**: https://dashotz.github.io/portfolio/ (redirects to Vercel)

#### How the Redirect Works

When someone visits `dashotz.github.io/portfolio`, they are automatically redirected to the Vercel deployment. This ensures:
- ✅ All images and videos load correctly
- ✅ Contact form API routes work properly
- ✅ No basePath issues with static assets
- ✅ Consistent experience across all features

The redirect is automatically created during the build process using the `build:github` script.

## Contact Form Setup

The contact form uses Resend to send emails. You'll need to:

1. Get a Resend API key from [resend.com](https://resend.com)
2. Create a `.env.local` file with:
   ```
   RESEND_API_KEY=your_api_key_here
   RESEND_FROM_EMAIL=your_verified_email@domain.com
   RESEND_TO_EMAIL=where_you_want_emails_sent@email.com
   ```

## Security

This site implements several security measures to protect against common web vulnerabilities:

- **XSS Protection** - All user input is sanitized to prevent Cross-Site Scripting attacks. HTML characters are escaped before processing.
- **Input Validation** - All form fields are validated on the server side, including email format validation using regex patterns.
- **Type Safety** - Built with TypeScript to catch type-related errors at compile time.
- **Environment Variables** - Sensitive data like API keys are stored securely in environment variables and never exposed to the client.
- **React Strict Mode** - Enabled for additional development warnings and checks.
- **Security Headers** - Next.js security headers are configured (e.g., `poweredByHeader: false` to hide framework information).
- **Error Handling** - Comprehensive error handling prevents information leakage through error messages.

The contact form API route includes server-side validation, HTML sanitization, and proper error handling to ensure secure form submissions.

## Customization

Want to use this as a template? Go for it! Just:

1. Update the content in the component files
2. Replace the project images in the `public` folder
3. Update the metadata in `app/layout.tsx`
4. Change the colors in `app/globals.css` if you want a different theme
5. Update the Vercel URL in `scripts/create-github-redirect.js` if deploying your own version

## Fonts

I'm using **JetBrains Mono** as the primary font to match the tech/developer aesthetic. You can change this in `app/layout.tsx` if you prefer something else.

## License

Feel free to use this as inspiration or fork it for your own portfolio. Just give credit where it's due if you do!

---

Built with ❤️ by Francis Cruz
