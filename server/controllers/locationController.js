import { calculateHaversineDistance } from '../utils/distanceCalculator.js';

/**
 * Geocode address to precise coordinates using Nominatim
 */
const geocodeAddress = async (address) => {
  const encoded = encodeURIComponent(address);
  const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;
  const response = await fetch(url, {
    headers: { 'User-Agent': 'GoElectriQ/1.0 (Electric Cab Booking)' },
  });
  if (!response.ok) throw new Error('Geocoding unavailable');
  const data = await response.json();
  if (!data || data.length === 0) throw new Error('Address not found');
  const lat = parseFloat(data[0].lat);
  const lon = parseFloat(data[0].lon);
  return { lat: parseFloat(lat.toFixed(8)), lon: parseFloat(lon.toFixed(8)) };
};

const ROAD_DISTANCE_FACTOR = 1.3; // Haversine is straight-line; road distance ~30% longer in urban areas

/**
 * Estimate distance between pickup and drop
 * POST /api/location/estimate { pickup, drop, pickupCoords?: { lat, lon } }
 * Uses precise coordinates when provided; otherwise geocodes addresses
 */
export const estimateDistance = async (req, res) => {
  try {
    const { pickup, drop, pickupCoords: providedPickupCoords } = req.body;
    if (!pickup || !drop || typeof pickup !== 'string' || typeof drop !== 'string' || !pickup.trim() || !drop.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Pickup and drop addresses are required',
      });
    }

    let pickupCoords;
    if (providedPickupCoords && typeof providedPickupCoords.lat === 'number' && typeof providedPickupCoords.lon === 'number') {
      pickupCoords = {
        lat: parseFloat(providedPickupCoords.lat.toFixed(8)),
        lon: parseFloat(providedPickupCoords.lon.toFixed(8)),
      };
    } else {
      pickupCoords = await geocodeAddress(pickup.trim());
    }

    const dropCoords = await geocodeAddress(drop.trim());
    const straightLineKm = calculateHaversineDistance(
      pickupCoords.lat,
      pickupCoords.lon,
      dropCoords.lat,
      dropCoords.lon
    );
    const distance = parseFloat((straightLineKm * ROAD_DISTANCE_FACTOR).toFixed(2));
    const duration = Math.ceil((distance / 30) * 60);
    res.json({
      success: true,
      data: { distance, duration, pickupCoords, dropCoords },
    });
  } catch (err) {
    console.error('Estimate distance error:', err.message);
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to estimate distance',
    });
  }
};

/**
 * Reverse geocode coordinates to human-readable address
 * Uses OpenStreetMap Nominatim API (no API key required)
 */
export const reverseGeocode = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required',
      });
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid coordinates',
      });
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({
        success: false,
        message: 'Coordinates out of valid range',
      });
    }

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=18`;

    const response = await fetch(url, {
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'GoElectriQ/1.0 (Electric Cab Booking)',
      },
    });

    if (!response.ok) {
      throw new Error('Geocoding service unavailable');
    }

    const data = await response.json();

    const address = data?.address;
    let displayAddress = data?.display_name || '';

    if (address) {
      const parts = [
        address.house_number,
        address.road,
        address.suburb || address.neighbourhood || address.quarter,
        address.village || address.town || address.city || address.municipality || address.county,
        address.state,
        address.postcode,
        address.country,
      ].filter(Boolean);
      displayAddress = parts.join(', ') || displayAddress;
    }

    res.json({
      success: true,
      data: {
        address: displayAddress,
        lat: latitude,
        lon: longitude,
        raw: data,
      },
    });
  } catch (err) {
    console.error('Reverse geocode error:', err.message);
    res.status(500).json({
      success: false,
      message: err.message || 'Failed to get address from coordinates',
    });
  }
};
