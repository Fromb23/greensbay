import React, { useState, useEffect, useRef } from "react";
import { fetchProducts, deleteProduct } from "../redux/actions/productActions";
import CreateProduct from "./createProduct";
import { FaTrash, FaEdit, FaPlus, FaFilter } from "react-icons/fa";

const Products = () => {
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const inputRef = useRef(null); 
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const handleRowSelect = (id) => {
    setEditingRow(id);
    setEditedData(products.find((product) => product.id === id));
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setEditingRow(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      loadProducts();
    }
  };

  const handleSelect = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product) => product.id));
    }
  };

  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">Products</h2>

        <div className="flex items-center gap-2">
          {/* Filter Dropdown */}
          <select
            className="border px-3 py-2 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {[...new Set(products.map((product) => product.category?.name || "N/A"))].map(
              (categoryName, index) => (
                <option key={index} value={categoryName}>
                  {categoryName}
                </option>
              )
            )}
          </select>
          <FaFilter className="text-gray-500 text-lg" />
        </div>

        {/* Create Product Button */}
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Create Product
        </button>
      </div>

      {/* Product Table */}
      {products.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">No products available</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4 flex items-center gap-2"
          >
            <FaPlus /> Create Product
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === products.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Product Name</th>
                <th className="py-2 px-4 border">Units Left</th>
                <th className="py-2 px-4 border">Discount Price</th>
                <th className="py-2 px-4 border">Actual Price</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelect(product.id)}
                    />
                  </td>
                  <td className="py-2 px-4 border">{product.id}</td>
                  <td className="py-2 px-4 border">
                    {editingRow === product.id ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editedData?.image || ""}
                        onChange={(e) =>
                          setEditedData({ ...editedData, image: e.target.value })
                          }
                        className="border rounded px-2 py-1"
                        autoFocus
                      />
                      ) : (
                        <img
                          src={
                            product.image
                            ? product.image.replace("imgur.com", "i.imgur.com") + ".jpg"
                            : "noimage.jpg"
                          }
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded"
                          onDoubleClick={() => handleRowSelect(product.id)}
                        />
                        )
                    }
                  </td>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.units_left}</td>
                  <td className="py-2 px-4 border">${product.discount_price}</td>
                  <td className="py-2 px-4 border">${product.actual_price}</td>
                  <td className="py-2 px-4 border">{product.category?.name}</td>
                  <td className="py-6 px-4 flex items-center border-b border-r justify-center gap-2">
                    <button className="text-blue-500 hover:underline flex items-center gap-1">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-500 hover:underline flex items-center gap-1"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCreateForm && <CreateProduct onClose={() => setShowCreateForm(false)} />}
    </div>
  );
};

export default Products;