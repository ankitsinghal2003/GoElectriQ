import express from 'express';
import { reverseGeocode, estimateDistance } from '../controllers/locationController.js';

const router = express.Router();

// GET /api/location/reverse-geocode?lat=...&lon=...
router.get('/reverse-geocode', reverseGeocode);

// POST /api/location/estimate { pickup, drop }
router.post('/estimate', estimateDistance);

export default router;
