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
      className="bg-white shadow-lg rounded-lg p-4 text-center cursor-pointer transition-transform duration-300 hover:scale-105 border border-gray-200 flex flex-col"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Section */}
      <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image ? product.image.replace("imgur.com", "i.imgur.com") + ".jpg" : "noimage.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <h3 className="text-md font-semibold mt-3 truncate">{product.name}</h3>
      <div className="flex justify-center items-center gap-2 mt-2">
        <p className="text-red-500 font-bold text-lg">${parseInt(product.discount_price, 10)}</p>
        <p className="text-gray-400 line-through text-sm">${parseInt(product.actual_price, 10)}</p>
      </div>
      <p className="text-sm text-gray-500 mt-1">Units left: {product.units_left}</p>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full mt-3 px-4 py-2 rounded-md text-white font-semibold transition ${
          addedToCartItemId === product.id
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
        disabled={addedToCartItemId === product.id}
      >
        {addedToCartItemId === product.id ? "Added to cart" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;