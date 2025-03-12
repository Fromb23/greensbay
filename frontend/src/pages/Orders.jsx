import { current } from "@reduxjs/toolkit";
import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const OrderTracker = ({ orderStatus }) => {
  const statusTimeline = [
    { status: 'PENDING', date: 'Saturday, 01-03' },
    { status: 'PENDING CONFIRMATION', date: 'Saturday, 01-03' },
    { status: 'WAITING TO BE SHIPPED', date: 'Saturday, 01-03' },
    { status: 'SHIPPED', date: 'Monday, 03-03' },
    { status: 'OUT FOR DELIVERY', date: '' },
    { status: 'CONFIRMED', date: '' },
  ];

  const [timeline, setTimeline] = useState(statusTimeline);

  useEffect(() => {
    const currentIndex = statusTimeline.findIndex((item) => item.status === orderStatus);
    const updatedTimeline = statusTimeline.map((item, index) => ({
      ...item,
      isCompleted: index < currentIndex,
      isCurrent: index === currentIndex,
    }));
    setTimeline(updatedTimeline);
  }, [orderStatus]);

  return (
    <div className="p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Package History</h2>
      <div className="relative border-l-4 border-gray-300 pl-6">
        {timeline.map((item, index) => (
          <div key={index} className="relative mb-6 flex items-start">
            {/* Connector line */}
            {index !== timeline.length - 1 && (
              <div
                className={`absolute left-4 top-8 w-1 h-full ${
                  item.isCompleted || item.isCurrent ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
            
            {/* Status Icon */}
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full z-10 border-2 ${
                item.isCurrent ? 'bg-blue-600 border-blue-600' :
                item.isCompleted ? 'bg-green-500 border-green-500' : 'bg-gray-300 border-gray-300'
              }`}
            >
              {item.isCompleted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : item.isCurrent ? (
                <div className="w-4 h-4 bg-white rounded-full"></div>
              ) : null}
            </div>
            
            {/* Status Text */}
            <div className="ml-4">
              <p className={`font-semibold ${item.isCurrent ? 'text-blue-600' : 'text-gray-900'}`}>{item.status}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-gray-600">It won't be long now! Your item/order has been shipped, and we'll notify you as soon as it's ready for delivery.</p>
    </div>
  );
};


const Orders = ({ isAdmin, selectedCustomer }) => {
  const [trackingOrderId, setTrackingOrderId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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

        // ✅ Ensure `orders` is always an array
        setOrders(Array.isArray(data.orders) ? data.orders : (data.order ? [data.order] : []));

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
    if (!userInfo || !userInfo.id) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/auth/login");
      return;
    }
}, [userInfo, navigate, location]);

  return (
    <div><Header /> 
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">
          You've no orders yet, <a href="/" className="text-blue-500">go shopping</a>.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={`order-${order.id || index}`} className="p-4 border rounded-lg bg-white shadow">
              <h3 className="text-lg font-bold">Order #{order.id}</h3>
              <p><strong>Items:</strong> {order.items || "No items listed"}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Progress:</strong> {getOrderProgress(order.status)}</p>
              {order.status !== "DELIVERED" && order.status !== "CANCELLED" && (
                <button
                  onClick={() => {
                    setTrackingOrderId(trackingOrderId === order.id ? null : order.id);
                  }}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Track My Order
                </button>
              )}
              {trackingOrderId === order.id && <OrderTracker orderStatus={order.status} />}
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer />
    </div>
  );
};

export default Orders;