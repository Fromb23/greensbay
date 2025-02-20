import React, { useState } from "react";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import CartSummary from "../components/CartSummary";
import Header from "../components/Header";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Fashion White Silky Durag", price: 399 },
    { id: 2, name: "Bicycle Chain Lubricant", price: 750 },
  ]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    setWishlistItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-grey-600">
      <Header />
      
      {/* Add margin between Header and content */}
      <div className="max-w-5xl mx-auto p-6 mt-6">
        {/* Main container: Cart + Cart Summary aligned at the top */}
        <div className="flex items-start gap-6">
          {/* Cart on the left */}
          <div className="w-2/3">
            <Cart cartItems={cartItems} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
            {/* Wishlist below Cart */}
            <Wishlist wishlistItems={wishlistItems} addToCart={addToCart} />
          </div>

          {/* Cart Summary on the right */}
          {cartItems.length > 0 && (
            <div className="w-1/3">
              <CartSummary cartItems={cartItems} />
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;