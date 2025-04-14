import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "white" }}>Feed</h1>
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

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          backgroundColor: "#8a2be2",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Feed;