import React from "react";

const Login = () => {
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
        <form className="space-y-4">
          {/* Email / Phone Input */}
          <input
            type="text"
            placeholder="Email or Phone Number"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
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