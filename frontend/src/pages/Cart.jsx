import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import CartSummary from "../components/CartSummary";
import Header from "../components/Header";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userId = userInfo.id;

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 sm:p-6 mt-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart and Wishlist Section */}
          <div className="w-full lg:w-2/3">
            <Cart
              cartItems={cartItems}
              updateQuantity={(id, quantity) => dispatch(updateQuantity({ id, quantity }))}
              removeFromCart={(id) => dispatch(removeFromCart(id))}
            />
            <Wishlist userId={userId} />
          </div>

          {/* Cart Summary Section */}
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