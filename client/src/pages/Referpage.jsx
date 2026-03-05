import { Link } from 'react-router-dom';
import { Gift, Users, Wallet, Share2, Copy } from 'lucide-react';
import { useState } from 'react';

export default function ReferPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "GOELEC2024";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8 sm:w-10 sm:h-10 text-[#00FF00]" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212121] mb-4">Refer & Earn</h1>
          <p className="text-base sm:text-lg text-[#64748b]">
            Share the joy of clean travel and earn rewards for every friend you refer
          </p>
        </div>

        {/* Referral Code Card */}
        <div className="bg-[#008000] rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 text-white text-center shadow-lg">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Your Referral Code</h2>
          <div className="bg-white rounded-lg p-4 mb-4">
            <p className="text-2xl sm:text-3xl font-bold text-[#008000] tracking-wider">{referralCode}</p>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-[#FFFF00] text-[#212121] px-6 py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
          >
            <Copy className="w-5 h-5" />
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#212121] mb-6 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-7 h-7 sm:w-8 sm:h-8 text-[#00FF00]" />
              </div>
              <div className="w-8 h-8 bg-[#00FF00] text-[#212121] rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                1
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#212121] mb-2">Share Your Code</h3>
              <p className="text-xs sm:text-sm text-[#64748b]">
                Share your unique referral code with friends and family
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-[#00FF00]" />
              </div>
              <div className="w-8 h-8 bg-[#00FF00] text-[#212121] rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                2
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#212121] mb-2">Friend Signs Up</h3>
              <p className="text-xs sm:text-sm text-[#64748b]">
                Your friend registers and completes their first ride
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-[#00FF00]" />
              </div>
              <div className="w-8 h-8 bg-[#00FF00] text-[#212121] rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                3
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-[#212121] mb-2">Earn Rewards</h3>
              <p className="text-xs sm:text-sm text-[#64748b]">
                Both you and your friend receive rewards
              </p>
            </div>
          </div>
        </div>

        {/* Rewards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#00FF00]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#008000]/10 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-[#00FF00]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-[#212121]">You Get</h3>
                <p className="text-xl sm:text-2xl font-bold text-[#008000]">₹100</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Earn ₹100 in your wallet for every successful referral
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-[#00FF00]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#008000]/10 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-[#00FF00]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-[#212121]">Your Friend Gets</h3>
                <p className="text-xl sm:text-2xl font-bold text-[#008000]">₹50 OFF</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#64748b]">
              Your friend gets ₹50 off on their first ride
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-[#212121] mb-6 text-center">Your Referral Stats</h2>
          
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00FF00] mb-2">0</div>
              <p className="text-xs sm:text-sm text-[#64748b]">Total Referrals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00FF00] mb-2">0</div>
              <p className="text-xs sm:text-sm text-[#64748b]">Successful</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00FF00] mb-2">₹0</div>
              <p className="text-xs sm:text-sm text-[#64748b]">Total Earned</p>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-semibold text-[#212121] mb-3">Terms & Conditions</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#64748b]">
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1 flex-shrink-0">•</span>
              <span>Referral rewards are credited after your friend completes their first ride</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1 flex-shrink-0">•</span>
              <span>Both referrer and referee must be registered users</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1 flex-shrink-0">•</span>
              <span>Rewards can be used for future rides on the platform</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1 flex-shrink-0">•</span>
              <span>There is no limit on the number of referrals you can make</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FF00] mt-1 flex-shrink-0">•</span>
              <span>Go ElectrQ reserves the right to modify or cancel the referral program at any time</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="bg-[#008000] rounded-2xl p-6 sm:p-8 text-center text-white shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Start Earning Today!</h2>
          <p className="mb-6 text-white/90 text-sm sm:text-base">Share your code and watch your rewards grow</p>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 bg-[#FFFF00] text-[#212121] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
          >
            <Share2 className="w-5 h-5" />
            Share Now
          </button>
        </div>
      </div>
    </div>
  );
}
