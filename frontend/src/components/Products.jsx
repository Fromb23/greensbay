import React, { useState, useEffect, useRef } from "react";
import { fetchProducts, deleteProduct } from "../redux/actions/productActions";
import CreateProduct from "./createProduct";
import { FaTrash, FaEdit, FaPlus, FaFilter } from "react-icons/fa";

const Products = () => {
  const [editingRow, setEditingRow] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editedData, setEditedData] = useState({});
  const inputRef = useRef(null); 
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState("All");
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home & Kitchen" },
  ];

  const handleEdit = (productId, field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: field === "category" ? categories.find((c) => c.id == value) : value,
      },
    }));
  };  

  const handleBlur = (productId) =>{
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, ...editedData[productId] } : product
      )
    );
    setEditingCell(null);
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
                    {editingCell === `${product.id}-image` ? (
                      <input
                        type="text"
                        value={editedData[product.id]?.image ?? product.image}
                        onChange={(e) => handleEdit(product.id, "image", e.target.value)}
                        onBlur={() => handleBlur(product.id)}
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
                          onDoubleClick={() => setEditingCell(`${product.id}-image`)}
                        />
                        )
                    }
                  </td>
                  <td className="py-2 px-4 border">
                    {editingCell === `${product.id}-name` ? (
                      <input
                        type="text"
                        value={editedData[product.id]?.name ?? product.name}
                        onChange={(e) => handleEdit(product.id, "name", e.target.value)}
                        onBlur={() => handleBlur(product.id)}
                        className="border rounded px-2 py-1"
                        autoFocus
                        />
                      ) : (
                        <span onDoubleClick={() => setEditingCell(`${product.id}-name` )}>{product.name}</span>
                        )
                      }
                  </td>
                  <td className="py-2 px-4 border">
                    {editingCell === `${product.id}-units_left` ? (
                      <input
                        type="number"
                        value={editedData[product.id]?.units_left ?? product.units_left}
                        onChange={(e) => handleEdit(product.id, "units_left", e.target.value)}
                        onBlur={() => handleBlur(product.id)}
                        className="border rounded px-2 py-1"
                        autoFocus
                        />
                      ) : (
                        <span onDoubleClick={() => setEditingCell(`${product.id}-units_left`)}>{product.units_left}</span>
                        )
                      }
                  </td>
                  <td className="py-2 px-4 border">
                    {editingCell === `${product.id}-discount_price` ? (
                      <input
                        type="number"
                        value={editedData[product.id]?.discount_price ?? product.discount_price}
                        onChange={(e) => handleEdit(product.id, "discount_price", e.target.value)}
                        onBlur={() => handleBlur(product.id)}
                        className="border rounded px-2 py-1"
                        autoFocus
                        />
                      ) : (
                        <span onDoubleClick={() => setEditingCell(`${product.id}-discount_price`)}>{product.discount_price}</span>
                        )
                      }
                  </td>
                  <td className="py-2 px-4 border">
                    {editingCell === `${product.id}-actual_price` ? (
                      <input
                        type="number"
                        value={editedData[product.id]?.actual_price ?? product.actual_price}
                        onChange={(e) => handleEdit(product.id, "actual_price", e.target.value)}
                        onBlur={() => handleBlur(product.id)}
                        className="border rounded px-2 py-1"
                        autoFocus
                        />
                      ) : (
                        <span onDoubleClick={() => setEditingCell(`${product.id}-actual_price`)}>{product.actual_price}</span>
                        )
                      }
                  </td>
                  <td className="py-2 px-4 border">
                    {editingCell === `${product.id}-category` ? (
                      <select
                        value={editedData[product.id]?.category ?? product.category?.id}
                        onChange={(e) => handleEdit(product.id, "category", e.target.value)}
                        onBlur={() => handleBlur(product.id)}
                        className="border rounded px-2 py-1"
                        autoFocus
                      >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                      ))}
                      </select>
                      ) : (
                        <span onDoubleClick={() => setEditingCell(`${product.id}-category`)}>
                          {product.category?.name}
                        </span>
                    )}
                  </td>

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