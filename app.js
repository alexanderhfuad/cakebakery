// app.js - Express Server untuk Hostinger
// Tempat file ini: public_html/app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ============ MIDDLEWARE ============
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============ LOGGING ============
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============ SERVE FRONTEND STATIC FILES ============
app.use(express.static(path.join(__dirname, 'dist')));

// ============ HEALTH CHECK ============
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    uptime: process.uptime()
  });
});

// ============ API ROUTES ============
// Import routes di sini jika ada
// const contactRoutes = require('./routes/contact');
// app.use('/api/contact', contactRoutes);

// Contoh contact endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Name, email, and message are required.'
      });
    }

    // TODO: Save to database (Supabase)
    console.log('Received contact:', { name, email, phone, message });

    res.json({
      success: true,
      message: 'Message received. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to submit contact form.'
    });
  }
});

// ============ SPA FALLBACK ============
// Semua route yang tidak match API, serve index.html untuk React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).json({
        error: 'Failed to load application',
        path: req.path
      });
    }
  });
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

// ============ START SERVER ============
app.listen(PORT, () => {
  console.log(`
    🍰 Brielicious Bakery Server
    ============================
    Server running on port ${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    Client URL: ${process.env.CLIENT_URL || 'not configured'}
    
    API Health: http://localhost:${PORT}/api/health
  `);
});

// ============ GRACEFUL SHUTDOWN ============
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

module.exports = app;
