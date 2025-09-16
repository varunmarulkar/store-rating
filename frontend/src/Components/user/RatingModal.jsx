import React, { useState } from "react";
import api from "../../api/api";
import { FaStar } from 'react-icons/fa';

const RatingModal = ({ isOpen, onClose, store, onRatingSubmitted }) => {
  const [rating, setRating] = useState(store.userRating || 0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleRating = async () => {
    if (rating === 0) {
      setMessage("Please select a rating.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (store.userRating) {
        await api.modifyExistingRating({ storeId: store._id, rating });
        setMessage("Rating updated successfully!");
      } else {
        await api.submitNewRating({ storeId: store._id, rating });
        setMessage("Rating submitted successfully!");
      }
      setTimeout(() => {
        onRatingSubmitted();
      }, 1000);
    } catch (error) {
      setMessage("Failed to submit rating. Please try again.");
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {store.userRating ? "Modify Your Rating" : "Submit a Rating"}
        </h2>
        <p className="text-gray-600 mb-6 text-center">{store.name}</p>
        
        <div className="flex justify-center space-x-2 mb-4">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={ratingValue}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className="cursor-pointer transition-colors duration-200"
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={40}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
        
        <p className="text-center text-sm text-gray-500 mb-4">
          You rated this {rating} out of 5.
        </p>

        {message && <p className={`text-center mb-4 ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

        <button
          onClick={handleRating}
          disabled={isSubmitting}
          className={`w-full font-bold py-2 px-4 rounded transition-colors ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isSubmitting ? "Submitting..." : store.userRating ? "Update Rating" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default RatingModal;