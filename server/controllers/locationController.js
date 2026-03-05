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

    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`;

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
