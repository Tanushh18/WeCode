import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout1/Navbar.jsx";

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_FETCH_FEED, {
          withCredentials: true,
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };

    fetchFeed();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h1 style={{ color: "white" , marginTop: "5rem" }}>Feed</h1>
        {posts.length === 0 ? (
          <p style={{ color: "gray" }}>No posts from followed users yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              style={{
                backgroundColor: "#222",
                color: "white",
                padding: "1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            >
              <p><strong>{post.user.username}</strong></p>
              <p>{post.title}</p>
              <p>{post.description}</p>
              {post.mediaUrl && (
                <img
                  src={post.mediaUrl}
                  alt="post"
                  style={{ width: "100%", maxWidth: "400px", borderRadius: "8px" }}
                />
              )}
            </div>
          ))
        )}

        
      </div>
    </>
  );
};

export default Feed;