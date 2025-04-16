const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyToken = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
        return res.status(401).json({ message: "Access token not found." });
    }

    let decodedAccessToken;
    try {
        decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        // Access token invalid or expired
        if (!refreshToken) {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }

        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await User.findById(decodedRefreshToken.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: "User not found." });
            }

            const newAccessToken = user.getAccessToken();
            res.cookie("accessToken", newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None",
            });

            req.user = user;
            return next();
        } catch (refreshErr) {
            return res.status(401).json({ message: "Invalid or expired refresh token." });
        }
    }

    const user = await User.findById(decodedAccessToken.id).select('-password');
    if (!user) {
        return res.status(401).json({ message: "User not found." });
    }

    req.user = user;
    next();
};

module.exports = { verifyToken };
