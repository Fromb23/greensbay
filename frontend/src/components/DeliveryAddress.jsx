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
  const [userId] = useState(storedUser?.id || null);
  const [isEditing, setIsEditing] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    id: null,
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  // Fetch existing delivery details
  useEffect(() => {
    if (!userId) return;

    const fetchDeliveryDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5001/api/delivery/getDelivery/${userId}`);
        if (data) {
          setDeliveryDetails({ ...data, id: data.id }); // Ensure id is set
        }
      } catch {
        console.error("No delivery details found. Proceeding with default values.");
      }
    };

    fetchDeliveryDetails();
  }, [userId]);

  // Handle API call when confirming address update
  const handleConfirm = async () => {

    if (!userId) return console.error("Missing user ID");

    try {
      if (deliveryDetails.id) {
        // If an address exists, update it
        await axios.put(`http://localhost:5001/api/delivery/updateDelivery/${userId}`, {
          userId,
          ...deliveryDetails,
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update/create delivery address", error);
    }
  };

  console.log("deliveryDetails", userId);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 w-full max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">DELIVERY & RETURNS</h2>
        <button onClick={() => setIsEditing(true)} className="text-green-500 hover:text-green-700 font-medium">
          Change ▶
        </button>
      </div>

      <div className="space-y-3 text-gray-700">
        <p className="text-sm font-bold">Address</p>
        <p className="text-gray-600">{deliveryDetails.address || "Not provided"}</p>
        <p className="text-sm font-bold">City</p>
        <p className="text-gray-600">{deliveryDetails.city || "Not provided"}</p>
        <p className="text-sm font-bold">State</p>
        <p className="text-gray-600">{deliveryDetails.state || "Not provided"}</p>
        <p className="text-sm font-bold">Zip Code</p>
        <p className="text-gray-600">{deliveryDetails.zipCode || "Not provided"}</p>
        <p className="text-sm font-bold">Phone</p>
        <p className="text-gray-600">{deliveryDetails.phone || "Not provided"}</p>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit Delivery Address</h2>
            <div className="space-y-3">
              {Object.keys(deliveryDetails).map(
                (field) =>
                  field !== "id" && ( // Prevent editing ID
                    <InputField
                      key={field}
                      label={field.replace(/([A-Z])/g, " $1").trim()}
                      name={field}
                      value={deliveryDetails[field]}
                      onChange={(e) => setDeliveryDetails({ ...deliveryDetails, [field]: e.target.value })}
                    />
                  )
              )}
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