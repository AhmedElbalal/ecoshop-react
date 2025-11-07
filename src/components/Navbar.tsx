import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  const { getCartCount, openCart } = useCart();
  const { user, logout, isAuthenticated, openLogin } = useAuth();

  // Safe cart count implementation
  useEffect(() => {
    try {
      if (typeof getCartCount === 'function') {
        setCartCount(getCartCount());
      }
    } catch (error) {
      console.warn('Cart context not available:', error);
      setCartCount(0);
    }
  }, [location, getCartCount]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/catalog', label: 'Catalog' },
    { path: '/cart', label: 'Cart', showBadge: true },
    { path: '/wishlist', label: 'Wishlist' },
  ];

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
            : 'bg-transparent'
          }
      `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">ECOSHOP</span>
                <span className="text-xs text-green-600 font-medium tracking-widest">
                  SUSTAINABLE
                </span>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.path} className="relative">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => `
                      font-medium text-sm transition-all duration-300
                      ${isActive
                        ? 'text-green-600 font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    {item.label}
                    {item.showBadge && cartCount > 0 && (
                      <span className="absolute -top-2 -right-4 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                </div>
              ))}

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-300/50">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                    <button
                      onClick={handleLogout}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={openLogin}
                      className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                    >
                      Sign In
                    </button>
                    <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-4 md:hidden">
              {/* Cart Icon for Mobile */}
              <button onClick={openCart} className="relative">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700"
              >
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'
                      }`}
                  ></span>
                  <span
                    className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'top-3'
                      }`}
                  ></span>
                  <span
                    className={`absolute block w-5 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'
                      }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 md:hidden pt-20">
            <div className="p-6 space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="block text-lg font-medium py-3 px-4 rounded-xl hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
      <div className="h-20"></div>
    </>
  );
}