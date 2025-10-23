import { Server } from "socket.io";
import "dotenv/config";
const PORT = process.env.SOCKET_PORT || 4000;

const io = new Server({
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // console.log("socket: ", socket);
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    // console.log("onlineUser: ", onlineUser);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver?.socketId).emit("getMessage", data);
  });

  // ...........
  // socket.on("test", (data) => {
  //   console.log("data:", data);
  // });
  // ..................

  // socket.on("start", () => {
  //   socket.connect();
  // });

  // socket.on("end", () => {
  //   socket.disconnect();
  // });

  const count = io.engine.clientsCount;
  console.log("====================================");
  console.log(`Number of connected clients: ${count}`);
  console.log("====================================");

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(PORT);
