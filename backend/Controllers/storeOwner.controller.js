import StoreModel from "../Models/Store.model.js";
import RatingModel from "../Models/Rating.model.js";
import UserModel from "../Models/User.model.js";
import bcrypt from "bcrypt"

export async function updatePassword(req, res) {
    try {
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.findByIdAndUpdate(req.user._id, { password: hashedPassword });
        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function storeDashboard(req, res) {
    try {
        const ownerId = req.user._id;

        // Find the store associated with the owner
        const store = await StoreModel.findOne({ ownerId: ownerId });
        
        if (!store) {
            return res.status(404).json({ message: "Store not found for this owner." });
        }

        const ratings = await RatingModel.find({ storeId: store._id }).populate("userId", "name email");
        const avgRating = ratings.length ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2) : 0;

        // Send the complete store object, not just the name
        res.status(200).json({
            store: {
                name: store.name,
                email: store.email,
                address: store.address
            },
            averageRating: avgRating,
            userRatings: ratings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}