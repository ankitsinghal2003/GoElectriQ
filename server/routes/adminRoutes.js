import express from 'express';
import { protect } from '../middleware/auth.js';
import { isAdmin } from '../middleware/roleCheck.js';
import { uploadImageMemory } from '../config/multer.js';
import { uploadPackageImage } from '../controllers/uploadController.js';
import {
  getAllBookings,
  getAnalytics,
  createPackage,
  getAdminPackages,
  getAdminTourBookings,
  updateTourBookingStatus,
  updatePackage,
  deletePackage,
  getAdminFeedback,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect);
router.use(isAdmin);

router.get('/bookings', getAllBookings);
router.get('/tour-bookings', getAdminTourBookings);
router.patch('/tour-bookings/:id', updateTourBookingStatus);
router.get('/analytics', getAnalytics);
router.get('/feedback', getAdminFeedback);
router.get('/packages', getAdminPackages);
router.post('/packages', createPackage);
router.post('/upload-image', uploadImageMemory.single('image'), uploadPackageImage);
router.put('/packages/:id', updatePackage);
router.delete('/packages/:id', deletePackage);

export default router;