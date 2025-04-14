import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowDashboard = () => {
  const [followingName, setFollowingName] = useState("");
  const [followedName, setFollowedName] = useState("");
  const [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false); // Track the following status
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [showProfile, setShowProfile] = useState(false); // New state for showing profile

  // Fetch the current user's name and follow counts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_PROFILE, {
          withCredentials: true,
        });
        const user = res.data.user;
        setFollowingName(user.name);
        setFollowerCount(user.followed_count || 0);
        setFollowingCount(user.following_count || 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage("Error fetching user data");
      }
    };

    fetchUserData();

    if (followedName) {
      checkFollowingStatus();
    }
  }, [followedName]);
    

  // Check if the user is already following the followed user
  const checkFollowingStatus = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_CHECK_FOLLOWING,
        {
          following_name: followingName,
          followed_name: followedName,
        },
        {
          withCredentials: true,
        }
      );
      setIsFollowing(response.data.isFollowing); // Set the follow status
    } catch (error) {
      console.error("Error checking following status:", error);
    }
  };

  // Handle following a user
  const handleFollow = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_FOLLOW,
        {
          following_name: followingName,
          followed_name: followedName,
        },
        {
          withCredentials: true,
        }
      );
        setMessage(response.data.message);
        setIsFollowing(true);
      
    } catch (error) {
      setMessage(error.response?.data?.message || "Error following user");
    }
  };

  // Handle unfollowing a user
  const handleUnfollow = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_UNFOLLOW,
        {
          following_name: followingName,
          followed_name: followedName,
        },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      checkFollowingStatus(); // Check if we are no longer following the user
    } catch (error) {
      setMessage(error.response?.data?.message || "Error unfollowing user");
    }
  };
    
  const [showmenu, setshowmenu] = React.useState(false);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <div style={{ marginTop: "0rem" }}>
          <input
            type="text"
            placeholder="Username to follow/unfollow"
            value={followedName}
            onChange={(e) => {
              setFollowedName(e.target.value);
              setShowProfile(false);
            }}
            style={{
              padding: "0.5rem",
              marginRight: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#111",
              color: "#fff",
              width: "400px"
            }}
          />
          <button
            onClick={() => setShowProfile(true)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#0095f6",
              color: "#fff",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </div>
      </div>
      {showProfile  && (
        <div style={{ display: "flex", alignItems: "center", gap: "3rem", marginBottom: "2rem" }}>
          <img
            src={`https://api.dicebear.com/7.x/micah/svg?seed=${followedName}`}
            alt="Profile"
            style={{ borderRadius: "50%", width: "150px", height: "150px", objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <h2 style={{ fontWeight: "normal", fontSize: "1.5rem" }}>{followedName || "username"}</h2>
              <span style={{ color: "#0af", fontSize: "1.2rem" }}>✔️</span>
              <button
                onClick={isFollowing ? handleUnfollow : handleFollow}
                style={{
                  backgroundColor: "#0095f6",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                }}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
              <button style={{ backgroundColor: "#333", color: "#fff", padding: "0.4rem 1rem", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                Message
              </button>
              <button style={{ backgroundColor: "#333", color: "#fff", padding: "0.4rem", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                ⋯
              </button>
            </div>
            <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
              <span><strong>{followerCount}</strong> followers</span>
              <span><strong>{followingCount}</strong> following</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowDashboard;