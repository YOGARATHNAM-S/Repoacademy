const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize Supabase
const { supabase } = require('../backend/config/firebase');

const repoRoutes = require('../backend/routes/repoRoutes');
const commentRoutes = require('../backend/routes/commentRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', repoRoutes);
app.use('/api', commentRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', app: 'Repolearn API' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Export for Vercel serverless
module.exports = app;
