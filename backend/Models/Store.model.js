import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, maxlength: 400 },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const StoreModel = mongoose.model("Store", storeSchema);
export default StoreModel;
