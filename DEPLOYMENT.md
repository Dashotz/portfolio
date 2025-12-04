# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## Prerequisites

- A GitHub account
- Your portfolio repository on GitHub
- Git installed on your local machine

## Step 1: Update Base Path

**Important:** Update the `base` path in `vite.config.ts` based on your repository name:

- **If your repo is named `portfolio`**: Keep it as `/portfolio/`
- **If your repo is named `username.github.io`**: Change it to `/`
- **If your repo has a different name**: Change `/portfolio/` to `/your-repo-name/`

Example:
```typescript
base: '/your-repo-name/',  // Replace with your actual repository name
```

## Step 2: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. Save the settings

## Step 3: Push to GitHub

1. Make sure all your changes are committed:
```bash
git add .
git commit -m "Prepare for GitHub Pages deployment"
```

2. Push to GitHub:
```bash
git push origin main
```

## Step 4: Automatic Deployment

The GitHub Actions workflow will automatically:
- Build your project
- Deploy it to GitHub Pages
- Make it available at: `https://your-username.github.io/portfolio/`

**Note:** If your repository is named `username.github.io`, it will be available at:
`https://your-username.github.io/`

## Step 5: Verify Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow run called "Deploy to GitHub Pages"
3. Wait for it to complete (green checkmark)
4. Visit your site at the URL shown in the workflow

## Manual Deployment (Alternative)

If you prefer to deploy manually:

1. Install `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Build and deploy:
```bash
npm run deploy
```

3. Go to repository Settings > Pages and set source to `gh-pages` branch

## Troubleshooting

### 404 Error or Blank Page

- Check that the `base` path in `vite.config.ts` matches your repository name
- Ensure the GitHub Actions workflow completed successfully
- Clear your browser cache and try again

### Assets Not Loading

- Verify the base path is correct
- Check browser console for 404 errors
- Ensure all image paths are correct

### Build Fails

- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain:
```
yourdomain.com
```

2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## Updating Your Site

Every time you push to the `main` branch, GitHub Actions will automatically rebuild and redeploy your site. No manual steps needed!

