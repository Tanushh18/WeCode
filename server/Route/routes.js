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
const {
  updateuserprofile,
  fetchuserprofile,
} = require("../controllers/profile.controller");

const { CreateRoom , joinRoom } = require("../controllers/Room.controller");

const { verifyToken } = require("../middleware/auth");

// Define Routes
router.get("/", (req, res) => {
  res.send("Hello World this is backend");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/questions_update", verifyToken, updateQuestion);
router.get("/fetch_dashboard", verifyToken, fetchquestion);
router.get("/userprofile", verifyToken, fetchuserprofile);
router.post("/user_update_profile", verifyToken, updateuserprofile);
router.get("/create_room", verifyToken, CreateRoom);
router.post("/join_room", verifyToken, joinRoom);


router.post("/logout", verifyToken, logoutUser);

module.exports = router; // Export router
