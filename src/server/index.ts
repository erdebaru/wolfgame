import { Server } from "socket.io";

const io = new Server(3000, {
    path: '/',
    cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("message received:", msg);
    io.emit("message", msg); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("user disconnected:", socket.id);
  });
});

console.log("Socket.IO server running at http://localhost:3000/");