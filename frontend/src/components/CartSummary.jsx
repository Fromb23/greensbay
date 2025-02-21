import React, { use } from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ cartItems }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) * item.quantity || 0),
    0
  );

  return (
    <div className="p-4 rounded-md shadow-md bg-white mt-3">
      <h2 className="text-xl font-bold mb-4">Cart Summary</h2>

      {cartItems.length > 0 ? (
        <>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between border-b py-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold">
            Subtotal: KSh {totalPrice.toLocaleString()}
          </p>
          <button className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded w-full mt-4"
            onClick={() => navigate("/checkout/summary/")}>
            Checkout
          </button>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartSummary;