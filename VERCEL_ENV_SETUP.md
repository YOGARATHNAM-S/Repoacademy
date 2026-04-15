# Vercel Environment Variables Setup Guide

## Add these to your Vercel Dashboard:

Go to: https://vercel.com/YOGARATHNAM-S/repo-academy/settings/environment-variables

### Backend Environment Variables:
- `SUPABASE_URL` = (your Supabase URL)
- `SUPABASE_KEY` = (your Supabase API key)
- `NODE_ENV` = `production`

### Frontend Environment Variables:
- `VITE_API_URL` = `/api`
- `NEXT_PUBLIC_SUPABASE_URL` = `https://echfclurlcqujuqtgner.supabase.co`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` = `sb_publishable_jUi3wUSOQ5SDxZA1EODwJQ_ZnRGulio`

## After adding:
1. Go to "Deployments" tab
2. Click on the latest deployment
3. Click "Redeploy" button
4. Wait for build to complete
