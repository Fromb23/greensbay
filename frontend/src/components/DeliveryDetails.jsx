import React from "react";

const DeliveryDetails = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-3xl">
      {/* Header and Change Button Row */}
      <div className="flex justify-between items-center mb-4">
        {/* Section Title */}
        <h2 className="text-lg font-semibold">DELIVERY DETAILS</h2>

        {/* Change Button */}
        <button className="cursor-pointer text-green-500 hover:text-green-600 font-medium transition-colors">
          Change ▶
        </button>
      </div>

      {/* Customer Details */}
      <div className="space-y-2">
        {/* Name */}
        <p className="text-gray-800 font-medium">Francis Rombo</p>

        {/* Address */}
        <p className="text-gray-600">
          Kenya Science Campus, Opposite Junction Mall, Ngong Rd, Call on Arrival
        </p>

        {/* Location */}
        <p className="text-gray-600">Nairobi - Adams Arcade / Dagoretti Corner</p>

        {/* Phone Number */}
        <p className="text-gray-600">+254 758652334</p>
      </div>
    </div>
  );
};

export default DeliveryDetails;