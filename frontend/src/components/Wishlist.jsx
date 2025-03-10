import React, { useEffect, useState } from "react";
import axios from "axios";

const Wishlist = ({ userId }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (!userId) {
      console.warn("userId is missing!");
      return;
    }

    const fetchWishlist = async () => {
      try {
        console.log("Fetching wishlist for user:", userId);
        const response = await axios.get(`http://localhost:5001/api/wishlist/${userId}`);
        console.log("Wishlist fetched:", response.data);
        setWishlistItems(response.data?.wishlist || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  return (
    <div className="p-4 rounded-md shadow-md bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">Wishlist ({wishlistItems.length})</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {wishlistItems.map((item) => {
            const { id, product } = item; // Extract product details
            return (
              <div key={id} className="flex flex-col sm:flex-row items-center gap-4 border p-4 rounded-lg shadow-md bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold text-center sm:text-left flex-1 w-full truncate">{product.name}</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;