const express = require("express");
const router = express.Router(); // Use 'router', not 'routes'
const { registerUser, loginUser, logoutUser } = require("../controllers/Route.controller");
const { verifyToken } = require("../middleware/auth");

// Define Routes
router.get("/", (req, res) => {
    res.send("Hello World this is backend");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyToken, logoutUser);

module.exports = router; // Export router