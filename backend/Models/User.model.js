import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    address: { type: String, maxlength: 400 },
    role: { type: String, enum: ['admin', 'store_owner', 'user'], required: true }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
