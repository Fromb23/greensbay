import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  if (!product) return null;

  const [addedToCartItemId, setAddedToCartItemId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const isAdded = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Added to Cart");
    setAddedToCartItemId(product.id);
  };

  useEffect(() => {
    if (addedToCartItemId !== null) {
      const timer = setTimeout(() => {
        setAddedToCartItemId(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [addedToCartItemId]);

  return (
    <div
      className="flex-1 overflow-hidden bg-white shadow-lg rounded-lg p-4 text-xs cursor-pointer transition-transform duration-300 hover:scale-105 border border-gray-200 flex flex-col"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Section */}
      <div className="md:w-1/2 md:ml-8 aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image ? product.image.replace("imgur.com", "i.imgur.com") + ".jpg" : "noimage.jpg"}
          alt={product.name}
          className="w-full max-h-50 object-contain"
        />
      </div>

      {/* Product Details */}
      <h3 className="font-semibold mt-3 text-gray-500 truncate">{product.name}</h3>
      <div className="gap-2 mt-2">
        <p className="text-black-500 font-bold md:text-xs">Ksh {parseInt(product.discount_price, 10).toLocaleString()}</p>
        <p className="text-gray-500 line-through md:text-xs">Ksh {parseInt(product.actual_price, 10).toLocaleString()}</p>
      </div>
      <div className="hidden sm:block lg:block w-full mb-0">
        {/* Units Left Text */}
        <p className="text-xs text-left mt-4 mb-0 font-medium text-gray-700">items left {product.units_left}</p>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div
            className="bg-orange-500 h-2.5 rounded-full"
            style={{ width: `${(product.units_left / product.stock) * 100}%` }}
          ></div>
          </div>
      </div>
      {/* Add to Cart Button */}
      {/* <button
        onClick={handleAddToCart}
        className={`w-full mt-3 px-4 py-2 rounded-md text-white font-semibold transition ${
          addedToCartItemId === product.id
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        disabled={addedToCartItemId === product.id}
      >
        {addedToCartItemId === product.id ? "Added to cart" : "Add to Cart"}
      </button> */}
    </div>
  );
}

export default ProductCard;