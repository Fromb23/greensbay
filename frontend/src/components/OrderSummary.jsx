import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems?.length
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  const deliveryFees = 871;
  const customsFees = 326;
  const totalAmount = subtotal + deliveryFees + customsFees;

  // Save values to localStorage whenever the component mounts or updates
  useEffect(() => {
    localStorage.setItem("totalAmount", totalAmount);
    localStorage.setItem("deliveryFees", deliveryFees);
    localStorage.setItem("customsFees", customsFees);
  }, [totalAmount, deliveryFees, customsFees]);

  return (
    <div className="bg-white p-6 rounded-lg md:mt-12 shadow-md border border-gray-200 w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="bg-yellow-100 p-4 rounded-lg mb-6">
        <p className="text-yellow-800 text-sm">
          Heads up! One or more items in your cart are shipped from abroad and
          include Junia Global customs fees. These fees have been added to your
          total.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Item's total ({cartItems.length})</p>
          <p className="text-gray-800 font-medium">KSh {subtotal.toLocaleString()}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Delivery fees</p>
          <p className="text-gray-800 font-medium">KSh {deliveryFees}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Customs fee</p>
          <p className="text-gray-800 font-medium">KSh {customsFees}</p>
        </div>

        <div className="flex justify-between border-t pt-4">
          <p className="text-gray-800 font-semibold">Total</p>
          <p className="text-gray-800 font-semibold">KSh {totalAmount.toLocaleString()}</p>
        </div>
      </div>

      <button
        className="w-full cursor-pointer mt-6 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-transform duration-150 active:scale-90"
        onClick={() => (window.location.href = "/checkout/payment")}
      >
        Confirm order
      </button>

      <p className="text-gray-500 text-sm mt-4 text-center">
        (Complete the steps in order to proceed)
      </p>
    </div>
  );
};

export default OrderSummary;