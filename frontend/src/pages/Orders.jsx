import { current } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";

const packageSteps = [
	{ status: "ORDER PLACED", date: "Saturday, 01-03", completed: false, current: true },
	{ status: "PENDING CONFIRMATION", date: "Saturday, 01-03", completed: true },
	{ status: "WAITING TO BE SHIPPED", date: "Saturday, 01-03", completed: true },
	{ status: "SHIPPED", date: "Monday, 03-03", completed: false, current: false },
	{ status: "OUT FOR DELIVERY", date: "Tuesday, 04-03", completed: false, current: false },
  ];
  
  const PackageHistory = () => {
	return (
	  <div className="p-6 bg-white rounded-lg shadow-md">
		<h2 className="text-lg font-semibold mb-4">Package History</h2>
		<div className="relative border-l-4 border-blue-500 pl-6 space-y-4">
		  {packageSteps.map((step, index) => (
			<div key={index} className="relative">
			  {/* Icon */}
			  <div
				className={`absolute -left-7 top-2 w-4 h-4 rounded-full border-2 ${
				  step.current
					? "bg-blue-500 border-blue-500"
					: step.completed
					? "bg-white border-blue-500"
					: "bg-gray-300 border-gray-300"
				}`}
			  />
			  {/* Status */}
			  <div className="flex flex-col">
				<span
				  className={`px-3 py-1 text-xs font-bold uppercase rounded-lg w-fit ${
					step.current
					  ? "bg-blue-700 text-white"
					  : "bg-blue-500 text-white"
				  }`}
				>
				  {step.status}
				</span>
				<span className="text-sm text-gray-600">{step.date}</span>
			  </div>
			</div>
		  ))}
		</div>
		{/* Shipped Message */}
		<div className="mt-4 p-3 bg-gray-100 rounded-lg text-gray-700 text-sm">
		  It won’t be long now! Your item/order has been shipped, and we’ll notify
		  you as soon as it’s ready for delivery.
		</div>
	  </div>
	);
  };

const Orders = ({ isAdmin, selectedCustomer }) => {
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState(null);

  const userInfo = localStorage.getItem("userInfo");
  let userId = null;

  try {
    const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
    userId = parsedUserInfo?.id || null;
  } catch (error) {
    console.error("Error parsing userInfo:", error);
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          isAdmin
            ? `/api/orders/orders?userId=${selectedCustomer}`
            : `http://localhost:5001/api/orders/order/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log("🟢 Orders Data:", data);
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
        setOrders([]);
      }
    };

    if (userId || (isAdmin && selectedCustomer)) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [userId, isAdmin, selectedCustomer]);

  // Function to display order progress
  const getOrderProgress = (status) => {
    const statusMap = {
      PENDING: "Pending ➝ Shipped ➝ Delivered",
      SHIPPED: "Shipped ➝ Delivered",
      DELIVERED: "Delivered ✅",
      CANCELLED: "Cancelled ❌",
    };
    return statusMap[status] || "Unknown Status";
  };

  useEffect(() => {
	const fetchOrders = async () => {
	  try {
		const response = await fetch(
		  isAdmin
			? `/api/orders/orders?userId=${selectedCustomer}`
			: `http://localhost:5001/api/orders/order/${userId}`
		);
  
		if (!response.ok) {
		  throw new Error("Failed to fetch orders");
		}
  
		const data = await response.json();
		console.log("🟢 Orders Data:", data);
  
		// Ensure `orders` is an array, even for a single order
		setOrders(Array.isArray(data.orders) ? data.orders : [data]);
  
	  } catch (err) {
		setError(err.message);
		setOrders([]);
	  }
	};
  
	if (userId || (isAdmin && selectedCustomer)) {
	  fetchOrders();
	} else {
	  setOrders([]);
	}
  }, [userId, isAdmin, selectedCustomer]);
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

	  <div><PackageHistory /></div>

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : orders === null ? (
        <p className="text-gray-600">Fetching orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">
          You've no orders yet, <a href="/" className="text-blue-500">go shopping</a>.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={`order-${order.id || index}`} className="p-4 border rounded-lg bg-white shadow">
              <h3 className="text-lg font-bold">Order #{order.id}</h3>
              <p><strong>Items:</strong> {order.items?.join(", ") || "No items listed"}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Progress:</strong> {getOrderProgress(order.status)}</p>
              {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                <button
                  onClick={() => alert(`Tracking Order: ${order.status}`)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Track My Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;