import React from "react";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card bg-white shadow-lg rounded-lg p-4 transition-transform duration-300 hover:scale-105">
      <a href={`/product/${product.id}`} className="product-link block">
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-40 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600 text-sm">Units Left: {product.unitsLeft}</p>
        <p className="mt-1">
          <span className="discount-price text-red-500 font-bold text-lg">
            ${product.discountPrice}
          </span>
          <span className="actual-price text-gray-400 line-through text-sm ml-2">
            ${product.actualPrice}
          </span>
        </p>
      </a>
      <button className="productcard-button rounded-md">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;