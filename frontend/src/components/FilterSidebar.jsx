import React from "react";
import "../styles/FilterSidebar.css"; // Custom CSS for layout and design

function FilterSidebar() {
  return (
    <aside className="filter-sidebar">
      {/* Category Section */}
      <div className="filter-section">
        <h3>Category</h3>
        <ul>
          <li>Electronics</li>
          <li>Sporting Goods</li>
          <li>Garden & Outdoors</li>
          <li>Phones & Tablets</li>
          <li>Fashion</li>
          <li>Home & Office</li>
          <li>Health & Beauty</li>
          <li>Baby Products</li>
          <li>Industrial & Scientific</li>
          <li>Express Delivery</li>
        </ul>
      </div>

      {/* Shipped From */}
      <div className="filter-section">
        <h3>Shipped From</h3>
        <label><input type="checkbox" /> Shipped from abroad</label>
        <label><input type="checkbox" /> Shipped from Kenya</label>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h3>Price (KSh)</h3>
        <input type="number" placeholder="Min" />
        <span> - </span>
        <input type="number" placeholder="Max" />
        <button className="apply-button">Apply</button>
      </div>

      {/* Discount Percentage */}
      <div className="filter-section">
        <h3>Discount Percentage</h3>
        <label><input type="checkbox" /> 50% or more</label>
        <label><input type="checkbox" /> 40% or more</label>
        <label><input type="checkbox" /> 30% or more</label>
        <label><input type="checkbox" /> 20% or more</label>
        <label><input type="checkbox" /> 10% or more</label>
      </div>

      {/* Brand Search */}
      <div className="filter-section">
        <h3>Brand</h3>
        <input type="text" placeholder="Search Brand" />
        <ul>
          <li>24 7 FASHION</li>
          <li>AA Fashion</li>
          <li>Aichun Beauty</li>
          <li>Baby</li>
          <li>Generic</li>
          <li>Jumia</li>
        </ul>
      </div>

      {/* Official Store */}
      <div className="filter-section">
        <h3>Official Stores</h3>
        <label><input type="checkbox" /> Only Official Store</label>
      </div>
    </aside>
  );
}

export default FilterSidebar;