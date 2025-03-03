import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCustomerDetails } from "../redux/actions/userActions";

const CustomerAddress = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    address: "Kenya Science Campus, Opposite Junction Mall, Ngong Rd, Call on Arrival",
    city: "Nairobi",
    country: "Kenya",
    phone: "+254",
  });

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    console.log("Updated Address:", customerDetails);
    dispatch(updateCustomerDetails(customerDetails));
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-3xl">
      {/* Header and Change Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">CUSTOMER ADDRESS</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="cursor-pointer text-green-500 hover:text-green-700 font-medium transition-colors"
        >
          Change ▶
        </button>
      </div>

      {/* Customer Details */}
      <div className="space-y-3 text-gray-700">
        <p className="text-lg font-medium">Francis Rombo</p>
        <p className="text-gray-600">{customerDetails.address}</p>
        <p className="text-gray-600 font-medium">{customerDetails.city}</p>
        <p className="text-gray-600 font-semibold">{customerDetails.country}</p>
        <p className="text-gray-600 font-semibold">{customerDetails.phone}</p>
      </div>

      {/* Modal for Editing Address */}
      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Address</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="address"
                value={customerDetails.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Address"
              />
              <input
                type="text"
                name="city"
                value={customerDetails.city}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter City"
              />
              <input
                type="text"
                name="country"
                value={customerDetails.country}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Country"
              />
              <input type="text" name="phone" value={customerDetails.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAddress;