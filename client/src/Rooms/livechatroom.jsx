import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = io("http://localhost:2000"); // your server URL

function ChatRoom() {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // console.log(roomId);
  


 
  useEffect(() => {
    // Ensure the socket connection is only established once when the component mounts
    socket.emit("join-public-room", roomId); // Join the room after the component mounts
    console.log("Message ");
    
    // Listen for incoming messages from the server
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, `${data.sender}: ${data.text}`]); // Update the message list
    });

    // Clean up when the component unmounts (remove event listener)
    return () => {
      socket.off("receive-message");
    };
  }, [roomId]);
     
  

  // Send text message
  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      socket.emit("send-message", {roomId, text: trimmedMessage, sender: "You" });
      setMessages((prev) => [...prev, `You: ${trimmedMessage}`]);
      setMessage("");
    }
  };

 

  return (
    <div style={styles.container}>
      <header style={styles.header}>🎨 Your Chat Room Header</header>

      

      <div style={styles.chatArea}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>{msg}</div>
        ))}
      </div>

      <footer style={styles.footer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.sendButton}>Send</button>
     
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    fontFamily: "Arial, sans-serif"
  },
  header: {
    padding: "15px",
    backgroundColor: "#333",
    color: "#fff",
    textAlign: "center",
    fontSize: "1.3rem"
  },
  chatArea: {
    flex: "1",
    padding: "10px",
    overflowY: "auto",
    background: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  message: {
    background: "#d1f7c4",
    padding: "8px",
    borderRadius: "6px",
    maxWidth: "70%"
  },
  footer: {
    padding: "10px",
    display: "flex",
    gap: "8px",
    backgroundColor: "#eee"
  },
  input: {
    flex: "1",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  sendButton: {
    padding: "10px 16px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  micButton: {
    padding: "10px 14px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },
  videoContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "10px"
  },
  video: {
    width: "300px",
    borderRadius: "8px",
    backgroundColor: "#000"
  },
  videoButton: {
    padding: "10px 14px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default ChatRoom;