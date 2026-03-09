import { useState, useEffect, useCallback } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { reverseGeocode, estimateDistance } from '../services/locationService.js';
import backgroundImage from '../assets/Background.jpg';

const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 30000,
  maximumAge: 0,
};

const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 768;

export default function Hero() {
  const navigate = useNavigate();
  const [bookingType, setBookingType] = useState('now');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null); // Precise lat/lon when detected
  const [dropLocation, setDropLocation] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const isDarkMode = useTheme().theme === 'dark';

  const fetchAddressFromCoords = useCallback(async (latitude, longitude) => {
    try {
      const result = await reverseGeocode(latitude, longitude);
      return result?.address || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    } catch {
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
  }, []);

  const handleLocationSuccess = useCallback(
    async (position) => {
      const { latitude, longitude } = position.coords;
      // Store precise coordinates (avoid re-geocoding loss)
      setPickupCoords({ lat: latitude, lon: longitude });
      const address = await fetchAddressFromCoords(latitude, longitude);
      setPickupLocation(address);
    },
    [fetchAddressFromCoords]
  );

  const handleLocationError = useCallback((err, isOnLoad = false) => {
    if (!isOnLoad) {
      if (err.code === 1) {
        setLocationError('Location access denied. Please allow location permission.');
      } else if (err.code === 2) {
        setLocationError('Location unavailable. Please try again.');
      } else {
        setLocationError('Could not detect location. Please enter manually.');
      }
    }
  }, []);

  const requestLocation = useCallback(
    (onLoad = false) => {
      setLocationError('');
      setLocationLoading(true);
      setPickupCoords(null);

      if (!navigator.geolocation) {
        setLocationError('Geolocation is not supported by your browser.');
        setLocationLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          await handleLocationSuccess(position);
          setLocationLoading(false);
        },
        (err) => {
          setLocationLoading(false);
          handleLocationError(err, onLoad);
        },
        GEOLOCATION_OPTIONS
      );
    },
    [handleLocationSuccess, handleLocationError]
  );

  const handleDetectLocation = () => requestLocation(false);

  const handleSeePrices = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!pickupLocation.trim()) {
      setSubmitError('Please enter or detect your pickup address.');
      return;
    }
    if (!dropLocation.trim()) {
      setSubmitError('Please enter your drop address.');
      return;
    }
    setSubmitLoading(true);
    try {
      const { distance, duration } = await estimateDistance(
        pickupLocation.trim(),
        dropLocation.trim(),
        pickupCoords
      );
      navigate('/cityride', {
        state: {
          pickupLocation: pickupLocation.trim(),
          dropLocation: dropLocation.trim(),
          pickupCoords,
          estimatedDistance: distance,
          estimatedDuration: duration,
          scheduleLater: bookingType === 'later',
        },
      });
    } catch (err) {
      setSubmitError(err?.message || 'Could not calculate distance. Please check the addresses.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Ask for location on load — only on desktop (laptop), not mobile
  useEffect(() => {
    if (!isDesktop()) return;
    requestLocation(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-[28rem] sm:min-h-[34rem] lg:min-h-[38rem] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay – subtle in light mode (image prominent), darker in dark mode for text contrast */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${isDarkMode ? 'from-gray-950/60 via-gray-950/50 to-gray-950/65' : 'from-white/15 via-white/10 to-white/20'}`}
        aria-hidden
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight ${isDarkMode ? 'text-gray-100 [text-shadow:_0_1px_4px_rgba(0,0,0,0.9)]' : 'text-[#0f172a] [text-shadow:_0_1px_3px_rgba(255,255,255,0.8)]'}`}>
              Go anywhere with{' '}
              <span className="text-[#FBBF24]">GoElectriQ</span>
            </h1>
            <p className={`text-lg max-w-xl ${isDarkMode ? 'text-gray-300 [text-shadow:_0_1px_2px_rgba(0,0,0,0.7)]' : 'text-gray-900 [text-shadow:_0_1px_2px_rgba(255,255,255,0.9)]'}`}>
            Sustainable electric rides crafted for seamless city travel, stress-free airport transfers, and curated tours — combining comfort, innovation, and a commitment to a greener tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  const travelToursSection = document.getElementById('travel-tours');
                  travelToursSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 bg-[#FBBF24] text-gray-900 font-semibold border-2 border-[#FBBF24] rounded-lg hover:bg-[#F59E0B] transition-colors shadow-md hover:shadow-lg"
              >
                Explore Tours
              </button>
            </div>
          </div>

          {/* Right Side - Booking Card: dark in light mode, light in dark mode */}
          <div className={`backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border ${isDarkMode ? 'bg-white/95 border-gray-200' : 'bg-[#343434]/95 border-[#4a4a4a]'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-gray-800' : 'text-white'}`}>Book your ride</h2>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => setBookingType('now')}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  bookingType === 'now'
                    ? 'bg-[#FBBF24] text-gray-900 font-semibold shadow-md'
                    : isDarkMode ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-[#4a4a4a] text-gray-300 hover:bg-[#5a5a5a]'
                }`}
              >
                Pickup now
              </button>
              <button
                type="button"
                onClick={() => setBookingType('later')}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  bookingType === 'later'
                    ? 'bg-[#FBBF24] text-gray-900 font-semibold shadow-md'
                    : isDarkMode ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-[#4a4a4a] text-gray-300 hover:bg-[#5a5a5a]'
                }`}
              >
                Schedule later
              </button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* Pickup Address */}
              <div>
                <label htmlFor="pickup" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                  Pickup address
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden />
                  <input
                    id="pickup"
                    type="text"
                    name="pickup"
                    placeholder="Enter or detect your pickup location"
                    value={pickupLocation}
                    onChange={(e) => {
                      setPickupLocation(e.target.value);
                      setPickupCoords(null);
                    }}
                    className={`w-full pl-12 pr-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FBBF24] ${isDarkMode ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500' : 'bg-[#4a4a4a] border-[#5a5a5a] text-white placeholder-gray-400'}`}
                  />
                </div>
              </div>

              {/* Drop Address */}
              <div>
                <label htmlFor="drop" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                  Drop address
                </label>
                <div className="relative">
                  <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} aria-hidden />
                  <input
                    id="drop"
                    type="text"
                    name="drop"
                    placeholder="Where do you want to go?"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    className={`w-full pl-12 pr-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FBBF24] ${isDarkMode ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500' : 'bg-[#4a4a4a] border-[#5a5a5a] text-white placeholder-gray-400'}`}
                  />
                </div>
              </div>

              {/* Detect Location Button */}
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={locationLoading}
                className={`flex items-center justify-center w-full py-3 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed border ${isDarkMode ? 'text-[#1DA1F2] hover:bg-gray-100 border-gray-200' : 'text-[#FBBF24] hover:bg-[#4a4a4a] border-[#5a5a5a]'}`}
              >
                {locationLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Detecting your address...
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5 mr-2" />
                    Detect current location
                  </>
                )}
              </button>
              {locationError && (
                <p className="text-sm text-red-500 px-1">{locationError}</p>
              )}
              {submitError && (
                <p className="text-sm text-red-500 px-1">{submitError}</p>
              )}

              {/* See Prices Button */}
              <button
                type="button"
                onClick={handleSeePrices}
                disabled={submitLoading}
                className="block w-full py-4 bg-[#FBBF24] text-gray-900 font-semibold rounded-lg hover:bg-[#F59E0B] transition-colors shadow-md text-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline-block mr-2" />
                    Calculating...
                  </>
                ) : (
                  'See Prices'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}