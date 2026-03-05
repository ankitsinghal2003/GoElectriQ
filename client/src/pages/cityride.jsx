import { useState } from 'react';
import { MapPin, Navigation, Calendar, Clock, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

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
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCar, setSelectedCar] = useState('mini');
  const [estimatedDistance, setEstimatedDistance] = useState(15);

  const selectedCarData = carTypes.find(car => car.id === selectedCar);
  const totalPrice = selectedCarData ? selectedCarData.price * estimatedDistance : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 font-['Poppins']">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center text-[#64748b] hover:text-[#0f172a] mb-4 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="ml-1">Back</span>
            </button>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#0f172a]">Book City Ride</h1>
            <p className="text-[#64748b] mt-2">Fill in the details to complete your booking</p>
          </div>

          {/* Booking Card */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 md:p-8">
            {/* Pickup Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0f172a] mb-2">
                Pickup Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CE65C] focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5CE65C] hover:text-[#4ED84E] transition-colors">
                  <Navigation className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Drop Location */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0f172a] mb-2">
                Drop Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Enter drop location"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CE65C] focus:border-transparent"
                />
              </div>
            </div>

            {/* Date Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0f172a] mb-3">
                Select Date
              </label>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {dates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(index)}
                    className={`flex-shrink-0 px-5 py-3 rounded-lg border-2 transition-all ${
                      selectedDate === index
                        ? 'bg-[#E8FFE8] border-[#5CE65C] text-[#0f172a]'
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

            {/* Time Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0f172a] mb-2">
                Select Time
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5CE65C] focus:border-transparent appearance-none bg-white"
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

            {/* Car Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0f172a] mb-3">
                Select Car Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {carTypes.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => setSelectedCar(car.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedCar === car.id
                        ? 'bg-[#E8FFE8] border-[#5CE65C]'
                        : 'bg-white border-[#E5E7EB] hover:border-[#5CE65C]'
                    }`}
                  >
                    <div className="font-semibold text-[#0f172a]">{car.name}</div>
                    <div className="text-[#5CE65C] font-semibold mt-1">₹{car.price}/km</div>
                    <div className="text-xs text-[#64748b] mt-2">Max {car.passengers} passengers</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-[#F8FAFC] rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#64748b]">Estimated Distance</span>
                <span className="text-sm font-medium text-[#0f172a]">{estimatedDistance} km</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#64748b]">Rate per km</span>
                <span className="text-sm font-medium text-[#0f172a]">₹{selectedCarData?.price}</span>
              </div>
              <div className="border-t border-[#E5E7EB] my-3"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#0f172a]">Estimated Total</span>
                <span className="text-xl font-semibold text-[#5CE65C]">₹{totalPrice}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-[#5CE65C] hover:bg-[#4ED84E] text-white py-4 rounded-lg font-semibold transition-colors">
              See Prices
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}