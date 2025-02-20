import React from "react";

const Cart = ({ cartItems, updateQuantity, removeFromCart }) => {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white mt-3">
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
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Browse Categories
          </button>
        </div>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center p-3 border-b"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-500">KSh {item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center">
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
        ))
      )}
    </div>
  );
};

export default Cart;