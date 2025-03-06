import React from "react";

function FilterSidebar() {
  return (
    <aside className="w-64 p-4 bg-white shadow-md">
      {/* Category Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Category</h3>
        <ul className="space-y-2">
          {[
            "Electronics",
            "Sporting Goods",
            "Garden & Outdoors",
            "Phones & Tablets",
            "Fashion",
            "Home & Office",
            "Health & Beauty",
            "Baby Products",
            "Industrial & Scientific",
            "Express Delivery",
          ].map((category, index) => (
            <li key={index} className="text-gray-700 hover:text-green-500 cursor-pointer">
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Shipped From */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Shipped From</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-green-500" />
            <span>Shipped from abroad</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox text-green-500" />
            <span>Shipped from Kenya</span>
          </label>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price (KSh)</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none">
          Apply
        </button>
      </div>

      {/* Discount Percentage */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Discount Percentage</h3>
        <div className="space-y-2">
          {["50% or more", "40% or more", "30% or more", "20% or more", "10% or more"].map(
            (discount, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-green-500" />
                <span>{discount}</span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Brand Search */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Brand</h3>
        <input
          type="text"
          placeholder="Search Brand"
          className="w-full px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <ul className="mt-2 space-y-2">
          {["24 7 FASHION", "AA Fashion", "Aichun Beauty", "Baby", "Generic", "Jumia"].map(
            (brand, index) => (
              <li key={index} className="text-gray-700 hover:text-green-500 cursor-pointer">
                {brand}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Official Store */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Official Stores</h3>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="form-checkbox text-green-500" />
          <span>Only Official Store</span>
        </label>
      </div>
    </aside>
  );
}

export default FilterSidebar;