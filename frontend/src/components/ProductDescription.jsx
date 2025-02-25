import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDescription = ({ product }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const dispatch = useDispatch();

  const toggleEnlarge = () => {
    setIsEnlarged(!isEnlarged);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Add product to cart
  };

  return (
    <div className="p-4 w-full border border-gray-200 rounded-md bg-blue-200 md:mx-2">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-9">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className={`w-64 object-cover rounded-lg cursor-pointer transition-transform duration-300 ${
                isEnlarged ? "scale-150" : ""
              }`}
              onClick={toggleEnlarge}
            />
            {isEnlarged && (
              <button
                onClick={toggleEnlarge}
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              >
                ✖
              </button>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

          <div className="mt-4">
            <p className="text-lg font-bold">${product.discountPrice}</p>
            <p className="text-sm line-through text-gray-500">${product.actualPrice}</p>
            <p className="text-green-600">
              {Math.round(
                ((product.actualPrice - product.discountPrice) / product.actualPrice) * 100
              )}
              % off
            </p>
          </div>

          <p className="text-gray-600 mt-2">{product.unitsLeft} units left</p>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className="cursor-pointer w-full bg-green-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDescription;