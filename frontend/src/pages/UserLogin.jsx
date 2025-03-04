import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  }); 
  const { user, error } = useSelector((state) => state.user);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    console.log("Triggered login request", loginData);
    dispatch(login(loginData));
  };

  useEffect(() => {
    if (user) {
      const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath);
    } else if (error) {
      setErrorMessage(error);
    }
  }, [user, error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Login Container */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-green-600 mb-4">
          Welcome to GreenBay
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-gray-600 text-center mb-6">
          Type your e-mail or phone number to log in or create an account.
        </p>

        {/* Login Form */}
        <form className="space-y-4"
          onSubmit={handleSubmit}
        >
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <input
            type="email"
            placeholder="Email or Phone Number"
            value={loginData.email}
            onChange={handleChange}
            name="email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            name="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition"
          >
            Log In
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a href="#" className="text-green-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;