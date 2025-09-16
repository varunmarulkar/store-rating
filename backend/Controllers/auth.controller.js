import UserModel from "../Models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Signup
export async function signup(req, res) {
    const { name, email, password, address, role } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const userRole = role || "user";
        const existing = await UserModel.findOne({ email });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            address,
            role: userRole,
        });


        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Signin
export async function signin(req, res) {
    const { email, password } = req.body;

    try {
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax"
        })

        res.status(200).json({ message: "Logged in successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Logout
export async function logout(req, res) {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
