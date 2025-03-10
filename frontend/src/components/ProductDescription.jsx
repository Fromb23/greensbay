import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";
import axios from "axios";

const ProductDescription = ({ product }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");

  // Check if product is in wishlist on page load
  useEffect(() => {
    if (!product?.id || !user?.id) return;
  
    const checkWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/wishlist/${user.id}`);
        const wishlistItems = response.data?.wishlist || [];
  
        if (!Array.isArray(wishlistItems)) {
          console.log("Invalid wishlist data:", wishlistItems);
          return;
        }
  
        // Ensure the wishlist contains the specific productId
        const isInWishlist = wishlistItems.some((item) => item.productId === product.id && item.userId === user.id);
  
        setIsWishlisted(isInWishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
  
    checkWishlist();
  }, [product?.id, user?.id]);  

  // Toggle Wishlist
  const handleWishListToggle = async () => {
    if (!user.id) {
      toast.error("Please login to add to wishlist");
      return;
    }

    try {
      if (isWishlisted) {
        console.log("Removing from wishlist", product.id);
        await axios.delete(`http://localhost:5001/api/wishlist/remove/${product.id}`);
        toast.error("Removed from Wishlist");
      } else {
        await axios.post("http://localhost:5001/api/wishlist/add", {
          userId: user.id,
          productId: product.id,
        });
        toast.success("Added to Wishlist");
      }

      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Something went wrong");
    }
  };

  const toggleEnlarge = () => setIsEnlarged(!isEnlarged);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Added to Cart");
  };

  return (
    <div className="p-4 w-full rounded-md">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-9">
        {/* Product Image */}
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

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          {/* Wishlist Button */}
          <div className="flex justify-end">
            <Heart
              className={`cursor-pointer transition-colors duration-300 ${
                isWishlisted ? "text-red-500 fill-red-500" : "text-gray-500"
              }`}
              onClick={handleWishListToggle}
            />
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