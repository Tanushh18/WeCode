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
    socket.on("join-public-room", (publicroomId) => {
      socket.join(publicroomId);
      
      console.log(`🟢 Socket ${socket.id} joined public room: ${publicroomId}`);
    });
    
    socket.on("send-message", ({ roomId, ...data }) => {
      if (!roomId) {
        console.warn("⚠️ No public room ID provided");
        return;
      }
    
      console.log(`📝 Sending message to room: ${roomId}`);
      socket.to(roomId).emit("receive-message", data);
      // Optional: If you want to send it back to the sender as well
      // socket.emit("receive-message", data);
    });

    

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

module.exports = setupSocket;