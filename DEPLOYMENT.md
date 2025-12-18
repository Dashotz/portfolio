# Deploying to Vercel

This guide will help you deploy your Next.js website to Vercel.

## Prerequisites

1. A GitHub account (recommended) or GitLab/Bitbucket account
2. A Vercel account (sign up at [vercel.com](https://vercel.com))
3. Your code pushed to a Git repository

## Step 1: Push Your Code to GitHub

If you haven't already, push your code to a GitHub repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com) and sign in (or sign up with GitHub)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Select your repository and click "Import"

3. **Configure Project**:
   - **Framework Preset**: Vercel will auto-detect Next.js (should show "Next.js")
   - **Root Directory**: Leave as `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**:
   Before deploying, click "Environment Variables" and add:
   
   - `RESEND_API_KEY` = Your Resend API key (starts with `re_`)
   - `RESEND_FROM_EMAIL` = Your verified sender email (e.g., `onboarding@resend.dev` or your verified domain email)
   - `RESEND_TO_EMAIL` = Your recipient email (e.g., `dashotz14@gmail.com`)

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete (usually 1-3 minutes)
   - Your site will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project or create new one
   - Confirm settings
   - Add environment variables when prompted

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Step 3: Configure Environment Variables

**Important**: Your `.env.local` file is not deployed. You must add environment variables in Vercel:

1. Go to your project dashboard on Vercel
2. Click "Settings" → "Environment Variables"
3. Add each variable:
   - `RESEND_API_KEY` (Production, Preview, Development)
   - `RESEND_FROM_EMAIL` (Production, Preview, Development)
   - `RESEND_TO_EMAIL` (Production, Preview, Development)

4. **Redeploy** after adding environment variables:
   - Go to "Deployments" tab
   - Click the three dots (⋯) on the latest deployment
   - Click "Redeploy"

## Step 4: Custom Domain (Optional)

1. Go to your project → "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Vercel will automatically provision SSL certificates

## Troubleshooting

### Build Errors

- **Check build logs**: Go to your deployment → "Build Logs"
- **Common issues**:
  - Missing environment variables → Add them in Vercel dashboard
  - TypeScript errors → Fix locally and push again
  - Missing dependencies → Check `package.json`

### Email Not Working

- **Verify environment variables**: Check they're set correctly in Vercel
- **Check Resend dashboard**: Verify your API key and email domain
- **Check function logs**: Go to Vercel dashboard → "Functions" → View logs

### Environment Variables Not Working

- Make sure you've added them in Vercel dashboard (Settings → Environment Variables)
- Redeploy after adding environment variables
- Check that variable names match exactly (case-sensitive)

## Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy every push to `main` branch (production)
- Create preview deployments for pull requests
- Run builds automatically

## Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Remove deployment
vercel remove [project-name]
```

## Next Steps

- Set up a custom domain
- Configure preview deployments for branches
- Set up monitoring and analytics
- Configure redirects/rewrites if needed

