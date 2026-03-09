import api from './api.js';

/**
 * Estimate distance between pickup and drop
 * @param {string} pickup - Pickup address
 * @param {string} drop - Drop address
 * @param {{ lat: number, lon: number } | null} pickupCoords - Precise pickup coords when from geolocation
 * @returns {Promise<{ distance: number, duration: number }>}
 */
export async function estimateDistance(pickup, drop, pickupCoords = null) {
  const body = { pickup, drop };
  if (pickupCoords && typeof pickupCoords.lat === 'number' && typeof pickupCoords.lon === 'number') {
    body.pickupCoords = { lat: pickupCoords.lat, lon: pickupCoords.lon };
  }
  const { data } = await api.post('/location/estimate', body);
  if (!data?.success || !data?.data) throw new Error(data?.message || 'Failed to estimate distance');
  return data.data;
}

/**
 * Reverse geocode: convert lat/lon to human-readable address
 * Uses backend first; falls back to Nominatim if backend fails
 * @returns {Promise<{ address: string, lat: number, lon: number }>}
 */
export async function reverseGeocode(lat, lon) {
  try {
    const { data } = await api.get('/location/reverse-geocode', {
      params: { lat, lon },
    });
    if (data?.success && data?.data?.address) {
      return data.data;
    }
  } catch (_) {
    /* Backend failed, use fallback */
  }
  return fallbackNominatim(lat, lon);
}

/** Direct Nominatim call when backend is unavailable */
async function fallbackNominatim(lat, lon) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1&zoom=18`,
    { headers: { 'Accept-Language': 'en', 'User-Agent': 'GoElectriQ/1.0' } }
  );
  if (!res.ok) throw new Error('Geocoding unavailable');
  const data = await res.json();
  const addr = data?.address;
  let address = data?.display_name || '';
  if (addr) {
    const parts = [
      addr.house_number,
      addr.road,
      addr.suburb || addr.neighbourhood || addr.quarter,
      addr.village || addr.town || addr.city || addr.municipality || addr.county,
      addr.state,
      addr.postcode,
      addr.country,
    ].filter(Boolean);
    address = parts.join(', ') || address;
  }
  return { address: address || `${lat.toFixed(6)}, ${lon.toFixed(6)}`, lat, lon };
}
