const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const colors = require("colors");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { seedGuestUser } = require("./config/seed");

const startServer = async () => {
  await connectDB();
  await seedGuestUser();

  const app = express();

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.disable("x-powered-by");

  if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`.gray);
      next();
    });
  }

  const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
          return callback(null, true);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );

  app.use("/api/user", userRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/message", messageRoutes);

  const __dirname1 = path.resolve();

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running..");
    });
  }

  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}...`.yellow.bold);
  });

  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: allowedOrigins,
    },
  });

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("Connected to socket.io".cyan);

    socket.on("setup", (userData) => {
      if (!userData?._id) return;
      socket.userId = userData._id;
      socket.join(userData._id);

      if (!onlineUsers.has(userData._id)) {
        onlineUsers.set(userData._id, new Set());
      }
      onlineUsers.get(userData._id).add(socket.id);

      io.emit("online users", Array.from(onlineUsers.keys()));
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
    });

    socket.on("typing", (room) => socket.in(room).emit("typing", room));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing", room));

    socket.on("new message", (newMessageReceived) => {
      var chat = newMessageReceived.chat;
      if (!chat.users) return;

      chat.users.forEach((user) => {
        if (user._id == newMessageReceived.sender._id) return;
        socket.in(user._id).emit("message received", newMessageReceived);
      });
    });

    socket.on("message_seen", ({ messageId, chatId, userId }) => {
      socket.in(chatId).emit("message_status_update", {
        messageId,
        status: "seen",
        seenBy: userId,
      });
    });

    socket.on("disconnect", () => {
      if (socket.userId && onlineUsers.has(socket.userId)) {
        onlineUsers.get(socket.userId).delete(socket.id);
        if (onlineUsers.get(socket.userId).size === 0) {
          onlineUsers.delete(socket.userId);
        }
        io.emit("online users", Array.from(onlineUsers.keys()));
      }
    });
  });

  process.on("unhandledRejection", (err) => {
    console.log(`Unhandled Rejection: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
  });

  process.on("uncaughtException", (err) => {
    console.log(`Uncaught Exception: ${err.message}`.red.bold);
    server.close(() => process.exit(1));
  });
};

startServer();
