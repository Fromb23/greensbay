import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Login from './pages/UserLogin';
import Checkout from './pages/Checkout';
import SignupForm from './components/TempHeader';
import PageTitleUpdater from './components/PageTitleUpdater';

function App() {
  const [cartItems, setCartItems] = useState([]);

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
  
      // Store updated cart in session storage
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <Router>
      <ToastContainer />
      <PageTitleUpdater />
      <Routes>
      <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={<Homepage  addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/test" element={<SignupForm />} />
        <Route path="/auth/login/" element={<Login />} /> 
        <Route path="/cart/" element={<CartPage cartItems={cartItems} addToCart={addToCart}/>} />
        <Route path="/checkout/summary" element={<Checkout />} />

      </Routes>
    </Router>
  );
}

export default App;