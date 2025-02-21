import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import CartSummary from "../components/CartSummary";
import Header from "../components/Header";

const CartPage = () => {
  // Load cart items from session storage on first render
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Function to update session storage whenever cart items change
  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prev, { ...product, quantity: 1 }];
      }

      return updatedCart;
    });
  };

  // Function to update item quantity in the cart
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, quantity: Math.max(1, newQuantity) } : product
      )
    );
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart and Wishlist Section (Full width on mobile, 2/3 on larger screens) */}
          <div className="w-full lg:w-2/3">
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
            <Wishlist wishlistItems={[]} addToCart={addToCart} />
          </div>

          {/* Cart Summary Section (Hidden on mobile if cart is empty, full width on mobile, 1/3 on larger screens) */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-1/3">
              <CartSummary cartItems={cartItems} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;