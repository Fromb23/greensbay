import React from "react";

const CartSummary = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 rounded-md shadow-md bg-white mt-3">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
      <p>Subtotal: KSh {totalPrice.toLocaleString()}</p>
      <button className="bg-orange-500 text-white px-4 py-2 rounded w-full mt-4">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;