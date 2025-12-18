# GitHub Pages Setup Guide

## Quick Start

1. **Enable GitHub Pages**:
   - Go to your repository → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save

2. **Push to main branch**:
   ```bash
   git push origin main
   ```

3. **Wait for deployment**:
   - Check the **Actions** tab in your repository
   - Once complete, your site will be live at:
     - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Important: Contact Form Limitation

⚠️ **API routes don't work on GitHub Pages** (static hosting only).

The contact form (`/api/contact`) will **not work** on GitHub Pages. You have these options:

### Option 1: Use Vercel (Recommended)
Deploy to Vercel for full functionality including API routes.

### Option 2: Use a Third-Party Form Service
Update the contact form to use:
- [Formspree](https://formspree.io/) - Free tier available
- [EmailJS](https://www.emailjs.com/) - Free tier available  
- [Web3Forms](https://web3forms.com/) - Free, no signup required

### Option 3: Point to Vercel API
- Deploy full site to Vercel
- Update contact form on GitHub Pages to call your Vercel API endpoint:
  ```typescript
  const response = await fetch('https://your-site.vercel.app/api/contact', {
    method: 'POST',
    // ...
  });
  ```

## Custom Base Path

The workflow **automatically detects** your repository name and sets the base path. If you need to override it manually (e.g., if your GitHub Pages URL is different from your repo name), you can modify the workflow:

```yaml
BASE_PATH: '/your-custom-path'
```

**Note**: The base path should match your GitHub Pages URL structure:
- If your site is at `username.github.io/repo-name/`, use `/repo-name`
- If your site is at `username.github.io/` (user page), use `''` (empty string)

## Troubleshooting

### 404 Errors for Assets (JS, CSS, Fonts)

If you're seeing 404 errors for `/_next/static/...` files, this means the `basePath` isn't set correctly. 

**The workflow now automatically detects your repository name**, but if you're still getting errors:

1. **Check your repository name**: Your GitHub Pages URL should be `username.github.io/REPO_NAME/`
2. **Verify the workflow**: The workflow automatically sets `BASE_PATH` to `/REPO_NAME`
3. **If your repo is named "portfolio"**: The BASE_PATH should be `/portfolio`
4. **Manual override**: If auto-detection doesn't work, edit `.github/workflows/deploy.yml` and set:
   ```yaml
   BASE_PATH: '/your-actual-repo-name'
   ```

### Other Issues

- **Build fails**: Check Actions tab for errors
- **Site not updating**: Wait a few minutes, clear cache
- **Contact form errors**: Expected - use one of the solutions above

