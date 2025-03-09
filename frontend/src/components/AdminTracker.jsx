import { useState, useEffect } from "react";

const AdminOrderTracker = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/orders/fetch-all/");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
		console.log("Fetched orders:", data);
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/api/orders/update-status/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update order");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      alert(`Order ${orderId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Admin Order Tracker</h2>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.item}</td>
                <td className="p-2 border">
                  <select
                    value={order.status}
                    onChange={(e) => handleUpdate(order.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="ORDER PLACED">ORDER PLACED</option>
                    <option value="PENDING CONFIRMATION">PENDING CONFIRMATION</option>
                    <option value="WAITING TO BE SHIPPED">WAITING TO BE SHIPPED</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
                    <option value="DELIVERED">DELIVERED</option>
                  </select>
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={() => handleUpdate(order.id, order.status)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrderTracker;