import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, LogOut, Moon, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import logoWhite from '../assets/main1.png';
import logoBlack from '../assets/main2.png';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const logo = theme === 'dark' ? logoWhite : logoBlack;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const firstName = user?.name?.trim().split(/\s+/)[0] || user?.email?.split('@')[0] || 'User';

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
    <nav className={`fixed top-0 left-0 right-0 shadow-sm z-50 border-b transition-all duration-300 ${
      isDarkMode ? 'bg-black border-zinc-800' : 'bg-white border-slate-200'
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
                className={`flex items-center space-x-1 transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
              >
                <span>About Company</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg py-2 border ${
                  isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-slate-200'
                }`}>
                  {dropdownItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block px-4 py-2 hover:text-[#FBBF24] transition-colors ${isDarkMode ? 'text-white hover:bg-zinc-700' : 'text-slate-900 hover:bg-slate-100'}`}
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
                    className={`px-4 py-2 rounded-lg transition-colors font-medium ${isDarkMode ? 'text-white hover:bg-zinc-800' : 'text-slate-900 hover:bg-slate-100'}`}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors font-medium ${isDarkMode ? 'text-white hover:bg-zinc-800' : 'text-slate-900 hover:bg-slate-100'}`}
                >
                  <span>Hello</span>
                  <span className="text-blue-500 font-semibold animate-name-glow">{firstName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-red-400 hover:bg-red-900/30' : 'text-red-600 hover:bg-red-50'}`}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={`px-6 py-2 rounded-lg transition-colors ${isDarkMode ? 'text-white hover:bg-zinc-800' : 'text-slate-900 hover:bg-slate-100'}`}
              >
                Login / Signup
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-white hover:bg-zinc-800' : 'text-slate-900 hover:bg-slate-100'}`}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'text-white hover:bg-zinc-800' : 'text-slate-900 hover:bg-slate-100'}`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden border-t ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-white border-slate-200'}`}>
          <div className="px-4 py-4 space-y-4">
            <div className="space-y-2">
              <p className={`font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>About Company</p>
              {dropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors hover:text-[#FBBF24] ${isDarkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-slate-600 hover:bg-slate-100'}`}
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
                    className={`block px-4 py-2 font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-1 px-4 py-2 font-medium ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                >
                  <span>Hello</span>
                  <span className="text-blue-500 font-semibold animate-name-glow">{firstName}</span>
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