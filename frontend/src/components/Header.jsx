import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartBadge from './CartBadge';
import { logout } from '../redux/slices/userSlice';
import { IoHelpCircleOutline } from "react-icons/io5";

const UserIcon = ({ userInfo, type }) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="flex items-center space-x-2">
      {type === "menu" && isMobile ? (
        // Show Menu (Hamburger) Icon for Categories on Mobile
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
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      ) : userInfo ? (
        // Logged-in: Dropdown Arrow + Badge
        <span className="relative flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
        </span>
      ) : (
        // Logged-out: Account Icon
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

      {!isMobile && <span className="text-gray-700">{userInfo ? `Hi, ${userInfo.firstname}` : "Account"}</span>}
    </div>
  );
};


// Reusable Dropdown Component
const Dropdown = ({ label, items, isOpen, onToggle, position = "left" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleItemClick = (item) => {
    console.log("Clicked item:", item);

    const routes = {
      Orders: "/orders",
      Settings: "/user/settings",
      Login: "/auth/login",
      Signup: "/auth/signup",
      Electronics: "/electronics",
      Clothing: "/clothing",
      "Home & Garden": "/home-garden",
      FAQ: "/faq",
      Support: "/chat",
      "Contact Us": "/contact",
    };

    if (item === "Logout") {
      dispatch(logout());
      navigate("/");
      window.location.reload();
    } else if (routes[item]) {
      navigate(routes[item]);
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

  // Refs for dropdowns (Desktop)
  const categoriesRef = useRef(null);
  const accountRef = useRef(null);
  const helpRef = useRef(null);

  // Refs for dropdowns (Mobile)
  const mobileCategoriesRef = useRef(null);
  const mobileAccountRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop dropdowns if clicked outside
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setActiveDropdown((prev) => (prev === 'categories' ? null : prev));
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setActiveDropdown((prev) => (prev === 'account' ? null : prev));
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setActiveDropdown((prev) => (prev === 'help' ? null : prev));
      }

      // Close mobile dropdowns if clicked outside
      if (mobileCategoriesRef.current && !mobileCategoriesRef.current.contains(event.target)) {
        setActiveDropdown((prev) => (prev === 'mobile-categories' ? null : prev));
      }
      if (mobileAccountRef.current && !mobileAccountRef.current.contains(event.target)) {
        setActiveDropdown((prev) => (prev === 'mobile-account' ? null : prev));
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
        {/* Categories Icon (Mobile Only) */}
        <div className="md:hidden relative" ref={mobileCategoriesRef}>
          <Dropdown
            label={<UserIcon type="menu" />}
            items={['Electronics', 'Clothing', 'Home & Garden']}
            isOpen={activeDropdown === 'mobile-categories'}
            onToggle={() => toggleDropdown('mobile-categories')}
          />
        </div>

        {/* Logo */}
        <div
          className="cursor-pointer text-lg font-bold text-green-700"
          onClick={() => window.location.href = '/'}
        >
          GreenBay
        </div>

        {/* Cart and Account Icons (Mobile Only) */}
        <div className="md:hidden flex items-center space-x-4">
          <div onClick={() => toggleDropdown('cart')}>
            <CartBadge />
          </div>

          {/* Mobile Account Dropdown */}
          <div className="md:hidden relative" ref={mobileAccountRef}>
            <Dropdown
              label={<UserIcon />}
              items={userInfo ? ['Logout', 'Orders', 'Settings'] : ['Login', 'Signup']}
              isOpen={activeDropdown === 'mobile-account'}
              onToggle={() => toggleDropdown('mobile-account')}
              position="left"
            />
          </div>
        </div>

        {/* Search and Navigation (Desktop Only) */}
        <div className="hidden md:flex items-center space-x-6">
          <SearchBar />
          <div className="relative z-50 flex items-center space-x-6">
            <div className="relative" ref={accountRef}>
              <Dropdown
                label={<UserIcon userInfo={userInfo} />}
                items={userInfo ? ['Logout', 'Orders', 'Settings'] : ['Login', 'Signup']}
                isOpen={activeDropdown === 'account'}
                onToggle={() => toggleDropdown('account')}
                position="right"
              />
            </div>
            <div className="relative" ref={helpRef}>
              <Dropdown
                label={
                  <span className="flex items-center space-x-1">
                    <IoHelpCircleOutline className="text-lg" /> 
                    <span>Help</span>
                  </span>
                }
                items={['FAQ', 'Support', 'Contact Us']}
                isOpen={activeDropdown === 'help'}
                onToggle={() => toggleDropdown('help')}
                position="right"
              />
            </div>
            <div onClick={() => toggleDropdown('cart')}>
              <CartBadge />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar (Mobile Only) */}
      <div className="md:hidden p-4 bg-gray-100">
        <SearchBar isMobile />
      </div>

      {/* Additional Header Section (Desktop Only) */}
      <div className="hidden md:block bg-gray-100 py-2">
        <div className="container mx-auto flex items-center">
          {/* All Categories Dropdown (Desktop) */}
          <div className="mr-6" ref={categoriesRef}>
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