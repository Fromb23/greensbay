import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from './redux/store/store';
import Homepage from './pages/HomePage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Login from './pages/UserLogin';
import UserSignUp from './pages/userSignUp';
import Checkout from './pages/Checkout';
import FinalPayment from './pages/FinalPayment';
import SignupForm from './components/TempHeader';
import PageTitleUpdater from './components/PageTitleUpdater';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CreateAdmin from './pages/CreateAdmin';
import ProtectedRoute from './components/ProtectedRoutes';
import Orders from './pages/Orders';
import Chat from './components/Chat';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <PageTitleUpdater />
        <Routes>
          <Route path="*" element={<h1>404 Not Found</h1>} />
          <Route path="/auth/admin/register" element={<CreateAdmin />} />
          <Route path="/auth/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/test" element={<SignupForm />} />
          <Route path="/auth/login/" element={<Login />} />
          <Route path="/auth/signup/" element={<UserSignUp />} />
          <Route path="/cart/" element={<CartPage />} />
          <Route path="/orders/" element={<Orders />} />
          <Route path="/chat" element={<Chat />} />
          
          <Route element={<ProtectedRoute role="ADMIN" />}>
            <Route path="/auth/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute role="CUSTOMER" />}>
            <Route path="/checkout/summary" element={<Checkout />} />
            <Route path="/checkout/payment" element={<FinalPayment />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;