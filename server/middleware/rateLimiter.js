import { rateLimit } from 'express-rate-limit';

/**
 * General API rate limiter (skips auth - auth has its own limiter)
 */
export const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.originalUrl?.includes('/auth'),
});

/**
 * Auth route rate limiter (stricter)
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 attempts per window (was 5 - too strict for registration)
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.',
  },
});

/**
 * Payment route rate limiter
 */
export const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // 10 requests per window
  message: {
    success: false,
    message: 'Too many payment requests, please try again later.',
  },
});

/**
 * Booking route rate limiter
 */
export const bookingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 bookings per hour
  message: {
    success: false,
    message: 'Too many booking requests, please try again later.',
  },
});

/**
 * OTP rate limiter
 */
export const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 OTP requests per window
  message: {
    success: false,
    message: 'Too many OTP requests, please try again after 15 minutes.',
  },
});

export default {
  apiLimiter,
  authLimiter,
  paymentLimiter,
  bookingLimiter,
  otpLimiter,
};