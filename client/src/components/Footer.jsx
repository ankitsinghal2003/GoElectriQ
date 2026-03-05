import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

const LOGO_FALLBACK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"%3E%3Ctext x="0" y="28" font-family="Arial" font-size="24" font-weight="bold" fill="%230f172a"%3EGo ElectriQ%3C/text%3E%3C/svg%3E';

export default function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const logo = isDarkMode ? LOGO_FALLBACK : LOGO_FALLBACK.replace('%230f172a', '%23ffffff');
  return (
    <footer className={`border-t pb-[env(safe-area-inset-bottom)] transition-colors ${
      isDarkMode ? 'bg-white text-gray-900 border-gray-200' : 'bg-[#343434] text-white border-[#2d2d2d]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8">
          {/* Company Info */}
          <div>
            <div className="shrink-0 mb-4">
              <Link to="/" className="block">
              <img src={logo} alt="Go Electriq Logo" className="h-10 sm:h-12 w-auto object-contain" />
              </Link>
            </div>
            <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
              Your trusted eco-friendly cab service in Rajasthan. Comfortable, reliable, and sustainable transportation.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FBBF24] transition-colors ${isDarkMode ? 'bg-gray-200 text-gray-700 hover:text-gray-900' : 'bg-[#4a4a4a] text-white'}`}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FBBF24] transition-colors ${isDarkMode ? 'bg-gray-200 text-gray-700 hover:text-gray-900' : 'bg-[#4a4a4a] text-white'}`}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FBBF24] transition-colors ${isDarkMode ? 'bg-gray-200 text-gray-700 hover:text-gray-900' : 'bg-[#4a4a4a] text-white'}`}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FBBF24] transition-colors ${isDarkMode ? 'bg-gray-200 text-gray-700 hover:text-gray-900' : 'bg-[#4a4a4a] text-white'}`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-[#1e40af]' : 'text-[#FBBF24]'}`}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700 hover:text-[#1e40af]' : 'text-gray-300'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700 hover:text-[#1e40af]' : 'text-gray-300'}`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/partner" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700 hover:text-[#1e40af]' : 'text-gray-300'}`}>
                  Partner with us
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700 hover:text-[#1e40af]' : 'text-gray-300'}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-[#1e40af]' : 'text-[#FBBF24]'}`}>Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/airport" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700 hover:text-[#1e40af]' : 'text-gray-300'}`}>
                  Airport Transfer
                </Link>
              </li>
              <li>
                <Link to="/cityride" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700 hover:text-[#1e40af]' : 'text-gray-300'}`}>
                  City Rides
                </Link>
              </li>
              <li>
                <Link to="/intercityride" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700 hover:text-[#1e40af]' : 'text-gray-300'}`}>
                  Intercity Trips
                </Link>
              </li>
              <li>
                <Link to="/refer" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700 hover:text-[#1e40af]' : 'text-gray-300'}`}>
                  Refer & Earn
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-[#1e40af]' : 'text-[#FBBF24]'}`}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className={`w-5 h-5 flex-shrink-0 mt-1 ${isDarkMode ? 'text-[#1e40af]' : 'text-[#FBBF24]'}`} />
                <div>
                  <a href="tel:+919876543210" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className={`w-5 h-5 flex-shrink-0 mt-1 ${isDarkMode ? 'text-[#1e40af]' : 'text-[#FBBF24]'}`} />
                <div>
                  <a href="mailto:info@goelectriq.com" className={`transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                    info@goelectriq.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${isDarkMode ? 'text-[#1e40af]' : 'text-[#FBBF24]'}`} />
                <div>
                  <p className={isDarkMode ? 'text-gray-700' : 'text-gray-300'}>
                    M.I. Road, Jaipur, Rajasthan 302001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-6 sm:pt-8 text-center ${isDarkMode ? 'border-gray-200' : 'border-[#4a4a4a]'}`}>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            © 2026 Go Electriq Jaipur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}