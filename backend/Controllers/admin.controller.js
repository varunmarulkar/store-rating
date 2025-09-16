import UserModel from "../Models/User.model.js";
import StoreModel from "../Models/Store.model.js";
import RatingModel from "../Models/Rating.model.js";
import bcrypt from "bcrypt";

// Add User (by admin)
export async function addUser(req, res) {
    try {
        const { name, email, password, address, role } = req.body;
        if(!name || !email || !password) return res.status(400).json({ message: "Name, email, password required" });

        const existing = await UserModel.findOne({ email: email.toLowerCase() });
        if(existing) return res.status(400).json({ message: "User exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ 
            name, 
            email: email.toLowerCase(), 
            password: hashedPassword, 
            address, 
            role: role || "user" 
        });

        await newUser.save();
        res.status(201).json({ message: "User added", user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Add Store
export async function addStore(req, res) {
    try {
        const { name, email, address, ownerId } = req.body;
        if(!name || !email || !address || !ownerId) return res.status(400).json({ message: "All fields required" });

        const owner = await UserModel.findById(ownerId);
        if(!owner) return res.status(404).json({ message: "Owner not found" });

        if(owner.role !== "store_owner") {
            owner.role = "store_owner";
            await owner.save();
        }

        const store = await StoreModel.create({ name, email: email.toLowerCase(), address, ownerId });
        res.status(201).json({ message: "Store created", store });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Admin Dashboard
export async function adminDashboard(req, res) {
    try {
        const totalUsers = await UserModel.countDocuments();
        const totalStores = await StoreModel.countDocuments();
        const totalRatings = await RatingModel.countDocuments();
        res.status(200).json({ totalUsers, totalStores, totalRatings });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

// Get Users with Filter
export async function getUsers(req, res) {
    try {
        const { name, email, address, role } = req.query;
        const query = {};

        if(name) query.name = { $regex: name, $options: "i" };
        if(email) query.email = { $regex: email, $options: "i" };
        if(address) query.address = { $regex: address, $options: "i" };
        if(role) query.role = role;

        const users = await UserModel.find(query).select("-password");
        res.status(200).json({ users });
    } catch (error) { res.status(500).json({ message: error.message }); }
}

// Get Stores with Filter
export async function getStores(req, res) {
    try {
        const { name, email, address } = req.query;
        const query = {};

        if(name) query.name = { $regex: name, $options: "i" };
        if(email) query.email = { $regex: email, $options: "i" };
        if(address) query.address = { $regex: address, $options: "i" };

        const stores = await StoreModel.find(query);
        res.status(200).json({ stores });
    } catch (error) { res.status(500).json({ message: error.message }); }
}
