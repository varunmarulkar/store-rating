import axios from "axios";

// Create and configure the Axios instance
const api = axios.create({
  baseURL: "http://localhost:7000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to handle unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access. Please log in.");
    }
    return Promise.reject(error);
  }
);

// Define all API functions and attach them directly to the 'api' object
api.signupUser = (userData) => api.post("/signup", userData);
api.signinUser = (credentials) => api.post("/signin", credentials);
api.logoutUser = () => api.post("/logout");
api.checkAuth = () => api.get("/auth/check");

api.getAdminDashboardStats = () => api.get("/admin/dashboard");
api.fetchUsers = (filters) => api.get("/admin/users", { params: filters });
api.fetchStores = (filters) => api.get("/admin/stores", { params: filters });
api.addUserByAdmin = (userData) => api.post("/admin/users", userData);
api.addStoreByAdmin = (storeData) => api.post("/admin/stores", storeData);

api.fetchAllStores = () => api.get("/user/stores");
api.submitNewRating = (ratingData) => api.post("/user/ratings", ratingData);
api.modifyExistingRating = (ratingData) => api.put("/user/ratings", ratingData);
api.updateUserPassword = (passwordData) => api.put("/user/update-password", passwordData);

api.getStoreOwnerDashboard = () => api.get("/store-owner/dashboard");
api.updateStoreOwnerPassword = (passwordData) => api.put("/store-owner/update-password", passwordData);

export default api;