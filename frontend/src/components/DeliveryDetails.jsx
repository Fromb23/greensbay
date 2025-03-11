import React, { useState, useEffect } from "react";
import axios from "axios";

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block text-gray-600 text-sm font-medium">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-400"
      placeholder={`Enter ${label}`}
    />
  </div>
);

const DeliveryAddress = () => {
  const storedUser = JSON.parse(localStorage.getItem("userInfo")) || {};
  const [isEditing, setIsEditing] = useState(false);
  const [userId, setUserId] = useState(storedUser?.id || null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: "",
    city: "",
    zipCode: "",
    state: "",
    phone: "",
  });

  useEffect(() => {
    if (!userId) return;
    const fetchDeliveryDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/address/getDelivery/${userId}`);
        if (data?.address) setDeliveryDetails(data);
      } catch {
        console.error("No delivery address found, using default values.");
      }
    };
    const timer = setTimeout(fetchDeliveryDetails, 500);
    return () => clearTimeout(timer);
  }, [userId]);

  const handleConfirm = async () => {
    console.log("user id in updates fe", deliveryDetails);
    if (!userId) return console.error("User ID not available");
    try {
      await axios.put(`http://localhost:5001/api/address/updateDelivery/${userId}`, {
        userId,
        ...deliveryDetails,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update delivery address", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg mx-auto md:max-w-2xl lg:max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">DELIVERY ADDRESS</h2>
        <button onClick={() => setIsEditing(true)} className="text-green-500 hover:text-green-700 font-medium">
          Change ▶
        </button>
      </div>

      <div className="space-y-3 text-gray-700">
        <p className="text-lg font-medium">{storedUser.firstname} {storedUser.lastname}</p>
        <p className="text-gray-600">Phone: {storedUser.phone}</p>
        <p className="text-gray-600">{deliveryDetails.address}</p>
        <p className="text-gray-600 font-medium">{deliveryDetails.city}</p>
        <p className="text-gray-600 font-medium">{deliveryDetails.zipCode}</p>
        <p className="text-gray-600 font-semibold">{deliveryDetails.state}</p>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Delivery Address</h2>
            <div className="space-y-3">
              {["address", "city", "zipCode", "state", "phone"].map((field) => (
                <InputField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  value={deliveryDetails[field]}
                  onChange={(e) => setDeliveryDetails({ ...deliveryDetails, [field]: e.target.value })}
                />
              ))}
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button onClick={() => setIsEditing(false)} className="bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded">
                Cancel
              </button>
              <button onClick={handleConfirm} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;