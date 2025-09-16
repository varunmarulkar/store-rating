import jwt from "jsonwebtoken";
import UserModel from "../Models/User.model.js";

export async function isAuth(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.id);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}
