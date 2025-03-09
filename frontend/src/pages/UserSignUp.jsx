import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/actions/userActions";

const UserSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", signupForm);
    dispatch(createUser(signupForm));
  };

  const handleChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = Object.values(signupForm).every((val) => val.trim() !== "");

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg flex">
        {/* Left side - Image */}
        <div className="w-1/2 hidden lg:block">
          <img
            src="../public/python.jpg" 
            alt="Signup Illustration"
            className="h-full w-full object-cover rounded-l-lg"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800">GreenBay</h1>

          <h2 className="text-2xl font-semibold mt-4">Create an account</h2>

          {/* Account Type Selector */}
          <div className="flex mt-4 border rounded-lg overflow-hidden">
            <button className="flex-1 bg-gray-900 text-white py-2">Personal</button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-2">Business</button>
          </div>

          {/* Form Fields */}
          <div className="mt-6 space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                className="w-1/2 p-3 border rounded-md"
                value={signupForm.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                className="w-1/2 p-3 border rounded-md"
                value={signupForm.lastName}
                onChange={handleChange}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md"
              value={signupForm.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              className="w-full p-3 border rounded-md"
              value={signupForm.phone}
              onChange={handleChange}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-md pr-10"
                value={signupForm.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "👁" : "🙈"}
              </button>
            </div>
          </div>

          {/* Terms Agreement */}
          <p className="text-xs text-gray-600 mt-3">
            By selecting Create personal account, you agree to our{" "}
            <a href="#" className="text-blue-600">User Agreement</a> and acknowledge our{" "}
            <a href="#" className="text-blue-600">Privacy Notice</a>.
          </p>

          {/* Signup Button */}
          <button
            className={`w-full mt-4 py-3 rounded-md font-semibold transition ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
            onClick={handleSubmit}

          >
            Create personal account
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t"></div>
            <span className="px-3 text-gray-500">or continue with</span>
            <div className="flex-1 border-t"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex flex-col  justify-between space-x-3 space-y-4">
            <button className="px-6 py-2 border rounded-md">Google</button>
            <button className="px-6 py-2 border rounded-md">Facebook</button>
            <button className="px-6 py-2 border rounded-md">Apple</button>
          </div>

          {/* Sign-in Link */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <a onClick={() => navigate("/auth/login/")} className=" cursor-pointer text-blue-600">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;