import express from 'express';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/roleCheck.js';
import {
  getAllBookings,
  getAnalytics,
  createPackage,
  getAdminPackages,
  getAdminTourBookings,
  updateTourBookingStatus,
  updatePackage,
  deletePackage,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect);
router.use(isAdmin);

router.get('/bookings', getAllBookings);
router.get('/tour-bookings', getAdminTourBookings);
router.patch('/tour-bookings/:id', updateTourBookingStatus);
router.get('/analytics', getAnalytics);
router.get('/packages', getAdminPackages);
router.post('/packages', createPackage);
router.put('/packages/:id', updatePackage);
router.delete('/packages/:id', deletePackage);

export default router;