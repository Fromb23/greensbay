import React, { useState, useEffect } from "react";
import { fetchProducts } from "../redux/actions/productActions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slideshow from "../components/SlideShow";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

const Homepage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    // Simulating category fetch (Replace with real API if available)
    const categoryList = [
      { name: "Flash Sales", img: "/images/flash-sales.png" },
      { name: "Phone Deals", img: "/images/phone-deals.png" },
      { name: "Computing Accessories", img: "/images/computing.png" },
      { name: "New Arrivals", img: "/images/new-arrivals.png" },
      { name: "Clearance Sale", img: "/images/clearance-sale.png" },
      { name: "Earn Money NOW", img: "/images/earn-money.png" },
      { name: "Laptop Deals", img: "/images/laptop-deals.png" },
      { name: "Deals On Soundbars", img: "/images/soundbars.png" },
      { name: "Small Appliances", img: "/images/small-appliances.png" },
      { name: "Home Decor", img: "/images/home-decor.png" },
      { name: "Supermarket Deals", img: "/images/supermarket.png" },
      { name: "Beauty Essentials", img: "/images/beauty-essentials.png" },
    ];
    setCategories(categoryList);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <div className="hidden md:block bg-gray-100 m-3 rounded-md">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow p-3 md:p-5 flex flex-col">
          <Slideshow />

          {/* Loading Indicator */}
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 md:p-5 rounded-md border-t border-gray-300">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                  ))
                ) : (
                  <p className="text-center col-span-full text-gray-500">No products available.</p>
                )}
              </div>

              {/* Shop By Category */}
              <div className="bg-white p-5 mt-6 rounded-lg shadow-lg">
                <h2 className="text-center text-xl font-semibold text-grey-300 mb-4">Shop By Category</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categories.map((category, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 shadow-md flex flex-col items-center">
                      <img src={category.img} alt={category.name} className="w-16 h-16 object-cover" />
                      <p className="text-sm font-medium mt-2">{category.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Arrivals | Top Deals | Shop Now */}
              <div className="bg-gray-100 p-5 mt-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">New Arrivals | Top Deals | Shop Now</h2>
                  <button className="text-blue-500 font-medium hover:underline">See All &gt;</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {/* Placeholder buttons with images */}
                  <button className="bg-white p-3 rounded-lg shadow-md">
                    <img src="/images/new-arrival.png" alt="New Arrival" className="w-16 h-16 mx-auto" />
                    <p className="text-sm font-medium mt-2 text-center">New Arrival</p>
                  </button>
                  <button className="bg-white p-3 rounded-lg shadow-md">
                    <img src="/images/top-deal.png" alt="Top Deals" className="w-16 h-16 mx-auto" />
                    <p className="text-sm font-medium mt-2 text-center">Top Deals</p>
                  </button>
                  <button className="bg-white p-3 rounded-lg shadow-md">
                    <img src="/images/shop-now.png" alt="Shop Now" className="w-16 h-16 mx-auto" />
                    <p className="text-sm font-medium mt-2 text-center">Shop Now</p>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;