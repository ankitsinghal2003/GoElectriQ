import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

export default function AboutPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-[#fafafa]'}`}>
      
      <article className="w-full px-6 sm:px-10 lg:px-20 py-12 sm:py-16 lg:py-20 text-left">

        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          About Go ElectriQ
        </h1>

        <p className={`text-base sm:text-lg leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          Go ElectriQ is a modern electric cab booking platform designed to redefine the way people travel in cities. 
          Our goal is to combine advanced technology with eco-friendly transportation to create a smarter and cleaner mobility experience. 
          By using electric vehicles, we help reduce pollution while providing passengers with comfortable, reliable, and affordable rides.
        </p>

        <p className={`text-base sm:text-lg leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          Transportation is one of the largest contributors to urban pollution. At Go ElectriQ, we believe the future of mobility 
          must be sustainable and environmentally responsible. Our electric fleet produces zero tailpipe emissions, helping cities 
          become greener and healthier places to live.
        </p>

        <p className={`text-base sm:text-lg leading-relaxed mb-10 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          Whether you're commuting to work, heading to the airport, attending meetings, or exploring the city, 
          Go ElectriQ provides a reliable transportation solution that fits your lifestyle. Our platform is designed 
          to make booking an electric cab simple, fast, and convenient for everyone.
        </p>


        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          Our Mission
        </h2>

        <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          Our mission is to accelerate the transition toward sustainable transportation by making electric mobility 
          accessible, reliable, and affordable. We aim to reduce carbon emissions, improve urban air quality, and 
          provide travelers with a smarter alternative to traditional transportation.
        </p>


        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          Our Vision
        </h2>

        <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          Our vision is to build one of India's most trusted electric mobility platforms and lead the future of 
          zero-emission transportation. We envision cities where transportation is efficient, affordable, and 
          environmentally friendly for every traveler.
        </p>


        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          What We Offer
        </h2>

        <p className={`text-base sm:text-lg leading-relaxed mb-6 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          Go ElectriQ offers a wide range of electric transportation services designed to meet different travel needs.
        </p>

        <p className={`text-base sm:text-lg leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>City Rides:</span> Fast and convenient electric cab rides for daily commuting within the city.
        </p>

        <p className={`text-base sm:text-lg leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>Airport Transfers:</span> Reliable airport pickups and drop-offs with comfortable electric vehicles.
        </p>

        <p className={`text-base sm:text-lg leading-relaxed mb-4 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>Intercity Travel:</span> Long-distance electric cab services connecting nearby cities safely and efficiently.
        </p>

        <p className={`text-base sm:text-lg leading-relaxed mb-10 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>Tour & Travel Packages:</span> Special EV travel experiences designed for tourism, sightseeing, and group travel.
        </p>


        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          Why Choose Go ElectriQ
        </h2>

        <ul className={`space-y-3 mb-8 ${isDark ? 'text-zinc-300' : 'text-slate-700'}`}>
          <li className="text-base sm:text-lg leading-relaxed"> • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>100% Eco-Friendly Electric Vehicles</span></li>
          <li className="text-base sm:text-lg leading-relaxed"> • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>Affordable and Transparent Pricing</span></li>
          <li className="text-base sm:text-lg leading-relaxed"> • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>24/7 Booking Availability</span></li>
          <li className="text-base sm:text-lg leading-relaxed"> • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>Smooth & Quiet Ride Experience</span></li>
          <li className="text-base sm:text-lg leading-relaxed"> • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>Verified and Trained Drivers</span></li>
          <li className="text-base sm:text-lg leading-relaxed"> • <span className={isDark ? 'text-zinc-200 font-medium' : 'text-slate-800 font-medium'}>24/7 Customer Support</span></li>
        </ul>


        <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          Our Commitment
        </h2>

        <p className={`text-base sm:text-lg leading-relaxed mb-12 ${isDark ? 'text-zinc-400' : 'text-slate-600'}`}>
          At Go ElectriQ, we are committed to building a sustainable future through smart mobility solutions. 
          Our team continuously works on improving the platform, expanding our electric fleet, and delivering 
          the best travel experience to our customers. Every ride taken with Go ElectriQ is a step toward a 
          cleaner planet and a smarter transportation system.
        </p>


        <div className="pt-10 border-t border-zinc-600 dark:border-zinc-800">
          <p className={`text-lg font-medium mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ready to experience electric mobility?
          </p>

          <Link
            to="/"
            className={`inline-flex items-center px-7 py-3 rounded-lg font-semibold transition ${
              isDark
                ? 'bg-[#5CE65C] text-slate-900 hover:bg-[#4ED84E]'
                : 'bg-[#FBBF24] text-slate-900 hover:bg-[#F59E0B]'
            }`}
          >
            Book Your Ride
          </Link>
        </div>

      </article>
    </div>
  );
}