import express from 'express';
import { protect } from '../middleware/auth.js';
import { paymentLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.use(protect);

router.post('/create-order', paymentLimiter, (req, res) => {
  res.json({ success: true, message: 'Create Razorpay order' });
});

router.post('/verify', (req, res) => {
  res.json({ success: true, message: 'Verify payment' });
});

export default router;