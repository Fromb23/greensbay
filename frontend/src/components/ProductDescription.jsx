import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";

const ProductDescription = ({ product }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();
  
  const handleWishListToggle = () => {
    if (isWishlisted) {
      toast.error("Removed from Wishlist");
    } else {
      toast.success("Added to Wishlist");
    }
    setIsWishlisted(!isWishlisted);
  };
  useEffect(() => {
    if (!product?.id) return;
    fetch(`http://localhost:5001/api/products/fetch-product/${product.id}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch product");
      return response.json();
    })
    .catch((error) => console.error("Error fetching product:", error));
}, [product?.id]);

  const toggleEnlarge = () => {
    setIsEnlarged(!isEnlarged);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to Cart");
  };

  return (
    <div className="p-4 w-full rounded-md">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-9">
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              src={product.image.replace("imgur.com", "i.imgur.com") + ".jpg"}
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
          <div className="flex justify-end">
            <Heart className={`text-red-500 cursor-pointer transition-colors duration-300} ${
              isWishlisted ? "text-red-500 fill-red-500" : "text-red-500 text-gray-500"
              }`} 
              onClick={handleWishListToggle}/>
          </div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>

          <div className="mt-4">
            <p className="text-lg font-bold">Ksh {product.discount_price}</p>
            <p className="text-sm line-through text-gray-500">Ksh {product.actual_price}</p>
            <p className="text-red-600">
              {Math.round(
                ((product.actual_price - product.discount_price) / product.actual_price) * 100
              )}
              % off
            </p>
          </div>

          <p className="text-gray-600 mt-2">{product.units_left} items left</p>
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