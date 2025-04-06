require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const routes = require ("./Route/routes");


// Initialize Express
const app = express();


// Connect to Database
db();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", routes);

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});