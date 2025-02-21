import React, { useState } from "react";

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    { id: "jumia", name: "Pre-pay Now", description: "Pay now fast and securely with JumiaPay, Mastercard or Visa." },
    { id: "airtel", name: "Pay Now with Airtel", description: "Pay now fast and securely with your Airtel Money account." },
    { id: "absa", name: "ABSA Card", description: "Enjoy ABSA Credit Card Installment for payments above KES 10,000." },
    { id: "mpesa", name: "Pay Now with M-Pesa", description: "Pay now fast and securely with your Mpesa account." },
    { id: "delivery", name: "Pay on Delivery", description: "Pay on delivery with Mobile Money and Bank Cards.", disabled: true }
  ];

  const handleSelect = (id) => {
    if (!paymentMethods.find(method => method.id === id)?.disabled) {
      setSelectedMethod(id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-3xl">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">PAYMENT METHOD</h2>

      {/* Payment Options */}
      <div className="space-y-3">
        {paymentMethods.map(method => (
          <label key={method.id} className={`block p-4 border rounded-lg cursor-pointer transition-all ${method.disabled ? "opacity-50 cursor-not-allowed" : "hover:border-green-500"} ${selectedMethod === method.id ? "border-green-500 bg-green-100" : "border-gray-300"}`}>
            <input
              type="radio"
              name="payment"
              value={method.id}
              disabled={method.disabled}
              checked={selectedMethod === method.id}
              onChange={() => handleSelect(method.id)}
              className="hidden"
            />
            <div>
              <p className="text-lg font-medium">{method.name}</p>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          </label>
        ))}
      </div>

      {/* Confirmation Button */}
      <button
        className={`mt-4 w-full py-2 text-white font-bold rounded ${selectedMethod ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
        disabled={!selectedMethod}
      >
        Confirm Payment Method
      </button>
    </div>
  );
};

export default Payment;