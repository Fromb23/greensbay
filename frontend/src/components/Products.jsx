import React, { useState, useEffect } from "react";
import { fetchProducts, deleteProduct } from "../redux/actions/productActions";
import CreateProduct from "./createProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      loadProducts(); // Refresh after deletion
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {products.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">No product available</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Create Product
          </button>
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Product Name</th>
              <th className="py-2 px-4 border">Units Left</th>
              <th className="py-2 px-4 border">Discount Price</th>
              <th className="py-2 px-4 border">Actual Price</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border">{product.id}</td>
                <td className="py-2 px-4 border">{product.name}</td>
                <td className="py-2 px-4 border">{product.units_left}</td>
                <td className="py-2 px-4 border">{product.discount_price}</td>
                <td className="py-2 px-4 border">{product.actual_price}</td>
                <td className="py-2 px-4 border">{product.category}</td>
                <td className="py-2 px-4 border flex gap-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showCreateForm && <CreateProduct onClose={() => setShowCreateForm(false)} />}
    </div>
  );
};

export default Products;