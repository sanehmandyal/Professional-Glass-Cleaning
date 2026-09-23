require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const faqRoutes = require('./routes/faqRoutes');
const businessInfoRoutes = require('./routes/businessInfoRoutes');
const locationRoutes = require('./routes/locationRoutes');
const seoRoutes = require('./routes/seoRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

connectDB();

// Security & core middleware
app.use(helmet());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://professional-glass-cleaning.vercel.app',
  ...(process.env.CLIENT_URL ? [process.env.CLIENT_URL] : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }
      callback(null, true); // Permissive fallback to prevent breaking cross-domain requests
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// General API rate limiter
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api', apiLimiter);

// Root endpoint & Health checks (for Render health checks, browser tests & uptime monitoring)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Professional Glass Cleaning Service API is live and operational.',
    environment: process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      services: '/api/services',
      locations: '/api/locations',
      reviews: '/api/reviews',
      faqs: '/api/faqs',
      enquiries: '/api/enquiries',
      businessInfo: '/api/business-info',
      seo: '/api/seo',
    },
  });
});

app.get('/health', (req, res) => res.status(200).json({ success: true, message: 'Server is healthy' }));
app.get('/api/health', (req, res) => res.status(200).json({ success: true, message: 'API is running' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/business-info', businessInfoRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
