

import React, { useState } from "react";
import api from "../../api/api";

const ChangePasswordForm = ({ updatePasswordFunction }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            // Use the function passed as a prop
            const response = await updatePasswordFunction({ newPassword });
            setMessage(response.data.message);
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setMessage("Failed to update password: " + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">New Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded-lg"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        className="w-full p-2 border rounded-lg"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                    Update Password
                </button>
            </form>
            {message && <p className="mt-4 text-sm text-center text-gray-600">{message}</p>}
        </div>
    );
};

export default ChangePasswordForm;