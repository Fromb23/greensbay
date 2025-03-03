import { useState } from "react";
import { createAdmin } from "../redux/actions/adminActions";

const CreateAdmin = () => {
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAdmin(admin);
      setMessage(response.message || "Admin created successfully!");
	  navigate("/auth/admin/login");
      setAdmin({ username: "", email: "", password: ""});
    } catch (error) {
      setMessage(error.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Create Admin</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            value={admin.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Create Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;