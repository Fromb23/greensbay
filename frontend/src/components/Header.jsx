import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartBadge from './CartBadge';
import { logout } from '../redux/slices/userSlice';

const UserIcon = ({ userInfo }) => {
  // Check if the screen is small (mobile)
  const isMobile = window.innerWidth <= 768; // Adjust breakpoint if needed

  return (
    <div className="flex items-center space-x-2">
      {userInfo ? (
        // Logged in: Show Dropdown Arrow + Online Badge + "Hi, Username"
        <span className="relative flex items-center">
          {/* Dropdown Arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>

          {/* Online Badge */}
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
        </span>
      ) : (
        // Logged out: Show Account Icon (No text on mobile)
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
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
      )}

      {/* Show text only if not on mobile */}
      {!isMobile && <span className="text-gray-700">{userInfo ? `Hi, ${userInfo.firstname}` : 'Account'}</span>}
    </div>
  );
};


// Reusable Dropdown Component
const Dropdown = ({ label, items, isOpen, onToggle, position = "left" }) => {
  const navigate = useNavigate(); // Initialize navigate

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);

    const routes = {
      Profile: "/profile",
      Orders: "/orders",
      Settings: "/settings",
      Login: "/auth/login",
      Signup: "/auth/signup",
      Clothing: "/clothing",
    };

    if (item === "Logout") {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      navigate("/auth/login");
    } else if (routes[item]) {
      navigate(routes[item]); // Navigate to route
    } else {
      console.warn("No route found for:", item);
    }

    onToggle(); // 🔥 Close dropdown after clicking
  };

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
            position === "right" ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, index) => (
            <button
              key={index}
              className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => handleItemClick(item)} // ✅ Use handleItemClick
            >
              {item}
            </button>
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
        className={`${isMobile ? 'w-full' : 'w-full ml-auto'} px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
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
  const links = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/buy" },
    { name: "Sell", path: "/sell" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Calculator", path: "/calculator" }
  ];
  return (
    <nav className={`flex ${isMobile ? 'flex-col' : 'space-x-6'} items-center`}>
      {links.map((link, index) => (
        <a key={index} href={link.path} className="text-gray-700 hover:text-green-500">
          {link.name}
        </a>
      ))}
    </nav>
  );
};

const Header = () => {
  const { userInfo } = useSelector((state) => state.user) || {};
  const [activeDropdown, setActiveDropdown] = useState(null);
  const mobileDropdownRef = useRef(null);
  const lgdropdownRef = useRef(null);
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
            label={<UserIcon />}
            items={['Electronics', 'Clothing', 'Home & Garden']}
            isOpen={activeDropdown === 'categories'}
            onToggle={() => toggleDropdown('categories')}
          />
        </div>

        {/* Logo (Visible on all screens) */}
        <div className="cursor-pointer text-lg font-bold text-green-700"
          onClick={() => window.location.href = '/'}
        >
          GreenBay</div>

        {/* Cart and Account Icons (Visible only on small screens) */}
        <div className="md:hidden flex items-center space-x-4">
          <div onClick={() => toggleDropdown('cart')}>
            <CartBadge />
          </div>

          {/* Account Icon */}
          <div className="md:hidden relative" ref={lgdropdownRef}>
          <Dropdown
            label={<UserIcon />}
            items={userInfo ? ['Logout', 'Profile', 'Orders', 'Settings'] : ['Login', 'Signup'] || []}
            isOpen={activeDropdown === 'account'}
            onToggle={() => toggleDropdown('account')}
            position="left"
          />
          </div>
        </div>

        {/* Search and Navigation (Visible only on medium and larger screens) */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar />
          <div className="relative z-50 flex items-center space-x-6">
            <div className="relative" ref={mobileDropdownRef}>
            <Dropdown
              label={<UserIcon userInfo={userInfo} />}
              items={userInfo ? ['Profile', 'Logout', 'Orders', 'Settings'] : ['Login', 'Signup']}
              isOpen={activeDropdown === 'account'}
              onToggle={() => toggleDropdown('account')}
              position="right"
            />
            </div>
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