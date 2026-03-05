import { useState } from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function HeroSection() {
  const [pickupType, setPickupType] = useState('now');

  return (
    <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-br from-[#E8FFE8] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-block bg-[#E8FFE8] px-4 py-2 rounded-full">
              <span className="text-[#5CE65C] text-sm font-medium">
                India's First EV Cab Service
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f172a] leading-tight">
              Go anywhere with{' '}
              <span className="text-[#5CE65C]">Go Electriq</span>
            </h1>

            <p className="text-lg md:text-xl text-[#64748b] max-w-lg">
              Eco-friendly electric rides for city, airport, and tours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-[#5CE65C] hover:bg-[#4ED84E] text-white px-8"
              >
                Book a Ride
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#5CE65C] text-[#5CE65C] hover:bg-[#E8FFE8]"
              >
                Explore Tours
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 md:gap-8 pt-4">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#0f172a]">500+</div>
                <div className="text-sm text-[#64748b]">Happy Riders</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#0f172a]">100%</div>
                <div className="text-sm text-[#64748b]">Electric Fleet</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-[#0f172a]">24/7</div>
                <div className="text-sm text-[#64748b]">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Booking Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-[#E5E7EB]">
            {/* Toggle */}
            <div className="flex gap-2 mb-6 bg-[#F8FAFC] rounded-lg p-1">
              <button
                onClick={() => setPickupType('now')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                  pickupType === 'now'
                    ? 'bg-white shadow-sm text-[#0f172a] font-medium'
                    : 'text-[#64748b]'
                }`}
              >
                <Clock className="w-4 h-4" />
                Pickup now
              </button>
              <button
                onClick={() => setPickupType('later')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                  pickupType === 'later'
                    ? 'bg-white shadow-sm text-[#0f172a] font-medium'
                    : 'text-[#64748b]'
                }`}
              >
                <Clock className="w-4 h-4" />
                Schedule later
              </button>
            </div>

            {/* Location Inputs */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5CE65C]" />
                <Input
                  placeholder="Pickup location"
                  className="pl-12 h-14 bg-[#F8FAFC] border-[#E5E7EB] focus:border-[#5CE65C]"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0f172a]" />
                <Input
                  placeholder="Drop location"
                  className="pl-12 h-14 bg-[#F8FAFC] border-[#E5E7EB] focus:border-[#5CE65C]"
                />
              </div>
            </div>

            {/* Detect Location Button */}
            <button className="flex items-center gap-2 text-[#5CE65C] hover:text-[#4ED84E] mb-6 transition-colors">
              <Navigation className="w-4 h-4" />
              <span className="font-medium">Detect current location</span>
            </button>

            {/* CTA Button */}
            <Button
              size="lg"
              className="w-full bg-[#111827] hover:bg-[#1F2937] text-white h-14"
            >
              See Prices
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-[#5CE65C] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-[#5CE65C] rounded-full opacity-10 blur-3xl"></div>
    </section>
  );
}