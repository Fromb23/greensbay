import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBox, FaEnvelope, FaStar, FaTicketAlt, FaHeart, FaEye, FaCog, FaCreditCard, FaEdit } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

// 🔹 Helper function to get userInfo from localStorage
const getUserInfo = () => {
  const storedUserInfo = localStorage.getItem("userInfo");
  return storedUserInfo ? JSON.parse(storedUserInfo) : null;
};

const UserSettings = () => {
  const userInfo = getUserInfo();
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo || !userInfo.id) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/auth/login");
      return;
    }

    // Fetch address if user exists
    const fetchAddress = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/address/getCustomer/${userInfo.id}`);
        setAddress(response.data);
      } catch (err) {
        setError("Failed to fetch address");
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [userInfo, navigate, location]);

  if (loading) return <p>Loading address...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen p-4">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">My Greenbay Account</h2>
          <nav className="space-y-4">
            <Link to="/orders" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
              <FaBox /> <span>Orders</span>
            </Link>
            <Link to="/inbox" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
              <FaEnvelope /> <span>Inbox</span>
            </Link>
            <Link to="/pending-reviews" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
              <FaStar /> <span>Pending Reviews</span>
            </Link>
            <Link to="/vouchers" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
              <FaTicketAlt /> <span>Vouchers</span>
            </Link>
            <Link to="/wishlist" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
              <FaHeart /> <span>Wishlist</span>
            </Link>
            <Link to="/recently-viewed" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
              <FaEye /> <span>Recently Viewed</span>
            </Link>
            <Link to="/account-management" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
              <FaCog /> <span>Account Management</span>
            </Link>
            <Link to="/payment-settings" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
              <FaCreditCard /> <span>Payment Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Account Overview */}
        <main className="flex-1 bg-white p-6 rounded-lg shadow-md md:ml-6">
          <h2 className="text-2xl font-semibold mb-4">Account Overview</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Account Details */}
            <div className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Account Details</h3>
              <p className="text-gray-700 pt-3">{userInfo?.firstname} {userInfo?.lastname}</p>
              <p className="text-gray-500 pt-3">{userInfo?.email}</p>
            </div>

            {/* Address Book */}
            <div className="border p-4 rounded-lg shadow relative">
              <h3 className="text-lg font-semibold mb-2">Address Book</h3>
              <p className="text-gray-700">Your default shipping address:</p>
              <p className="text-gray-500">{userInfo?.firstname} {userInfo?.lastname}</p>
              <p className="text-gray-500">{address?.address || "No address found"}</p>
              <p className="text-gray-500">Call on arrival</p>
              <p className="text-gray-500">{address?.city || "No address found"}</p>
              <p className="text-gray-500">{address?.phone || "No Phone found"}</p>
              <Link to="/edit-address" className="absolute top-2 right-2 text-orange-500 hover:underline flex items-center">
                <FaEdit className="mr-1" /> Edit Address
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettings;