import React, { useState } from "react";
import { useDispatch } from "react-redux";

const DeliveryDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "Nairobi",
    state: "",
    zipCode: "",
    phone: "+254 7",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    dispatch({ type: "UPDATE_DELIVERY_ADDRESS", payload: deliveryInfo });
    setShowModal(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">DELIVERY DETAILS</h2>
        <button
          className="cursor-pointer text-green-500 hover:text-green-600 font-medium transition-colors"
          onClick={() => setShowModal(true)}
        >
          Change ▶
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-gray-800 font-medium">Francis Rombo</p>
        <p className="text-gray-600">{deliveryInfo.address}</p>
        <p className="text-gray-600">{deliveryInfo.city} - {deliveryInfo.state}</p>
        <p className="text-gray-600">{deliveryInfo.phone}</p>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-grey-600 bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Update Delivery Address</h2>
            <div className="space-y-2">
              <input type="text" name="address" value={deliveryInfo.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" />
              <input type="text" name="city" value={deliveryInfo.city} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" />
              <input type="text" name="state" value={deliveryInfo.state} onChange={handleChange} placeholder="State" className="w-full p-2 border rounded" />
              <input type="text" name="zipCode" value={deliveryInfo.zipCode} onChange={handleChange} placeholder="Zip Code (Optional)" className="w-full p-2 border rounded" />
              <input type="text" name="phone" value={deliveryInfo.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryDetails;