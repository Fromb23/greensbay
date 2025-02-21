import React from "react";
import CartSummary from "../components/CartSummary";
import Wishlist from "../components/Wishlist";

const Checkout = ({ cartItems = [] }) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) return (
  <div><h2 className="text-center text-gray-500">Cart is empty</h2>
  <CartSummary cartItems={cartItems} />
  </div>
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
		<CartSummary cartItems={cartItems} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-2">Cart Summary</h2>
        <p className="text-sm">Total Items: <span className="font-bold">{totalItems}</span></p>
        <p className="text-sm">Total Price: <span className="font-bold">Ksh {totalPrice.toLocaleString()}</span></p>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Checkout
        </button>
		<Wishlist wishlistItems={wishlistItems} addToCart={addToCart} />
      </div>
    </div>
  );
};

export default Checkout;