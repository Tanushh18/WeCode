import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// const navigate = useNavigate();
// 🔧 Exported function you can use in Dashboard.jsx
export const createroom = async (navigate) => {
  try {
    const response = await axios.get( // or POST if your backend expects it
      process.env.REACT_APP_ROOM_CREATE,
      {
        withCredentials: true, // Send cookies or JWT
      }
    );
    
    const roomId = response.data.roomId;
    console.log("Room Created:", roomId);

    // Navigate to room
    navigate(`/room/${roomId}`);
  } catch (error) {
    console.error("Room creation failed:", error);
  }
};

export const joinroom = async (roomId, navigate) => {
    try {
        const response = await axios.post(
            process.env.REACT_APP_ROOM_JOIN,
            { roomId },
            {
              withCredentials: true,
            }
          );
        console.log("Joined room:", roomId);
        navigate(`/room/${roomId}`);
    }
    catch (error) {
        console.error("Room join failed:", error);
    }
}

// 👇 Optional UI component, useful if you navigate here first
const Room = () => {
  return <div>Creating Room...</div>;
};

export default Room;