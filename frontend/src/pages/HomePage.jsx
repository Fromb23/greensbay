import React, { useState, useEffect } from "react";
import { fetchProducts } from "../redux/actions/productActions";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slideshow from "../components/SlideShow";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

const Homepage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
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

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar (Hidden on small screens) */}
        <div className="hidden md:block bg-gray-100 m-3 rounded-md">
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="flex-grow p-3 md:p-5 flex flex-col">
          <Slideshow />

          {/* Show Loading Indicator While Fetching Products */}
          {loading ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-3 md:p-5 rounded-md border-t border-gray-300">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">No products available.</p>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;