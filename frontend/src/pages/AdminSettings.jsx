import { useState } from "react";
import { CameraIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    username: "admin",
    storeName: "My Ecommerce",
    currency: "USD",
    taxRate: "10",
    emailNotifications: true,
    profileLogo: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleToggle = () => {
    setSettings({ ...settings, emailNotifications: !settings.emailNotifications });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings({ ...settings, profileLogo: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Password validation
    if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("New passwords do not match!");
      return;
    }

    setPasswordError("");
    alert("Settings updated successfully!"); 
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Admin Settings</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={settings.username}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        {/* Profile Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Logo</label>
          <div className="flex items-center gap-2 mt-2">
            <input type="file" onChange={handleFileUpload} className="hidden" id="profile-upload" />
            <label htmlFor="profile-upload" className="p-2 bg-gray-200 rounded-md cursor-pointer">
              <CameraIcon className="h-6 w-6 text-gray-600" />
            </label>
            {settings.profileLogo && (
              <img src={settings.profileLogo} alt="Profile Logo" className="w-20 h-20 rounded-full" />
            )}
          </div>
        </div>

        {/* Currency Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            name="currency"
            value={settings.currency}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="KES">KES (KSh)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        {/* Tax Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
          <input
            type="number"
            name="taxRate"
            value={settings.taxRate}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Email Notifications</span>
          <button
            type="button"
            onClick={handleToggle}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              settings.emailNotifications ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`h-4 w-4 bg-white rounded-full shadow-md transform ${
                settings.emailNotifications ? "translate-x-6" : "translate-x-0"
              } transition`}
            />
          </button>
        </div>

        {/* Password Update Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Update Password</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full mt-1 p-2 border rounded-md"
              required
            />
          </div>

          {/* Show password error if passwords don't match */}
          {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
        >
          <CheckIcon className="w-5 h-5 text-white" />
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;