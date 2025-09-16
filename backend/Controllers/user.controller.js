import UserModel from "../Models/User.model.js";
import StoreModel from "../Models/Store.model.js";
import RatingModel from "../Models/Rating.model.js";
import bcrypt from "bcrypt";

export async function updatePassword(req, res) {
    try {
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.findByIdAndUpdate(req.user._id, { password: hashedPassword });
        res.status(200).json({ message: "Password updated" });
    } catch (error) { res.status(500).json({ message: error.message }); }
}


export async function getAllStores(req, res) {
    try {
        const stores = await StoreModel.find();
        const storesWithRatings = [];
        for (let store of stores) {
            const ratings = await RatingModel.find({ storeId: store._id });
            const avgRating = ratings.length ? (ratings.reduce((sum, r) => sum + r.rating,0)/ratings.length).toFixed(2) : 0;
            const userRatingDoc = await RatingModel.findOne({ storeId: store._id, userId: req.user._id });
            const userRating = userRatingDoc ? userRatingDoc.rating : null;
            storesWithRatings.push({ ...store.toObject(), avgRating, userRating });
        }
        res.status(200).json({ stores: storesWithRatings });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

export async function submitRating(req, res) {
    try {
        const { storeId, rating } = req.body;
        const existing = await RatingModel.findOne({ storeId, userId: req.user._id });
        if (existing) return res.status(400).json({ message: "Rating exists" });

        const newRating = await RatingModel.create({ storeId, userId: req.user._id, rating });
        res.status(201).json({ message: "Rating submitted", rating: newRating });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

export async function modifyRating(req, res) {
    try {
        const { storeId, rating } = req.body;
        const updated = await RatingModel.findOneAndUpdate({ storeId, userId: req.user._id }, { rating }, { new: true });
        if (!updated) return res.status(404).json({ message: "Rating not found" });
        res.status(200).json({ message: "Rating updated", rating: updated });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

export async function getMe(req, res) {
    try {
        const user = req.user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "An error occurred." });
    }
}