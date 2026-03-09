import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, ChevronLeft, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import Footer from '../components/Footer';
import { estimateDistance } from '../services/locationService.js';

const carTypes = [
  { id: 'mini', name: 'Mini Car', price: 10, passengers: 4 },
  { id: 'sedan', name: 'Sedan', price: 14, passengers: 4 },
  { id: 'suv', name: 'SUV', price: 18, passengers: 6 },
];

const dates = [
  { day: 'Fri', date: '20', label: 'Today', month: 'Feb' },
  { day: 'Sat', date: '21', label: 'Tomorrow', month: 'Feb' },
  { day: 'Sun', date: '22', label: 'Feb', month: 'Feb' },
  { day: 'Mon', date: '23', label: 'Feb', month: 'Feb' },
  { day: 'Tue', date: '24', label: 'Feb', month: 'Feb' },
  { day: 'Wed', date: '25', label: 'Feb', month: 'Feb' },
  { day: 'Thu', date: '26', label: 'Feb', month: 'Feb' },
];

export default function CityRidePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const state = location.state || {};
  const scheduleLater = state.scheduleLater === true;
  const initialPickup = state.pickupLocation || '';
  const pickupCoordsFromHero = state.pickupCoords || null;
  const [pickupLocation, setPickupLocation] = useState(initialPickup);
  const [dropLocation, setDropLocation] = useState(state.dropLocation || '');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCar, setSelectedCar] = useState('mini');
  const [estimatedDistance, setEstimatedDistance] = useState(state.estimatedDistance ?? 15);
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [distanceError, setDistanceError] = useState('');

  const selectedCarData = carTypes.find(car => car.id === selectedCar);
  const totalPrice = selectedCarData ? selectedCarData.price * estimatedDistance : 0;

  useEffect(() => {
    if (!pickupLocation.trim() || !dropLocation.trim()) return;
    const usePickupCoords = pickupCoordsFromHero && pickupLocation.trim() === initialPickup.trim();
    const timer = setTimeout(async () => {
      setDistanceLoading(true);
      setDistanceError('');
      try {
        const { distance } = await estimateDistance(
          pickupLocation.trim(),
          dropLocation.trim(),
          usePickupCoords ? pickupCoordsFromHero : null
        );
        setEstimatedDistance(distance);
      } catch {
        setDistanceError('Could not calculate distance');
      } finally {
        setDistanceLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [pickupLocation, dropLocation, initialPickup, pickupCoordsFromHero]);

  return (
    <div className={`min-h-screen font-['Poppins'] transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-[#fafafa]'}`}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <button 
              onClick={() => navigate('/')}
              className={`flex items-center mb-4 transition-colors ${isDark ? 'text-gray-300 hover:text-white' : 'text-[#64748b] hover:text-[#0f172a]'}`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1">Back</span>
            </button>
            <h1 className={`text-2xl md:text-3xl font-semibold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>Book City Ride</h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-[#64748b]'}`}>Fill in the details to complete your booking</p>
          </div>

          {/* Booking Card */}
          <div className={`rounded-xl shadow-lg p-6 md:p-8 ${isDark ? 'bg-gray-900/95 border border-gray-800' : 'bg-white border border-[#E5E7EB]'}`}>
            {/* Pickup Location */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-[#0f172a]'}`}>
                Pickup Location
              </label>
              <div className="relative">
                <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-[#64748b]'}`} />
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CE65C] focus:border-transparent ${
                    isDark ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' : 'bg-white border border-[#E5E7EB] text-[#0f172a] placeholder-gray-400'
                  }`}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5CE65C] hover:text-[#4ED84E] transition-colors">
                  <Navigation className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drop Location */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-[#0f172a]'}`}>
                Drop Location
              </label>
              <div className="relative">
                <MapPin className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-[#64748b]'}`} />
                <input
                  type="text"
                  placeholder="Enter drop location"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CE65C] focus:border-transparent ${
                    isDark ? 'bg-gray-800 border border-gray-700 text-white placeholder-gray-500' : 'bg-white border border-[#E5E7EB] text-[#0f172a] placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Date & Time Selector - only for Schedule Later */}
            {scheduleLater && (
              <>
                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-[#0f172a]'}`}>
                    Select Date
                  </label>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {dates.map((date, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedDate(index)}
                        className={`shrink-0 px-5 py-3 rounded-lg border-2 transition-all ${
                          selectedDate === index
                            ? 'bg-[#5CE65C]/20 border-[#5CE65C] text-white'
                            : isDark
                              ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-[#5CE65C]'
                              : 'bg-white border-[#E5E7EB] text-[#64748b] hover:border-[#5CE65C]'
                        }`}
                      >
                        <div className="text-xs font-medium">{date.day}</div>
                        <div className="text-xl font-semibold mt-1">{date.date}</div>
                        <div className="text-xs mt-1">{date.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-[#0f172a]'}`}>
                    Select Time
                  </label>
                  <div className="relative">
                    <Clock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-[#64748b]'}`} />
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CE65C] focus:border-transparent appearance-none ${
                        isDark ? 'bg-gray-800 border border-gray-700 text-white' : 'bg-white border border-[#E5E7EB] text-[#0f172a]'
                      }`}
                    >
                      <option value="">Select Time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Car Type Selection */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-[#0f172a]'}`}>
                Select Car Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {carTypes.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => setSelectedCar(car.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedCar === car.id
                        ? 'bg-[#5CE65C]/20 border-[#5CE65C]'
                        : isDark
                          ? 'bg-gray-800 border-gray-700 hover:border-[#5CE65C]'
                          : 'bg-white border-[#E5E7EB] hover:border-[#5CE65C]'
                    }`}
                  >
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>{car.name}</div>
                    <div className="text-[#5CE65C] font-semibold mt-1">₹{car.price}/km</div>
                    <div className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-[#64748b]'}`}>Max {car.passengers} passengers</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className={`rounded-lg p-4 mb-6 ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-[#F8FAFC]'}`}>
              {distanceError && <p className="text-sm text-red-400 mb-2">{distanceError}</p>}
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#64748b]'}`}>Estimated Distance</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
                  {distanceLoading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : `${estimatedDistance} km`}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#64748b]'}`}>Rate per km</span>
                <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>₹{selectedCarData?.price}</span>
              </div>
              <div className={`border-t my-3 ${isDark ? 'border-gray-600' : 'border-[#E5E7EB]'}`}></div>
              <div className="flex justify-between items-center">
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>Estimated Total</span>
                <span className="text-xl font-semibold text-[#5CE65C]">₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-[#5CE65C] hover:bg-[#4ED84E] text-gray-900 font-semibold py-4 rounded-lg transition-colors shadow-lg">
              Book Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}