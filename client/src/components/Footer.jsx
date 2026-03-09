import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import logoWhite from '../assets/logoWhite.png';
import logoBlack from '../assets/LogoBlack.png';

export default function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const logo = isDarkMode ? logoWhite : logoBlack;
  return (
    <footer className={`border-t pb-[env(safe-area-inset-bottom)] transition-all duration-300 ${
      isDarkMode ? 'bg-black text-white border-zinc-800' : 'bg-white text-slate-900 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8">
          {/* Company Info */}
          <div>
            <div className="shrink-0 mb-4">
              <Link to="/" className="block">
              <img
                src={logo}
                alt="Go Electriq Logo"
                className="h-20 sm:h-24 w-auto object-contain"
              />
              </Link>
            </div>
            <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
              Your trusted eco-friendly cab service in Rajasthan. Comfortable, reliable, and sustainable transportation.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 flex-wrap">
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FBBF24] transition-all duration-200 ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-slate-200 text-slate-700 hover:text-slate-900'}`}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FBBF24] transition-all duration-200 ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-slate-200 text-slate-700 hover:text-slate-900'}`}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FBBF24] transition-all duration-200 ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-slate-200 text-slate-700 hover:text-slate-900'}`}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#FBBF24] transition-all duration-200 ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-slate-200 text-slate-700 hover:text-slate-900'}`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/partner" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  Partner with us
                </Link>
              </li>
              <li>
                <Link to="/contact" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/airport" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  Airport Transfer
                </Link>
              </li>
              <li>
                <Link to="/cityride" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  City Rides
                </Link>
              </li>
              <li>
                <Link to="/intercityride" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  Intercity Trips
                </Link>
              </li>
              <li>
                <Link to="/refer" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                  Refer & Earn
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className={`w-5 h-5 flex-shrink-0 mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`} />
                <div>
                  <a href="tel:+919876543210" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className={`w-5 h-5 flex-shrink-0 mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`} />
                <div>
                  <a href="mailto:info@goelectriq.com" className={`transition-colors duration-200 hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                    info@goelectriq.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`} />
                <div>
                  <p className={isDarkMode ? 'text-zinc-400' : 'text-slate-600'}>
                    M.I. Road, Jaipur, Rajasthan 302001
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-6 sm:pt-8 text-center ${isDarkMode ? 'border-zinc-700' : 'border-slate-200'}`}>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
            © 2026 Go Electriq Jaipur. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}