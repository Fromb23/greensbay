import React, { useState, useEffect } from "react";

const Orders = ({ userId, isAdmin, selectedCustomer }) => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from sessionStorage or backend API (simulated for now)
  useEffect(() => {
    const savedOrders = sessionStorage.getItem("orders");
    if (savedOrders) {
      const allOrders = JSON.parse(savedOrders);
      const filteredOrders = isAdmin
        ? allOrders.filter(order => order.userId === selectedCustomer)
        : allOrders.filter(order => order.userId === userId);
      setOrders(filteredOrders);
    }
  }, [userId, isAdmin, selectedCustomer]);

  // Order Status Steps
  const statusSteps = [
    "Order Placed",
    "Pending Confirmation",
    "Waiting to be Shipped",
    "Shipped",
    "Waiting to be Collected",
    "Delivered",
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">You've no orders yet, <a href="/" className="text-blue-500">go shopping</a>.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="p-4 border rounded-lg bg-white shadow">
              <h3 className="text-lg font-bold">Order #{order.id}</h3>
              <p><strong>Items:</strong> {order.items.join(", ")}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <button
                onClick={() => alert(`Tracking Order: ${order.status}`)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Track My Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;