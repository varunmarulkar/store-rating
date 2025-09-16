// AdminDashboard.jsx

import React, { useState, useEffect } from "react";
import api from "../api/api";
import UserTable from "../Components/admin/UserTable";
import StoreTable from "../Components/admin/StoreTable";
import CreateOwnerForm from "../Components/admin/CreateOwnerForm";
import AssignStoreForm from "../Components/admin/AssignStoreForm";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const statsResponse = await api.getAdminDashboardStats();
      const usersResponse = await api.fetchUsers();
      const storesResponse = await api.fetchStores();

      setStats(statsResponse.data);
      setUsers(usersResponse.data.users);
      setStores(storesResponse.data.stores);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch dashboard data.");
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-8 text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Section (unchanged) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Stores</h2>
          <p className="text-4xl font-bold text-green-600">{stats.totalStores}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Ratings</h2>
          <p className="text-4xl font-bold text-yellow-600">{stats.totalRatings}</p>
        </div>
      </div>

      {/* Forms Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <CreateOwnerForm onUserCreated={fetchData} />
        <AssignStoreForm users={users} onStoreAssigned={fetchData} />
      </div>

      {/* User and Store Tables (unchanged) */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Users List</h2>
        <UserTable users={users} />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Stores List</h2>
        <StoreTable stores={stores} />
      </div>
    </div>
  );
};

export default AdminDashboard;