import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  // State for dropdown visibility
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Ref to detect clicks outside the dropdown
  const dropdownRef = useRef(null);

  // Toggle dropdown
  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-md">
      {/* Top Section (Visible on all screens) */}
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Categories Icon (Visible only on small screens) */}
        <div className="md:hidden relative">
          <button
            onClick={() => toggleDropdown('categories')}
            className="text-gray-700 hover:text-green-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {activeDropdown === 'categories' && (
            <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Electronics</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Clothing</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home & Garden</a>
            </div>
          )}
        </div>

        {/* Logo (Visible on all screens) */}
        <div className="text-lg font-bold text-green-700">GreenBay</div>

        {/* Cart and Account Icons (Visible only on small screens) */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            onClick={() => toggleDropdown('cart')}
            className="text-gray-700 hover:text-green-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          {activeDropdown === 'cart' && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">View Cart</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Checkout</a>
            </div>
          )}

          {/* Account Icon */}
          <button
            onClick={() => toggleDropdown('account')}
            className="text-gray-700 hover:text-green-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          {activeDropdown === 'account' && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          )}
        </div>

        {/* Search and Navigation (Visible only on medium and larger screens) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for products"
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Navigation Links */}
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-green-500">Account</a>
            <a href="#" className="text-gray-700 hover:text-green-500">Help</a>
            <a href="#" className="text-gray-700 hover:text-green-500">Cart</a>
          </nav>
        </div>
      </div>

      {/* Search Bar (Visible only on small screens) */}
      <div className="md:hidden p-4 bg-gray-100">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="ml-2 text-gray-700 hover:text-green-500 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Additional Header Section (e.g., Categories Links) */}
      <div className="hidden md:block bg-gray-100 py-2">
        <div className="container mx-auto flex items-center">
          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('categories')}
              className="text-gray-700 hover:text-green-500 focus:outline-none"
            >
              All Categories
            </button>
            {activeDropdown === 'categories' && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Electronics</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Clothing</a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home & Garden</a>
              </div>
            )}
          </div>

          {/* Centered Navigation Links */}
          <nav className="flex space-x-6 mx-auto">
            <a href="#" className="text-gray-700 hover:text-green-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-green-500">Buy</a>
            <a href="#" className="text-gray-700 hover:text-green-500">Sell</a>
            <a href="#" className="text-gray-700 hover:text-green-500">About Us</a>
            <a href="#" className="text-gray-700 hover:text-green-500">Contact Us</a>
            <a href="#" className="text-gray-700 hover:text-green-500">Calculator</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;