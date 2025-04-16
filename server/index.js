require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const routes = require("./Route/routes");
const cookieparser = require("cookie-parser");
const setupSocket = require("./Sockets/socket");
const http = require("http");

// Initialize Express
const app = express();
const server = http.createServer(app);

app.use(cookieparser());

// Connect to Database
db();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/", routes);

// app.get("/", (req, res) => {
//   res.redirect("https://11f6-2409-4081-9db2-1db5-a85b-bf52-8335-34e7.ngrok-free.app");
// });

setupSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
