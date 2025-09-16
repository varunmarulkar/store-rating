import React from 'react';
import StoreList from './StoreList';
import ChangePasswordForm from './ChangePasswordForm';

const UserDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>
      <StoreList />

      <div className="mt-8">
        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default UserDashboard;