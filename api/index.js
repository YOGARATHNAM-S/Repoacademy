const express = require('express');
const cors = require('cors');

// Supabase setup
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('ERROR: Missing SUPABASE_URL or SUPABASE_KEY');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
const repoRoutes = require('../backend/routes/repoRoutes');
const commentRoutes = require('../backend/routes/commentRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    app: 'RepoAcademy API',
    supabaseConnected: !!supabase
  });
});

// API Routes
app.use('/api', repoRoutes);
app.use('/api', commentRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error' 
  });
});

// Export for Vercel serverless
module.exports = app;
