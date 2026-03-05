import { Link } from 'react-router-dom';
import { Zap, Target, Users, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212121] mb-4">
            About Go ElectrQ
          </h1>

          <p className="text-base sm:text-lg text-[#64748b] leading-relaxed">
            Go ElectrQ is India's premier electric cab booking platform, revolutionizing urban transportation 
            with sustainable and eco-friendly mobility solutions. We are committed to providing clean, green, 
            and affordable travel options for modern commuters.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-[#008000]/10 rounded-full flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-[#00FF00]" />
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-[#212121] mb-3">
              Our Mission
            </h2>

            <p className="text-sm sm:text-base text-[#64748b] leading-relaxed">
              To make electric transportation accessible, affordable, and convenient for everyone while 
              reducing carbon emissions and promoting sustainable living.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-[#008000]/10 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#00FF00]" />
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-[#212121] mb-3">
              Our Vision
            </h2>

            <p className="text-sm sm:text-base text-[#64748b] leading-relaxed">
              To become India's most trusted electric mobility platform, leading the transition to a 
              zero-emission future and setting new standards in sustainable transportation.
            </p>
          </div>

        </div>

        {/* What We Do */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">

          <h2 className="text-xl sm:text-2xl font-semibold text-[#212121] mb-6">
            What We Do
          </h2>

          <div className="space-y-4">

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#00FF00] rounded-full mt-2"></div>
              <p className="text-sm sm:text-base text-[#64748b]">
                <strong className="text-[#212121]">City Rides:</strong> Quick and convenient electric cab services
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#00FF00] rounded-full mt-2"></div>
              <p className="text-sm sm:text-base text-[#64748b]">
                <strong className="text-[#212121]">Airport Transfers:</strong> Reliable and comfortable rides
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#00FF00] rounded-full mt-2"></div>
              <p className="text-sm sm:text-base text-[#64748b]">
                <strong className="text-[#212121]">Intercity Trips:</strong> Long-distance electric travel
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-[#00FF00] rounded-full mt-2"></div>
              <p className="text-sm sm:text-base text-[#64748b]">
                <strong className="text-[#212121]">Tour Packages:</strong> Curated EV tours and travel
              </p>
            </div>

          </div>

        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">

          <h2 className="text-xl sm:text-2xl font-semibold text-[#212121] mb-6">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="flex gap-3">
              <Zap className="w-5 h-5 text-[#00FF00]" />
              <div>
                <h3 className="font-semibold text-[#212121]">100% Electric Fleet</h3>
                <p className="text-sm text-[#64748b]">Zero emissions travel</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Users className="w-5 h-5 text-[#00FF00]" />
              <div>
                <h3 className="font-semibold text-[#212121]">Professional Drivers</h3>
                <p className="text-sm text-[#64748b]">Verified partners</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Award className="w-5 h-5 text-[#00FF00]" />
              <div>
                <h3 className="font-semibold text-[#212121]">Affordable Pricing</h3>
                <p className="text-sm text-[#64748b]">Transparent billing</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Target className="w-5 h-5 text-[#00FF00]" />
              <div>
                <h3 className="font-semibold text-[#212121]">24/7 Service</h3>
                <p className="text-sm text-[#64748b]">Always available</p>
              </div>
            </div>

          </div>

        </div>

        {/* CTA */}
        <div className="bg-[#008000] rounded-2xl p-6 sm:p-8 text-center shadow-lg">

          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Join the Green Revolution
          </h2>

          <p className="text-white/90 mb-6">
            Book your first electric ride today
          </p>

          <Link
            to="/"
            className="inline-block bg-[#FFFF00] text-[#212121] px-6 py-3 rounded-lg font-semibold"
          >
            Book Now
          </Link>

        </div>

      </div>
    </div>
  );
}