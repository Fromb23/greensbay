import React, { useState } from "react";

function Header() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="bg-white text-green-500 p-4 shadow-md">
		{/* Logo, Search, Account, Help, Cart */}
      <div className="flex justify-between items-center beg-white">
        <div>
          <h2 className="text-lg font-bold">
            <a href="/" className="text-green-500">GreenBay</a>
          </h2>
          <p className="text-sm">Trusted Second Life Appliances</p>

          {/* All Categories Dropdown */}
          <div className="relative mt-2">
            <button
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="bg-white-500 text-white px-4 py-2 rounded-md focus:outline-none"
            >
              All Categories ▼
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md">
                <ul className="py-2 text-black">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Category 1</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Category 2</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Category 3</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search for products"
            className="border border-gray-300 px-3 py-1 rounded-md text-black-500" 
          />
          <button className="text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white">
            Search
          </button>

          {/* Account Dropdown */}
          <div className="relative text-black">
            <button
              onClick={() => setAccountOpen(!accountOpen)}
              className="text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white"
            >
              Account ▼
            </button>
            {accountOpen && (
              <div className="absolute right-0 mt-2 w-40 border border-gray-200 shadow-lg rounded-md">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign In</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Sign Up</li>
                </ul>
              </div>
            )}
          </div>

		  {/* Help Dropdown */}
		  <div className="relative text-black">
          <button
            onClick={() => setHelpOpen(!helpOpen)}
            className="text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white"
          >
            Help ▼
          </button>
          {helpOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md">
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">FAQs</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Support</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Terms & Conditions</li>
              </ul>
            </div>
          )}
        </div>

          <button className="text-green-500 border border-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white">
            Cart
          </button>
        </div>
      </div>

		{/* Navigation Links (*/}
      <div className="mt-4 flex justify-center space-x-4">
        <button className="text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white">
          Home
        </button>
        <button className="text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white">
          Buy
        </button>
        <button className="text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white">
          Sell
        </button>
        <button className="text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white">
          About Us
        </button>
        <button className="text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white">
          Contact Us
        </button>
        <button className="text-green-500 px-4 py-2 rounded-md hover:bg-green-500 hover:text-white">
          Calculator
        </button>
      </div>
    </div>
  );
}

export default Header;