import React, { useState } from "react";
import FinalPay from "../components/FinalPayment";

const FinalPayment = () => {
  const [previousPayment, setPreviousPayment] = useState("");
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center md:justify-start  justify-center bg-white shadow-md p-4">
        <h1 className="text-green-600 text-xl font-bold">GreenPay</h1>
      </header>

	  <FinalPay previousPayment={previousPayment} />
    </div>
  );
};

export default FinalPayment;