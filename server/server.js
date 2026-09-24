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
const adminRoutes = require('./routes/adminRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const faqRoutes = require('./routes/faqRoutes');
const businessInfoRoutes = require('./routes/businessInfoRoutes');
const locationRoutes = require('./routes/locationRoutes');
const seoRoutes = require('./routes/seoRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const { autoSeedIfEmpty } = require('./utils/seedData');

const app = express();

// Connect DB & Bootstrap
connectDB().then(async () => {
  try {
    await autoSeedIfEmpty();
    console.log('[BOOTSTRAP] Database verification and auto-seed complete.');
  } catch (err) {
    console.error('[BOOTSTRAP ERROR]', err.message);
  }
});

// Security headers
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

// Comprehensive, robust CORS configuration
const cleanOrigin = (url) => (url ? url.trim().replace(/\/+$/, '') : '');

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    // Echo the exact requesting origin (sanitized without trailing slash)
    res.setHeader('Access-Control-Allow-Origin', cleanOrigin(origin));
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Respond immediately to OPTIONS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Enable standard cors middleware as well
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true,
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(mongoSanitize());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

// General API rate limiter
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 500 });
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

// Routes - Mounted on both /api/* and /* for universal client compatibility
const routes = [
  ['/auth', authRoutes],
  ['/admin', adminRoutes],
  ['/enquiries', enquiryRoutes],
  ['/services', serviceRoutes],
  ['/locations', locationRoutes],
  ['/gallery', galleryRoutes],
  ['/faqs', faqRoutes],
  ['/business-info', businessInfoRoutes],
  ['/seo', seoRoutes],
  ['/reviews', reviewRoutes],
];

routes.forEach(([routePath, router]) => {
  app.use(`/api${routePath}`, router);
  app.use(routePath, router);
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
