import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CustomerInfo = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customer data from backend
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users/fetch-users");
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const handleEdit = (id) => {
    console.log("Editing customer with ID:", id);
    
  };

  const handleDelete = (id) => {
    console.log("Deleting customer with ID:", id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customer Information</h1>

      {customers.length === 0 ? (
        <p className="text-center text-gray-500">No registered customers.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className=" text-left bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="text-left">
                <td className="border p-2">
                  {customer.firstname} {customer.lastname}
                </td>
                <td className="border p-2">{customer.phone}</td>
                <td className="border p-2">{customer.email}</td>
                <td className="border p-2">
				<div className="flex justify-center gap-4">
                  <FaEdit
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleEdit(customer.id)}
                  />
                  <FaTrash
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(customer.id)}
                  />
				</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerInfo;