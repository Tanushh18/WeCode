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

    socket.on("code-change", ({ privateRoomId, code }) => {
      socket.to(privateRoomId).emit("code-change", code);
    });
    // we have to join the room also for etting the messages
    socket.on("join-public-room", (publicroomID) => {
      socket.join(publicroomID);
      // console.log(`🟢 Socket ${socket.id} joined public room: ${publicroomID}`);
    });
    
    
    socket.on("send-message", ({ publicroomID, ...data }) => {
      if (!publicroomID) {
        console.warn("⚠️ No public room ID provided");
        return;
      }
    
      // console.log(`📝 Sending message to room: ${publicroomID}`);
      socket.to(publicroomID).emit("receive-message", data);
      // Optional: If you want to send it back to the sender as well
      // socket.emit("receive-message", data);
    });

    

    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

module.exports = setupSocket;