import React, { useState, useEffect } from "react";
import FinalPay from "../components/FinalPayment";

const FinalPayment = () => {
  const [previousPayment, setPreviousPayment] = useState("");

  const maskPhone = (phone) => {
    return phone.replace(/^(\d{2})\d{5}(\d{3})$/, "$1-XXXXX-$2");
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setPreviousPayment(maskPhone(userInfo.phone));
    }
  }, []);

  console.log("previousPayment:", previousPayment);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center md:justify-start justify-center bg-white shadow-md p-4">
        <h1 className="text-green-600 text-xl font-bold">GreenPay</h1>
      </header>

      {/* Pass previousPayment to FinalPay */}
      <FinalPay previousPayment={previousPayment} />
    </div>
  );
};

export default FinalPayment;