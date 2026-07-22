import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

// ✅ AUTHENTICATION MIDDLEWARE
export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // ❌ Wrong before: 400
        // ✅ Correct: 401 (Unauthorized)
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing or invalid",
            });
        }

        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token has expired",
                });
            }

            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // ✅ IMPORTANT: attach user to request
        req.user = user;
        req.id = user._id;

        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error in authentication",
        });
    }
};

// ✅ ADMIN MIDDLEWARE (FIXED)
export const isAdmin = (req, res, next) => {
    try {
        // ❌ Old: if(req.user || req.user.role === 'admin')
        // This was WRONG (always true if req.user exists)

        if (req.user && req.user.role === "admin") {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Access denied: admins only",
        });
    } catch (error) {
        console.error("Admin Middleware Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error in admin check",
        });
    }
};