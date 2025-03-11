import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  console.log("cartItems:", cartItems);

  return (
    <div className="p-4 rounded-lg shadow-md bg-white mt-3">
      <button
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      onClick={() => navigate("/chat")}
    >
      Support
    </button>
      {/* Hide "Cart (0)" if cart is empty */}
      <h2 className="text-xl font-bold mb-4">
        {cartItems.length > 0 && `Cart (${cartItems.length})`}
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500">
          <h4 className="text-lg font-semibold mb-2">Your cart is empty!</h4>
          <p className="mb-4 text-center">
            Browse our categories and discover our best deals
          </p>
          <button
            onClick={() => navigate("/")} 
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer">
            Browse Categories
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center p-3 border-b gap-4"
            >
              {/* Product Image */}
              <img
                src={item.image.replace("imgur.com", "i.imgur.com") + ".jpg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">Seller: {item.seller}</p>
                <p className="text-gray-500">Volume: {item.volume}</p>
                <p className="text-green-500">In Stock</p>
                <p className="text-gray-500">{item.deliveryOption}</p>
              </div>

              {/* Price and Discount */}
              <div className="flex flex-col items-end">
                <p className="font-semibold">
                  KSh {item.discount_price?.toLocaleString() ?? "0"}
                </p>
                <p className="text-gray-500 line-through">
                  KSh {item.actual_price?.toLocaleString() ?? "0"}
                </p>
                <p className="text-red-500">-{Math.round((item.discount_price)/(item.actual_price) * 100) ?? "0"}%</p>
              </div>

              {/* Quantity Controls & Remove Button */}
              <div className="flex items-center gap-2">
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;