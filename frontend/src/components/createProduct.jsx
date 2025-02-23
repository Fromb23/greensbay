import React, { useState } from "react";
import { createProduct } from "../redux/actions/productActions";

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
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Create Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required className="w-full border p-2" />
          <input type="text" name="image" placeholder="Image URL" onChange={handleChange} required className="w-full border p-2" />
          <input type="number" name="units_left" placeholder="Units Left" onChange={handleChange} required className="w-full border p-2" />
          <input type="number" name="stock" placeholder="Stock" onChange={handleChange} required className="w-full border p-2" />
          <input type="number" name="discount_price" placeholder="Discount Price" onChange={handleChange} required className="w-full border p-2" />
          <input type="number" name="actual_price" placeholder="Actual Price" onChange={handleChange} required className="w-full border p-2" />
          <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="w-full border p-2" />
          <div className="flex justify-between">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded"
			onClick={handleSubmit}
			>
				Create
			</button>
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;