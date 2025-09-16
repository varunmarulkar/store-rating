import React, { useState } from "react";
import api from "../../api/api";

const AssignStoreForm = ({ users, onStoreAssigned }) => {
  const [selectedOwnerId, setSelectedOwnerId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeEmail, setStoreEmail] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!selectedOwnerId || !storeName || !storeEmail || !storeAddress) {
      setMessage("Please fill in all the required fields.");
      return;
    }

    try {
      const storeData = {
        ownerId: selectedOwnerId,
        name: storeName,
        email: storeEmail,
        address: storeAddress
      };
      const response = await api.addStoreByAdmin(storeData);
      setMessage(response.data.message);
      setSelectedOwnerId("");
      setStoreName("");
      setStoreEmail("");
      setStoreAddress("");
      if (onStoreAssigned) {
        onStoreAssigned();
      }
    } catch (err) {
      setMessage("Failed to assign store: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Assign Store to Existing User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Select User</label>
          <select 
            className="w-full p-2 border rounded-lg" 
            value={selectedOwnerId} 
            onChange={(e) => setSelectedOwnerId(e.target.value)}
          >
            <option value="">-- Select a user --</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Store Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-lg" 
            value={storeName} 
            onChange={(e) => setStoreName(e.target.value)} 
            placeholder="Enter store name" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Store Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded-lg" 
            value={storeEmail} 
            onChange={(e) => setStoreEmail(e.target.value)} 
            placeholder="Enter store email" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Store Address</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-lg" 
            value={storeAddress} 
            onChange={(e) => setStoreAddress(e.target.value)} 
            placeholder="Enter store address" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Assign Store
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
    </div>
  );
};

export default AssignStoreForm;