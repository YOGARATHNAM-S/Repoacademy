# Vercel Deployment Instructions

## Frontend Setup
1. Connect your GitHub repo to Vercel
2. Set these environment variables in Vercel Dashboard:
   - `VITE_API_URL` = `https://your-project.vercel.app/api` (same Vercel project URL)

## Backend Setup  
3. No additional setup needed - Vercel will auto-detect the `/api` folder and deploy as serverless functions

## Deployment Steps
1. Push code to GitHub: `git push origin main`
2. Go to https://vercel.com/new
3. Import GitHub repository
4. Add environment variables
5. Click Deploy

## After Deployment
- Update `.env.production` with your actual Vercel URL
- Rebuild and redeploy if you change environment variables
