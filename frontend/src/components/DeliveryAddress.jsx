import React from 'react';

const DeliveryAddress = () => {
  return (
    <div className="p-4 md:w-1/3  bg-white rounded-md">
      <h2 className="text-lg font-semibold mb-4">Delivery &amp; Returns</h2>

      {/* Express Delivery */}
      <div className="mb-4">
        <p className="text-sm font-bold">Express delivery in main cities</p>
        <a href="#" className="text-xs text-blue-500 underline">Details</a>
      </div>

      {/* Choose Your Location */}
      <div className="mb-4">
        <p className="text-sm font-bold">Choose your location</p>
        <select className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm">
          <option>Nairobi</option>
          <option>Mombasa</option>
          <option>Kisumu</option>
          <option>Eldoret</option>
        </select>
      </div>

      {/* Pickup Station */}
      <div className="mb-4">
        <p className="text-sm font-bold">Pickup Station</p>
        <p className="text-sm">Adams Arcade / Dagoretti Corner</p>
        <a href="#" className="text-xs text-blue-500 underline">Details</a>
        <p className="text-xs text-gray-600">Delivery Fees KSh 90</p>
        <p className="text-xs text-gray-600">
          Ready for pickup on 19 February if you place your order within the next 20hrs 41mins
        </p>
      </div>

      {/* Door Delivery */}
      <div className="mb-4">
        <p className="text-sm font-bold">Door Delivery</p>
        <a href="#" className="text-xs text-blue-500 underline">Details</a>
        <p className="text-xs text-gray-600">Delivery Fees KSh 200</p>
        <p className="text-xs text-gray-600">
          Ready for delivery on 19 February if you place your order within the next 20hrs 41mins
        </p>
      </div>

      {/* Return Policy */}
      <div className="mb-4">
        <p className="text-sm font-bold">Return Policy</p>
        <a href="#" className="text-xs text-blue-500 underline">Details</a>
        <p className="text-xs text-gray-600">Easy Return, Quick Refund.</p>
      </div>

      {/* User Input for Preferred Address */}
      <div className="mb-4">
        <p className="text-sm font-bold">Preferred Address</p>
        <textarea
          placeholder="Enter your address and description if needed"
          className="mt-1 w-full border border-gray-300 rounded-md p-2 text-sm"
        />
      </div>
    </div>
  );
};

export default DeliveryAddress;