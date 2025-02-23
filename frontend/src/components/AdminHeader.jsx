import { useState } from "react";

const handleLogout = () => {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminId");
  sessionStorage.removeItem("username");
  window.location.href = "/auth/admin/login";
};

const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const response = JSON.parse(sessionStorage.getItem("username") || "{}"); 

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Title */}
      <h1 className="text-xl font-bold cursor-pointer">GreenBay</h1>

      {/* Profile Section */}
      <div className="relative flex items-center space-x-2 cursor-pointer">
	  <h1>Welcome </h1><span className="text-white font-semibold mr-7">{response || "Admin"}</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          className="absolute right-4 top-14 w-48 bg-white text-black shadow-md rounded-md"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
            Settings
          </button>
          <button className="block w-full text-left px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;