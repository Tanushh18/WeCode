const express = require("express");
const router = express.Router(); // Use 'router', not 'routes'
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/Route.controller");
const {
  updateQuestion,
  fetchquestion,
} = require("../controllers/Question.controller"); // Import updateQuestion
const { verifyToken } = require("../middleware/auth");

// Define Routes
router.get("/", (req, res) => {
  res.send("Hello World this is backend");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/questions_update", verifyToken, updateQuestion);
router.get("/fetch_dashboard", verifyToken, fetchquestion);

router.post("/logout", verifyToken, logoutUser);

module.exports = router; // Export router
