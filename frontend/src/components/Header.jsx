import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CartBadge from './CartBadge'; // Import the CartBadge component

// Reusable Dropdown Component
const Dropdown = ({ label, items, isOpen, onToggle, position = 'left' }) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="text-gray-700 hover:text-green-500 focus:outline-none"
      >
        {label}
      </button>
      {isOpen && (
        <div
          className={`absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg ${
            position === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          {items.map((item, index) => (
            <a key={index} href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// Reusable Search Bar Component
const SearchBar = ({ isMobile = false }) => {
  return (
    <div className={`flex items-center ${isMobile ? 'w-full' : 'flex-1'}`}>
      <input
        type="text"
        placeholder="Search for products"
        className={`${isMobile ? 'w-full' : 'w-full'} px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
      />
      <button className="ml-2 text-gray-700 hover:text-green-500 cursor-pointer focus:outline-none transition-transform duration-150 active:scale-90">
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
  );
};

// Reusable Navigation Links Component
const NavigationLinks = ({ isMobile = false }) => {
  const links = ['Home', 'Buy', 'Sell', 'About Us', 'Contact Us', 'Calculator'];
  return (
    <nav className={`flex ${isMobile ? 'flex-col' : 'space-x-6'} items-center`}>
      {links.map((link, index) => (
        <a key={index} href="#" className="text-gray-700 hover:text-green-500">
          {link}
        </a>
      ))}
    </nav>
  );
};

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

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
        <div className="md:hidden relative" ref={dropdownRef}>
          <Dropdown
            label={
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
            }
            items={['Electronics', 'Clothing', 'Home & Garden']}
            isOpen={activeDropdown === 'categories'}
            onToggle={() => toggleDropdown('categories')}
          />
        </div>

        {/* Logo (Visible on all screens) */}
        <div className="text-lg font-bold text-green-700">GreenBay</div>

        {/* Cart and Account Icons (Visible only on small screens) */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Replace Cart Icon with CartBadge */}
          <div onClick={() => toggleDropdown('cart')}>
            <CartBadge />
          </div>

          {/* Account Icon */}
          <Dropdown
            label={
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
            }
            items={['Profile', 'Settings', 'Logout']}
            isOpen={activeDropdown === 'account'}
            onToggle={() => toggleDropdown('account')}
            position="right"
          />
        </div>

        {/* Search and Navigation (Visible only on medium and larger screens) */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar />
          <div className="flex items-center space-x-6">
            <Dropdown
              label="Account"
              items={['Profile', 'Settings', 'Logout']}
              isOpen={activeDropdown === 'account'}
              onToggle={() => toggleDropdown('account')}
              position="right"
            />
            <Dropdown
              label="Help"
              items={['FAQ', 'Support', 'Contact Us']}
              isOpen={activeDropdown === 'help'}
              onToggle={() => toggleDropdown('help')}
              position="right"
            />
            {/* Replace Cart Icon with CartBadge */}
            <div onClick={() => toggleDropdown('cart')}>
              <CartBadge />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar (Visible only on small screens) */}
      <div className="md:hidden p-4 bg-gray-100">
        <SearchBar isMobile />
      </div>

      {/* Additional Header Section (e.g., Categories Links) */}
      <div className="hidden md:block bg-gray-100 py-2">
        <div className="container mx-auto flex items-center">
          {/* All Categories (Left-aligned) */}
          <div className="mr-6">
            <Dropdown
              label="All Categories"
              items={['Electronics', 'Clothing', 'Home & Garden']}
              isOpen={activeDropdown === 'categories'}
              onToggle={() => toggleDropdown('categories')}
            />
          </div>

          {/* Centered Navigation Links */}
          <div className="flex-1 flex justify-center">
            <NavigationLinks />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;