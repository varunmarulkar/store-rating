import React, { useState } from "react";
import api from "../../api/api";

const UpdatePasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 

    if (!newPassword) {
      setMessage("Please enter a new password.");
      return;
    }

    try {
      const response = await api.updateStoreOwnerPassword({ newPassword });
      setMessage(response.data.message);
      setNewPassword(""); 
    } catch (err) {
      setMessage("Failed to update password: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">New Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
        >
          Change Password
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default UpdatePasswordForm;