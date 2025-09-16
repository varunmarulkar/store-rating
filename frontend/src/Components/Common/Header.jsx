import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import api from "../../api/api";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.logoutUser();
      logout();
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Store Ratings
        </Link>
        <ul className="flex space-x-6">
          {user ? (
            <>
              <li>
                <Link
                  to={user.role === "admin" ? "/admin/dashboard" : user.role === "store_owner" ? "/store-owner/dashboard" : "/"}
                  className="hover:text-gray-300 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin" className="hover:text-gray-300 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-300 transition-colors">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;