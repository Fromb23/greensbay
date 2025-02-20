import React from "react";

const CartSummary = ({ cartItems = [] }) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) return null;

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
      <p className="text-sm">Total Items: <span className="font-bold">{totalItems}</span></p>
      <p className="text-sm">Total Price: <span className="font-bold">Ksh {totalPrice.toLocaleString()}</span></p>
      <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;