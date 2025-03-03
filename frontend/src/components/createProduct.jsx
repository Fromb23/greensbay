import React, { useState } from "react";
import { createProduct } from "../redux/actions/productActions";
import { FaTimes } from "react-icons/fa"; // Import close icon

const CreateProduct = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    units_left: "",
    stock: "",
    discount_price: "",
    actual_price: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(formData);
      alert("Product created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      {/* Transparent container so the dashboard is still visible */}
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">Create Product</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Image URL</label>
            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Units Left</label>
              <input
                type="number"
                name="units_left"
                placeholder="Units left"
                onChange={handleChange}
                required
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="Stock available"
                onChange={handleChange}
                required
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">Discount Price</label>
              <input
                type="number"
                name="discount_price"
                placeholder="Enter discount price"
                onChange={handleChange}
                required
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Actual Price</label>
              <input
                type="number"
                name="actual_price"
                placeholder="Enter actual price"
                onChange={handleChange}
                required
                className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter category"
              onChange={handleChange}
              required
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Create Product
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;