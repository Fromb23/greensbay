import React, { useState } from "react";
import { HelpCircle } from "lucide-react"; // Icon for help

const FinalPay = ({ totalAmount, previousPayment = "M-PESA XXXX-2334" }) => {
  const [selectedPayment, setSelectedPayment] = useState("previous");
  const [mobileOption, setMobileOption] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {/* ORDER SUMMARY */}
        <h2 className="text-xl font-semibold mb-4">ORDER SUMMARY</h2>
        <div className="flex justify-between items-center mb-6 border p-3 rounded-lg bg-gray-50">
          <p className="text-gray-600">TOTAL TO PAY</p>
          <p className="text-gray-800 font-semibold">{totalAmount}</p>
        </div>

        {/* PREVIOUSLY USED PAYMENT METHODS */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">PREVIOUSLY USED PAYMENT METHODS</h3>
          <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="previous"
              checked={selectedPayment === "previous"}
              onChange={() => setSelectedPayment("previous")}
              className="form-radio text-blue-500"
            />
            <p className="text-gray-800">{previousPayment}</p>
          </label>
        </div>

        {/* CHOOSE A NEW PAYMENT METHOD */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">CHOOSE A NEW PAYMENT METHOD</h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="mobile"
                checked={selectedPayment === "mobile"}
                onChange={() => setSelectedPayment("mobile")}
                className="form-radio text-blue-500"
              />
              <p className="text-gray-800">Mobile Money</p>
            </label>
            
            {selectedPayment === "mobile" && (
              <div className="mt-2 space-y-2">
                <select
                  value={mobileOption}
                  onChange={(e) => setMobileOption(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                >
                  <option value="">Select Mobile Service</option>
                  <option value="mpesa">M-Pesa</option>
                  <option value="airtel">Airtel Money</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  className="w-full p-2 border rounded-lg bg-gray-100"
                />
              </div>
            )}

            <label className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={selectedPayment === "bank"}
                onChange={() => setSelectedPayment("bank")}
                className="form-radio text-blue-500"
              />
              <p className="text-gray-800">Bank Cards</p>
            </label>

            {selectedPayment === "bank" && (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full p-2 border rounded-lg bg-gray-100"
                />
                <div className="flex space-x-2">
                  <input
                    type="month"
                    placeholder="Expiry (MM/YY)"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-1/2 p-2 border rounded-lg bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-1/2 p-2 border rounded-lg bg-gray-100"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* PAY NOW BUTTON & HELP ICON */}
        <div className="flex justify-between items-center">
          <button className="w-3/4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            PAY NOW: {totalAmount}
          </button>
          <HelpCircle className="w-8 h-8 text-gray-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default FinalPay;