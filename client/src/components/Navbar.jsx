import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, LogOut, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
const LOGO_FALLBACK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"%3E%3Ctext x="0" y="28" font-family="Arial" font-size="24" font-weight="bold" fill="%230f172a"%3EGo ElectriQ%3C/text%3E%3C/svg%3E';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const logo = theme === 'dark' ? LOGO_FALLBACK : LOGO_FALLBACK.replace('%230f172a', '%23ffffff');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const dropdownItems = [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Partner With Us', path: '/partner' },
    { label: 'Refer and Earn', path: '/refer' },
    { label: 'Feedback', path: '/feedback' },
    { label: 'Our Policies', path: '/policies' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isDarkMode = theme === 'dark';
  return (
    <nav className={`fixed top-0 left-0 right-0 shadow-sm z-50 border-b transition-colors ${
      isDarkMode ? 'bg-white border-gray-200' : 'bg-[#343434] border-[#2d2d2d]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
        <div className="flex-shrink-0">
                   <Link to="/" className="block">
                      <img src={logo} alt="Go Electriq Logo" className="h-10 sm:h-12 md:h-14 w-auto object-contain" />
                </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center space-x-1 transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-900' : 'text-white'}`}
              >
                <span>About Company</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg py-2 border ${
                  isDarkMode ? 'bg-white border-gray-200' : 'bg-[#3d3d3d] border-[#4a4a4a]'
                }`}>
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block px-4 py-2 hover:bg-[#E8FFE8] hover:text-[#FBBF24] transition-colors ${isDarkMode ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-[#4a4a4a]'}`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 rounded-lg transition-colors font-medium ${isDarkMode ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-[#4a4a4a]'}`}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-lg transition-colors font-medium ${isDarkMode ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-[#4a4a4a]'}`}
                >
                  {user?.name || user?.email || 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-red-600 hover:bg-red-50' : 'text-red-400 hover:bg-red-900/40'}`}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-6 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-[#4a4a4a]'}`}
              >
                Login / Signup
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-[#4a4a4a]'}`}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-[#4a4a4a]'}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isDarkMode ? 'text-gray-900' : 'text-white'}`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden border-t ${isDarkMode ? 'bg-white border-gray-200' : 'bg-[#3d3d3d] border-[#4a4a4a]'}`}>
          <div className="px-4 py-4 space-y-4">
            <div className="space-y-2">
              <p className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-900' : 'text-white'}`}>About Company</p>
              {dropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-gray-600 hover:bg-gray-100' : 'text-gray-300 hover:bg-[#4a4a4a]'}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-2 font-medium ${isDarkMode ? 'text-gray-900' : 'text-white'}`}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 font-medium ${isDarkMode ? 'text-gray-900' : 'text-white'}`}
                >
                  {user?.name || 'Profile'}
                </Link>
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full block px-6 py-3 bg-[#FBBF24] text-gray-900 rounded-lg hover:bg-[#F59E0B] font-medium transition-colors text-center"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}