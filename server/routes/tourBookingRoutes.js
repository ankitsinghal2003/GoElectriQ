import express from 'express';
import { protect } from '../middleware/auth.js';
import { createTourBooking } from '../controllers/tourBookingController.js';

const router = express.Router();
router.post('/', protect, createTourBooking);

export default router;
