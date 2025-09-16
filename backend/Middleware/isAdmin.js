
import jwt from "jsonwebtoken";
import UserModel from "../Models/User.model.js";

export async function isAdmin(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied: Admins only" });
        }

        req.user = user; 
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}
