import React, { useState } from "react";
import api from "../../api/api";

const CreateUserForm = ({ onUserCreated }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // State for the selected role
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name || !email || !password || !role) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const userData = {
        name,
        email,
        password,
        role,
      };
      const response = await api.addUserByAdmin(userData);
      setMessage(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setRole("user"); // Reset role to default
      if (onUserCreated) {
        onUserCreated();
      }
    } catch (err) {
      setMessage("Failed to create user: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="User's Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User's Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Temporary Password"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Role</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="store_owner">Store Owner</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
        >
          Create User
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default CreateUserForm;