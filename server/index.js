import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
// express-mongo-sanitize is incompatible with Express 5 (req.query/params getters)
// TODO: switch to mongo-sanitizer when ready, or downgrade to Express 4
// import mongoSanitize from 'express-mongo-sanitize';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables (from server directory so .env is found when run from project root)
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '.env') });

// Import configurations
import connectDB from './config/database.js';
// TODO: enable when email/WhatsApp needed
// import { verifyEmailConfig } from './config/nodemailer.js';
// import { verifyWhatsAppConfig } from './config/whatsapp.js';

// Import middleware
import errorHandler, { notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import tourBookingRoutes from './routes/tourBookingRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import pricingRoutes from './routes/pricingRoutes.js';
import locationRoutes from './routes/locationRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Connect to database
connectDB();

// TODO: enable when email/WhatsApp needed
// verifyEmailConfig();
// verifyWhatsAppConfig();

// Middleware

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize data (disabled - express-mongo-sanitize incompatible with Express 5)
// app.use(mongoSanitize());

// Compression
app.use(compression());

// Logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api/', apiLimiter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/tour-bookings', tourBookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/feedback', feedbackRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Electric Cab Booking API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log('\n🚀 ======================================');
  console.log(`   Server running in ${process.env.NODE_ENV} mode`);
  console.log(`   Port: ${PORT}`);
  console.log(`   URL: http://localhost:${PORT}`);
  console.log('======================================\n');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully');
  server.close(() => {
    console.log('💀 Process terminated');
  });
});

export default app;