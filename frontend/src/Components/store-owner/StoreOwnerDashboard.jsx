import React, { useState, useEffect } from "react";
import api from "../../api/api";
import { FaStar } from 'react-icons/fa';
import UpdatePasswordForm from './UpdatePasswordForm'; // Add this import

const StoreOwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.getStoreOwnerDashboard();
        setDashboardData(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("No store found for this owner. Please contact support.");
        } else {
          setError("Failed to fetch dashboard data. Please try again.");
        }
        setLoading(false);
        console.error(err);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-center mt-8 text-gray-500">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!dashboardData || !dashboardData.store) {
    return <div className="text-center mt-8 text-gray-500">No store data found for this owner.</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {dashboardData.store.name} Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Store Overview
        </h2>
        <p className="text-xl text-gray-600 mb-2">
          <span className="font-medium">Store Email:</span> {dashboardData.store.email}
        </p>
        <p className="text-xl text-gray-600 mb-4">
          <span className="font-medium">Store Address:</span> {dashboardData.store.address}
        </p>
        <div className="flex items-center text-xl text-gray-600">
          <span className="font-medium mr-2">Average Rating:</span>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-yellow-500 mr-1">
              {dashboardData.averageRating}
            </span>
            <FaStar className="text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          User Ratings
        </h2>
        {dashboardData.userRatings.length > 0 ? (
          <div className="space-y-4">
            {dashboardData.userRatings.map((rating) => (
              <div
                key={rating._id}
                className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{rating.userId.name}</h3>
                  <p className="text-sm text-gray-500">{rating.userId.email}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xl font-bold text-gray-700 mr-2">{rating.rating}</span>
                  <FaStar className="text-yellow-500" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No ratings have been submitted for your store yet.</p>
        )}
      </div>

      {/* Add the change password form here */}
      <UpdatePasswordForm />
    </div>
  );
};

export default StoreOwnerDashboard;