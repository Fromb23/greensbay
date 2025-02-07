import React, { useState } from "react";
import "../styles/Header.css";

function Header() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  // Function to close all dropdowns when clicking outside
  const closeDropdowns = () => {
    setCategoriesOpen(false);
    setAccountOpen(false);
    setHelpOpen(false);
  };

  return (
    <div className="header-container" onClick={closeDropdowns}>
      {/* Parent flex container for left and right sections */}
      <div className="flex justify-between items-center">
        
        {/* Left Section */}
        <div className="left-section">
          {/* Logo and Title */}
          <div>
            <h2 className="text-lg font-bold">
              <a href="/" className="text-green-500">GreenBay</a>
            </h2>
            <i><p className="text-sm mt-0">Trusted Second Life Appliances</p></i>
          </div>

          {/* All Categories Dropdown */}
          <div className="categories-container">
            <div className={`dropdown ${categoriesOpen ? "open" : ""}`}>
              <button onClick={(e) => { e.stopPropagation(); setCategoriesOpen(!categoriesOpen); }}>
                All Categories ▼
              </button>
              <div className="dropdown-menu">
                <ul>
                  <li>Category 1</li>
                  <li>Category 2</li>
                  <li>Category 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          {/* Top Section (Search, Account, Help, Cart) */}
          <div className="top-right">
            <input
              type="text"
              placeholder="Search for products"
              className="w-150 min-w-36 border-black/50 border-[1px] rounded-md p-1 text-black placeholder-black itali"
            />
            <button>Search</button>

            {/* Account Dropdown */}
            <div className={`dropdown ${accountOpen ? "open" : ""}`}>
              <button onClick={(e) => { e.stopPropagation(); setAccountOpen(!accountOpen); }}>
                Account ▼
              </button>
              <div className="dropdown-menu">
                <ul>
                  <li>Sign In</li>
                  <li>Sign Up</li>
                </ul>
              </div>
            </div>

            {/* Help Dropdown */}
            <div className={`dropdown ${helpOpen ? "open" : ""}`}>
              <button onClick={(e) => { e.stopPropagation(); setHelpOpen(!helpOpen); }}>
                Help ▼
              </button>
              <div className="dropdown-menu">
                <ul>
                  <li>FAQs</li>
                  <li>Support</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
            </div>

            <button>Cart</button>
          </div>

          {/* Bottom Section (Navigation Links) */}
          <div className="bottom-right">
            <button>Home</button>
            <button>Buy</button>
            <button>Sell</button>
            <button>About Us</button>
            <button>Contact Us</button>
            <button>Calculator</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Header;