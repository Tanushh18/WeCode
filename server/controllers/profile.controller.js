const User = require("../models/user.model");

const fetchuserprofile = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email }).populate("posts.post");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json(
            {
                user
            }
        )

    }
    catch (error) {
        return res.status(500).json({ message: "An error occurred.", error });
    }
}

const updateuserprofile = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // List of allowed fields to update
      const { name, phone, bio, goals, github, linkedin } = req.body;
  
      // Update fields
      user.name = name || user.name;
      user.phone = phone || user.phone;
      user.bio = bio || user.bio;
      user.goals = goals || user.goals;
      user.github = github || user.github;
      user.linkedin = linkedin || user.linkedin;
  
      await user.save();
  
      // Exclude password in response
      const { password, ...userWithoutPassword } = user.toObject();
  
      return res.status(200).json({
        message: "User updated successfully.",
        user: userWithoutPassword
      });
  
    } catch (error) {
      console.error("Error updating profile:", error);
      return res.status(500).json({ message: "An error occurred.", error });
    }
  };

module.exports = {
    fetchuserprofile , updateuserprofile
}