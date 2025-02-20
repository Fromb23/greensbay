import React from "react";

const Wishlist = ({ wishlistItems, addToCart }) => {
  return (
    <div className="p-4 rounded-md shadow-md bg-white mt-6">
      <h2 className="text-xl font-bold mb-4">Wishlist ({wishlistItems.length})</h2>
      {wishlistItems.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        wishlistItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center p-3 border-b">
            <p className="font-semibold">{item.name}</p>
            <button
              className="bg-orange-500 text-white px-4 py-1 rounded"
              onClick={() => addToCart(item)}
            >
              Add to cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Wishlist;