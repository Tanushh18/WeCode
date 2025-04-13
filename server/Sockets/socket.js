const { Server } = require("socket.io");

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`🟢 Socket ${socket.id} joined room: ${roomId}`);
    });

    socket.on("code-change", ({ roomId, code }) => {
      socket.to(roomId).emit("code-change", code);
    });

    socket.on("send-message", (data) => {
      socket.broadcast.emit("receive-message", data);
    });

    socket.on("send-audio", (audioBlob) => {
      socket.broadcast.emit("receive-audio", audioBlob);
    });

    socket.on("video-offer", (offer) => {
      socket.broadcast.emit("video-offer", offer);
    });

    socket.on("video-answer", (answer) => {
      socket.broadcast.emit("video-answer", answer);
    });

    socket.on("ice-candidate", (candidate) => {
      socket.broadcast.emit("ice-candidate", candidate);
    });

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

module.exports = setupSocket;