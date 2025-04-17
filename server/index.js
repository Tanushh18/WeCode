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
const allowedOrigins = [
  "http://localhost:3000",
  "https://wecode-2.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/", routes);

setupSocket(server);

// Start Server
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
