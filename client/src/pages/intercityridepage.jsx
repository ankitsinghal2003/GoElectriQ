import { useState } from 'react';
import { MapPin, Navigation, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';

const carTypes = [
  { id: 'mini', name: 'Mini Car', additionalCharge: 0, passengers: 4 },
  { id: 'sedan', name: 'Sedan', additionalCharge: 400, passengers: 4 },
  { id: 'suv', name: 'SUV', additionalCharge: 800, passengers: 6 },
];

const tripTypes = [
  { id: 'same-day', name: 'Same-Day Round Trip', baseCharge: 3500 },
  { id: 'one-day-stay', name: '1 Day Stay', baseCharge: 3500, additionalCharge: 1200 },
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

export default function IntercityRidePage() {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedCar, setSelectedCar] = useState('mini');
  const [selectedTripType, setSelectedTripType] = useState('same-day');
  const [paymentOption, setPaymentOption] = useState('confirmation');

  const selectedCarData = carTypes.find(car => car.id === selectedCar);
  const selectedTripData = tripTypes.find(trip => trip.id === selectedTripType);
  
  const baseFare = selectedTripData?.baseCharge || 0;
  const tripCharge = selectedTripData?.additionalCharge || 0;
  const carCharge = selectedCarData?.additionalCharge || 0;
  const discount = paymentOption === 'full' ? (baseFare + tripCharge + carCharge) * 0.1 : 0;
  const totalAmount = baseFare + tripCharge + carCharge - discount;
  const confirmationAmount = 500;

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-gray-950 font-['Poppins']">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <Link 
              to="/"
              className="flex items-center text-[#64748b] hover:text-[#0f172a] mb-4 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="ml-1">Back</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#0f172a]">Book Intercity Ride</h1>
            <p className="text-[#64748b] mt-2">Fill in the details to complete your booking</p>
          </div>

          {/* Booking Card */}
          <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] p-6 md:p-8">
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
                  className="w-full pl-12 pr-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#16a34a] hover:text-[#15803d] transition-colors">
                  <Navigation className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Travel City Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0f172a] mb-2">
                Enter Travel City Name
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Enter destination city"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent"
                />
              </div>
            </div>

            {/* Trip Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0f172a] mb-3">
                Select Trip Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tripTypes.map((trip) => (
                  <button
                    key={trip.id}
                    onClick={() => setSelectedTripType(trip.id)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTripType === trip.id
                        ? 'bg-[#dcfce7] border-[#16a34a]'
                        : 'bg-white border-[#e5e7eb] hover:border-[#16a34a]'
                    }`}
                  >
                    <div className="font-semibold text-[#0f172a]">{trip.name}</div>
                    <div className="text-sm text-[#64748b] mt-1">
                      Base charge: ₹{trip.baseCharge}
                    </div>
                    {trip.additionalCharge && (
                      <div className="text-sm text-[#16a34a] font-medium mt-1">
                        +₹{trip.additionalCharge}
                      </div>
                    )}
                  </button>
                ))}
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
                        ? 'bg-[#dcfce7] border-[#16a34a]'
                        : 'bg-white border-[#e5e7eb] hover:border-[#16a34a]'
                    }`}
                  >
                    <div className="font-semibold text-[#0f172a]">{car.name}</div>
                    <div className="text-[#16a34a] font-semibold mt-1">
                      {car.additionalCharge === 0 ? '+₹0' : `+₹${car.additionalCharge}`}
                    </div>
                    <div className="text-xs text-[#64748b] mt-2">Max {car.passengers} passengers</div>
                  </button>
                ))}
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
                        ? 'bg-[#dcfce7] border-[#16a34a] text-[#0f172a]'
                        : 'bg-white border-[#e5e7eb] text-[#64748b] hover:border-[#16a34a]'
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
                  className="w-full pl-12 pr-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent appearance-none bg-white"
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

            {/* Payment Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#0f172a] mb-3">
                Select Payment Option
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  onClick={() => setPaymentOption('confirmation')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    paymentOption === 'confirmation'
                      ? 'bg-[#dcfce7] border-[#16a34a]'
                      : 'bg-white border-[#e5e7eb] hover:border-[#16a34a]'
                  }`}
                >
                  <div className="font-semibold text-[#0f172a]">Pay Confirmation Amount</div>
                  <div className="text-sm text-[#16a34a] font-medium mt-1">₹{confirmationAmount}</div>
                </button>
                <button
                  onClick={() => setPaymentOption('full')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    paymentOption === 'full'
                      ? 'bg-[#dcfce7] border-[#16a34a]'
                      : 'bg-white border-[#e5e7eb] hover:border-[#16a34a]'
                  }`}
                >
                  <div className="font-semibold text-[#0f172a]">Pay Full Payment</div>
                  <div className="text-sm text-[#16a34a] font-medium mt-1">₹{totalAmount}</div>
                  <div className="text-xs text-[#64748b] mt-1">Get 10% discount on full payment</div>
                </button>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-[#f9fafb] rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#64748b]">Base Fare</span>
                <span className="text-sm font-medium text-[#0f172a]">₹{baseFare}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#64748b]">Car Charge</span>
                <span className="text-sm font-medium text-[#0f172a]">₹{carCharge}</span>
              </div>
              {tripCharge > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#64748b]">Trip Charge</span>
                  <span className="text-sm font-medium text-[#0f172a]">₹{tripCharge}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#16a34a]">Discount (10%)</span>
                  <span className="text-sm font-medium text-[#16a34a]">-₹{discount.toFixed(0)}</span>
                </div>
              )}
              <div className="border-t border-[#e5e7eb] my-3"></div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#0f172a]">Total Amount</span>
                <span className="text-xl font-semibold text-[#16a34a]">₹{totalAmount}</span>
              </div>
              {paymentOption === 'confirmation' && (
                <div className="mt-3 pt-3 border-t border-[#e5e7eb]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#64748b]">Pay now</span>
                    <span className="text-sm font-medium text-[#0f172a]">₹{confirmationAmount}</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-[#64748b]">Remaining to be paid</span>
                    <span className="text-sm font-medium text-[#0f172a]">₹{totalAmount - confirmationAmount}</span>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-4 rounded-lg font-semibold transition-colors">
              Pay Now (₹{paymentOption === 'confirmation' ? confirmationAmount : totalAmount})
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}