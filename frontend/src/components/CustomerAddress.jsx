import React from "react";

const CustomerAddress = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-3xl">
      {/* Header and Change Button Row */}
      <div className="flex justify-between items-center mb-4">
        {/* Section Title */}
        <h2 className="text-xl font-semibold text-gray-800">CUSTOMER ADDRESS</h2>

        {/* Change Button */}
        <button className="cursor-pointer text-green-500 hover:text-green-700 font-medium transition-colors">
          Change ▶
        </button>
      </div>

      {/* Customer Details */}
      <div className="space-y-3 text-gray-700">
        {/* Name */}
        <p className="text-lg font-medium">Francis Rombo</p>

        {/* Address */}
        <p className="text-gray-600">
          Kenya Science Campus, Opposite Junction Mall, Ngong Rd, Call on Arrival
        </p>

        {/* Location */}
        <p className="text-gray-600 font-medium">Nairobi - Adams Arcade / Dagoretti Corner</p>

        {/* Phone Number */}
        <p className="text-gray-600 font-semibold">+254 758652334</p>
      </div>
    </div>
  );
};

export default CustomerAddress;