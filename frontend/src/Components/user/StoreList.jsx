import React, { useState, useEffect } from "react";
import api from "../../api/api.js";
import RatingModal from "./RatingModal.jsx";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const response = await api.fetchAllStores();
      setStores(response.data.stores);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch stores.");
      setLoading(false);
      console.error(err);
    }
  };

  const handleOpenModal = (store) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStore(null);
  };

  const handleRatingSubmitted = () => {
    fetchStores(); // Refresh the list to show the new rating
    handleCloseModal();
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-8 text-gray-500">Loading stores...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Stores</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or address..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStores.length > 0 ? (
          filteredStores.map(store => (
            <div key={store._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{store.name}</h2>
              <p className="text-gray-500 mb-2">{store.address}</p>
              
              <div className="flex items-center mb-4">
                <span className="text-lg font-bold text-yellow-500 mr-1">{store.avgRating}</span>
                <span className="text-sm text-gray-500">/ 5</span>
              </div>

              {store.userRating ? (
                <>
                  <p className="text-sm text-gray-600 mb-2">Your Rating: {store.userRating}</p>
                  <button
                    onClick={() => handleOpenModal(store)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Modify Rating
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleOpenModal(store)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Submit a Rating
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No stores found.</p>
        )}
      </div>

      {selectedStore && (
        <RatingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          store={selectedStore}
          onRatingSubmitted={handleRatingSubmitted}
        />
      )}
    </div>
  );
};

export default StoreList;