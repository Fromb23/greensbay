import Header from "../components/Header";
import Footer from "../components/Footer";
import Slideshow from "../components/SlideShow";
import products from "/src/data/products";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import "../styles/HomePage.css";

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content Wrapper (Flexbox) */}
      <div className="flex flex-grow">
        {/* Sidebar (Left) */}
        <FilterSidebar className="filter-sidebar" />

        {/* Right Content: Slideshow + Products */}
        <div className="main-content">
          <Slideshow />

          {/* Product Grid */}
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Extra Content */}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;