import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductCard({ product, addToCart }) {
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    toast.success("Added to Cart");

    // Navigate to cart after adding the product
    setTimeout(() => {
      navigate("/cart");
    }, 500);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-3 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105">
      <a href={`/product/${product.id}`} className="block w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md transition-transform duration-300 hover:scale-110"
        />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600 text-sm">Units Left: {product.unitsLeft}</p>
        <p className="mt-1">
          <span className="text-red-500 font-bold text-lg">${product.discountPrice}</span>
          <span className="text-gray-400 line-through text-sm ml-2">${product.actualPrice}</span>
        </p>
      </a>
      <button
        className="bg-green-600 text-white text-xs px-3 py-2 rounded-md mt-auto hover:bg-green-700 transition disabled:bg-gray-400"
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? "Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;