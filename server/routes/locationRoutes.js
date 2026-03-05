import express from 'express';
import { reverseGeocode } from '../controllers/locationController.js';

const router = express.Router();

// GET /api/location/reverse-geocode?lat=...&lon=...
router.get('/reverse-geocode', reverseGeocode);

export default router;
