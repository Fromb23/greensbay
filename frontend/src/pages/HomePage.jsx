import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slideshow from "../components/SlideShow";
import products from "/src/data/products";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

const Homepage = ({ addToCart }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Main Content Wrapper */}
      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar (Hidden on small screens) */}
        <div className="hidden md:block  bg-gray-100 0 m-3 rounded-md">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow p-3 md:p-5 flex flex-col">
          <Slideshow />

          {/* Product Grid - Fully Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 md:p-5 rounded-md border-t border-gray-300">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;