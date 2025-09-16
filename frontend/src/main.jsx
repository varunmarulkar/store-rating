// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';
import './index.css';

import Login from './Pages/Login.jsx';
import Signup from './Pages/Signup.jsx';
import AdminDashboard from './Pages/AdminDashboard.jsx';
import StoreOwnerDashboard from './Components/store-owner/StoreOwnerDashboard.jsx';
import StoresPage from './Pages/StoresPage.jsx';
import PrivateRoute from './Components/Common/PrivateRoute.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'signin',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      // Protected routes
      {
        element: <PrivateRoute allowedRoles={['user']} />,
        children: [
          {
            path: '/',
            element: <StoresPage />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={['admin']} />,
        children: [
          {
            path: 'admin/dashboard',
            element: <AdminDashboard />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={['store_owner']} />,
        children: [
          {
            path: 'store-owner/dashboard',
            element: <StoreOwnerDashboard />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);