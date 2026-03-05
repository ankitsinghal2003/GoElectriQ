import { useNavigate } from 'react-router-dom';
import { Car, User, Zap } from 'lucide-react';

export default function PartnerPage() {
  const navigate = useNavigate();

  const handleConnect = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212121] mb-4">Partner With Us</h1>
          <p className="text-base sm:text-lg text-[#64748b]">Join India's fastest growing electric mobility platform</p>
        </div>

        {/* Why Partner With Us */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#212121] mb-6 text-center">Why Partner With Us?</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00FF00] mb-2">10,000+</div>
              <p className="text-xs sm:text-sm text-[#64748b]">Active Rides Daily</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00FF00] mb-2">500+</div>
              <p className="text-xs sm:text-sm text-[#64748b]">Partner Drivers</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00FF00] mb-2">20+</div>
              <p className="text-xs sm:text-sm text-[#64748b]">Cities Covered</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00FF00] mb-2">24/7</div>
              <p className="text-xs sm:text-sm text-[#64748b]">Support Available</p>
            </div>
          </div>
        </div>

        {/* Partnership Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Car Owner Partner */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-7 h-7 sm:w-8 sm:h-8 text-[#00FF00]" />
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-[#212121] mb-3 text-center">Car Owner Partner</h2>
            <p className="text-sm sm:text-base text-[#64748b] text-center mb-6 min-h-[60px]">
              List your electric vehicle and start earning passive income today
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">List your EV on our platform</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Flexible rental options</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Insurance coverage included</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Regular maintenance support</p>
              </div>
            </div>

            <button
              onClick={handleConnect}
              className="w-full bg-[#FFFF00] text-[#212121] py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
            >
              Connect Now
            </button>
          </div>

          {/* Driver Partner */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow border-2 border-[#00FF00]">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-[#00FF00]" />
            </div>
            
            <div className="text-center mb-2">
              <span className="inline-block bg-[#00FF00] text-[#212121] text-xs px-3 py-1 rounded-full font-semibold">
                MOST POPULAR
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-[#212121] mb-3 text-center">Driver Partner</h2>
            <p className="text-sm sm:text-base text-[#64748b] text-center mb-6 min-h-[60px]">
              Drive with us and earn a stable monthly income with additional incentives
            </p>

            <div className="bg-[#008000]/10 rounded-lg p-4 mb-6 text-center">
              <p className="text-xs sm:text-sm text-[#64748b] mb-1">Monthly Income</p>
              <p className="text-xl sm:text-2xl font-bold text-[#008000]">₹20,000 - ₹35,000</p>
              <p className="text-xs text-[#64748b] mt-1">+ Performance Incentives</p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Flexible working hours</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Weekly payouts</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Performance bonuses</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Training & support provided</p>
              </div>
            </div>

            <button
              onClick={handleConnect}
              className="w-full bg-[#FFFF00] text-[#212121] py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
            >
              Connect Now
            </button>
          </div>

          {/* EV Charger Partner */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-[#00FF00]" />
            </div>
            
            <h2 className="text-lg sm:text-xl font-bold text-[#212121] mb-3 text-center">EV Charger Partner</h2>
            <p className="text-sm sm:text-base text-[#64748b] text-center mb-6 min-h-[60px]">
              Install charging stations and be part of the EV infrastructure revolution
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Setup support provided</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Revenue sharing model</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Marketing assistance</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-[#00FF00] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-xs sm:text-sm text-[#64748b]">Technical maintenance support</p>
              </div>
            </div>

            <button
              onClick={handleConnect}
              className="w-full bg-[#FFFF00] text-[#212121] py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
            >
              Connect Now
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#008000] rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white">Ready to Get Started?</h2>
          <p className="mb-6 text-white/90 text-sm sm:text-base">Join our growing network of partners and start earning today</p>
          <button
            onClick={handleConnect}
            className="inline-block bg-[#FFFF00] text-[#212121] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
          >
            Contact Us Now
          </button>
        </div>
      </div>
    </div>
  );
}
