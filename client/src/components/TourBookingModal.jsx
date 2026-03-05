import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, MapPin, Calendar, Clock, ChevronDown, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { createTourBooking } from '../services/packageService.js';

const carTypes = [
  { id: 'mini', name: 'Mini Car', additionalCharge: 0, passengers: 4 },
  { id: 'sedan', name: 'Sedan', additionalCharge: 200, passengers: 4 },
  { id: 'suv', name: 'SUV', additionalCharge: 500, passengers: 6 },
];

export default function TourBookingModal({ isOpen, onClose, tourName, packagePrice, packageId }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedCar, setSelectedCar] = useState('mini');
  const [selectedTime, setSelectedTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [passengers, setPassengers] = useState(4);
  const [paymentOption, setPaymentOption] = useState('confirmation');
  const [dateInput, setDateInput] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const selectedCarData = carTypes.find(car => car.id === selectedCar);
  const carCharge = selectedCarData?.additionalCharge || 0;
  const totalBeforeDiscount = (Number(packagePrice) || 0) + carCharge;
  const discount = paymentOption === 'full' ? totalBeforeDiscount * 0.1 : 0;
  const totalAmount = totalBeforeDiscount - discount;
  const confirmationAmount = 500;

  const handlePayNow = async () => {
    if (!isAuthenticated) {
      onClose();
      navigate('/login', { state: { from: '/', message: 'Please login to book a tour' } });
      return;
    }
    if (!pickupLocation.trim()) {
      setError('Please enter pickup location');
      return;
    }
    if (!selectedTime) {
      setError('Please select time');
      return;
    }
    if (!packageId) {
      setError('Invalid package. Please try again.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await createTourBooking({
        packageId,
        pickupLocation: pickupLocation.trim(),
        scheduledDate: dateInput,
        scheduledTime: selectedTime,
        carType: selectedCar,
        passengers,
        paymentOption,
      });
      if (res?.success) {
        onClose();
        alert('Booking created! Booking ID: ' + (res?.data?.bookingId || '—'));
      } else {
        setError(res?.message || 'Booking failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create booking');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e5e7eb] p-6 flex justify-between items-start rounded-t-2xl z-10">
          <div>
            <h2 className="text-2xl font-semibold text-[#0f172a]">Book {tourName}</h2>
            <p className="text-[#64748b] mt-1">Fill in the details to complete your booking</p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#64748b] hover:text-[#0f172a] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Package Price */}
          <div className="bg-[#f9fafb] rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-[#0f172a] font-medium">Package Price</span>
              <span className="text-2xl font-bold text-[#67fc59]">₹{packagePrice}</span>
            </div>
          </div>

          {/* Car Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#0f172a] mb-3">
              Select Car Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {carTypes.map((car) => (
                <button
                  key={car.id}
                  onClick={() => setSelectedCar(car.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedCar === car.id
                      ? 'bg-[#dcfce7] border-[#67fc59]'
                      : 'bg-white border-[#e5e7eb] hover:border-[#67fc59]'
                  }`}
                >
                  <div className="font-semibold text-[#0f172a]">{car.name}</div>
                  <div className="text-[#67fc59] font-semibold mt-1">
                    {car.additionalCharge === 0 ? '+₹0' : `+₹${car.additionalCharge}`}
                  </div>
                  <div className="text-xs text-[#64748b] mt-2">Max {car.passengers} passengers</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pickup Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#0f172a] mb-2">
              Enter Pickup Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
              <input
                type="text"
                placeholder="Enter pickup location in Jaipur"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67fc59] focus:border-transparent"
              />
            </div>
          </div>

          {/* Select Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#0f172a] mb-2">
              Select Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
              <input
                type="date"
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67fc59] focus:border-transparent"
              />
            </div>
          </div>

          {/* Select Time */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#0f172a] mb-2">
              Select Time <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b]" />
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#67fc59] focus:border-transparent appearance-none bg-white text-base"
              >
                <option value="">Select Time</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="01:00">01:00 PM</option>
                <option value="02:00">02:00 PM</option>
                <option value="03:00">03:00 PM</option>
                <option value="04:00">04:00 PM</option>
                <option value="05:00">05:00 PM</option>
                <option value="06:00">06:00 PM</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748b] pointer-events-none" />
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#0f172a] mb-3">
              Select Payment Option <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentOption('confirmation')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  paymentOption === 'confirmation'
                    ? 'bg-[#dcfce7] border-[#67fc59]'
                    : 'bg-white border-[#e5e7eb] hover:border-[#67fc59]'
                }`}
              >
                <div className="font-semibold text-[#0f172a]">Pay Confirmation Fees</div>
                <div className="text-sm text-[#64748b] mt-1">₹{confirmationAmount} to confirm booking</div>
              </button>
              <button
                onClick={() => setPaymentOption('full')}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  paymentOption === 'full'
                    ? 'bg-[#dcfce7] border-[#67fc59]'
                    : 'bg-white border-[#e5e7eb] hover:border-[#67fc59]'
                }`}
              >
                <div className="font-semibold text-[#0f172a]">Pay Full Payment</div>
                <div className="text-sm text-[#67fc59] font-medium mt-1">Get extra 10% discount</div>
                {discount > 0 && (
                  <div className="text-xs text-[#67fc59] mt-1">Save ₹{discount.toFixed(0)}</div>
                )}
              </button>
            </div>
          </div>

          {/* Price Summary Detail */}
          <div className="bg-[#f9fafb] rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#64748b]">Package Price</span>
              <span className="text-sm font-medium text-[#0f172a]">₹{packagePrice}</span>
            </div>
            {carCharge > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#64748b]">Car Upgrade Charge</span>
                <span className="text-sm font-medium text-[#0f172a]">₹{carCharge}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[#67fc59]">Discount (10%)</span>
                <span className="text-sm font-medium text-[#67fc59]">-₹{discount.toFixed(0)}</span>
              </div>
            )}
            <div className="border-t border-[#e5e7eb] my-3"></div>
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#0f172a]">Total Amount</span>
              <span className="text-xl font-semibold text-[#67fc59]">₹{totalAmount.toFixed(0)}</span>
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

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          {!isAuthenticated && (
            <p className="text-amber-600 text-sm mb-3">You need to login to book. Click Pay Now to go to login.</p>
          )}
          <button
            onClick={handlePayNow}
            disabled={submitting}
            className="w-full bg-[#67fc59] hover:bg-[#52e040] text-white py-4 rounded-lg font-semibold transition-colors mb-3 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
            Pay Now (₹{paymentOption === 'confirmation' ? confirmationAmount : totalAmount.toFixed(0)})
          </button>
          
          {paymentOption === 'confirmation' && (
            <p className="text-center text-sm text-[#64748b]">
              Pay ₹{confirmationAmount} now to confirm your booking<br />
              Remaining ₹{totalAmount - confirmationAmount} to be paid before the trip
            </p>
          )}
        </div>
      </div>
    </div>
  );
}