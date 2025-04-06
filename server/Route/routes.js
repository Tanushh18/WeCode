const express = require("express");
const router = express.Router(); // Use 'router', not 'routes'
const User = require("../models/user.model")    
const bcrypt = require("bcrypt");




// Define Routes
router.get("/", (req, res) => {
    res.send("Hello World this is backend");
});
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    
    // to check if user aready present or not
    try {
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration failed." });
    }
    
});

// Login credentials Checkign backend
router.post("/login", async (req, res) => {
    // console.log("Login request body:", req.body); // 👈 log this

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found"); // 👈
            return res.status(401).json({ message: "User not found." });
        }

        console.log("Plain password:", password);
        console.log("Hashed password:", user.password);
        const ispasswordvalid = user.ispasswordcorrect(password)
        if (!ispasswordvalid) {
            console.log("Invalid password"); // 👈
            return res.status(401).json({ message: "Invalid password." });
        }

        console.log("Login successful"); // 👈
        res.status(200).json({ message: "Login successful." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed." });
    }
});
    


module.exports = router; // Export router