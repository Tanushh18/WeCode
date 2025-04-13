import React, { useState, useEffect, useRef  } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // your server URL



function ChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
const liveAudioRef = useRef(null);

  useEffect(() => {
    // Incoming text messages
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, `${data.sender}: ${data.text}`]);
    });

    // Incoming audio
    socket.on("receive-audio", (audioBuffer) => {
      const audioBlob = new Blob([audioBuffer], { type: 'audio/webm' });
      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);
      audio.play();
    });

    return () => {
      socket.off("receive-message");
      socket.off("receive-audio");
      
    };
  }, []);

  // Send text message
  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      socket.emit("send-message", { text: trimmedMessage, sender: "You" });
      setMessages((prev) => [...prev, `You: ${trimmedMessage}`]);
      setMessage("");
    }
  };

  // Toggle mic recording and live test
  const toggleMic = async () => {
    if (!isMicOn) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("✅ Mic stream tracks:", stream.getAudioTracks());
        const track = stream.getAudioTracks()[0];
        console.log("Mic enabled:", track.enabled, "State:", track.readyState);

        // Optional live playback:
        const liveAudio = new Audio();
        liveAudio.srcObject = stream;
        liveAudio.play();
        liveAudioRef.current = liveAudio;  // Store audio reference
        streamRef.current = stream;        // Store stream reference
        console.log("🔊 Live mic audio playing through speakers...");

        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          console.log("🎙️ Audio chunk size:", event.data.size);
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          socket.emit("send-audio", audioBlob);
          console.log("📤 Sent recorded audio blob.");
        };

        mediaRecorder.start();
        console.log("🎙️ Mic recording started...");
        setIsMicOn(true);

      } catch (err) {
        console.error("❌ Could not access microphone:", err);
      }

    } else {
      // Stop the MediaRecorder
      mediaRecorderRef.current.stop();

      // Stop the media stream tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        console.log("🎙️ Mic stream stopped.");
      }

      // Stop live playback
      if (liveAudioRef.current) {
        liveAudioRef.current.pause();
        liveAudioRef.current.srcObject = null;
        console.log("🔇 Live mic audio playback stopped.");
      }

      setIsMicOn(false);
      console.log("🎙️ Mic recording stopped.");
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
        <button
          onClick={toggleMic}
          style={{
            ...styles.micButton,
            backgroundColor: isMicOn ? "#ff4c4c" : "#4CAF50"
          }}
        >
          🎙️
        </button>
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
  }
};

export default ChatRoom;