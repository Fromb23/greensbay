import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInAdmin } from "../redux/actions/adminActions";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signInAdmin(signIn);
      setMessage(response.message || "Admin logged in successfully!");
      localStorage.setItem("adminToken", JSON.stringify(response.token));
      localStorage.setItem("adminId", JSON.stringify(response.adminId));
      sessionStorage.setItem("username", JSON.stringify(response.username));
      navigate("/auth/admin/dashboard");
      setSignIn({ email: "", password: "" });
    } catch (error) {
      setMessage(error.error || "Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row p-6">
        {/* Left Column */}
        <div className="md:w-1/2 w-full text-black flex justify-center items-center md:py-10 py-4 bg-grey-100 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <h1 className="text-2xl font-bold text-center">Welcome to Greenbay</h1>
        </div>

        {/* Right Column (Login Form) */}
        <div className="md:w-1/2 w-full p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Admin Login</h2>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                placeholder="admin@gmail.com"
                value={signIn.email}
                onChange={handleChange}
                name="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                value={signIn.password}
                onChange={handleChange}
                name="password"
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div className="text-right">
              <Link to="/auth/admin/forgot-password" className="text-green-500 text-sm cursor-pointer hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              className="w-full bg-green-500 cursor-pointer text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 active:scale-95"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;