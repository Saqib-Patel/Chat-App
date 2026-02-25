const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const colors = require("colors");

// Load env vars FIRST before anything else
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { seedGuestUser } = require("./config/seed");

// Connect to MongoDB and seed guest user
const startServer = async () => {
  await connectDB();
  await seedGuestUser();

  const app = express();

  // Parse JSON bodies
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));

  // Security: Disable X-Powered-By header
  app.disable("x-powered-by");

  // Request logger (dev only)
  if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url}`.gray);
      next();
    });
  }

  // CORS configuration
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

  // API Routes
  app.use("/api/user", userRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api/message", messageRoutes);

  // --------------------------deployment------------------------------
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
  // --------------------------deployment------------------------------

  // Error Handling middlewares
  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 5000;

  const server = app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}...`.yellow.bold);
  });

  // Socket.IO setup
  const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: allowedOrigins,
    },
  });

  // Track online users: Map<userId, Set<socketId>>
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("Connected to socket.io".cyan);

    // User setup — join personal room and mark online
    socket.on("setup", (userData) => {
      if (!userData?._id) return;
      socket.userId = userData._id;
      socket.join(userData._id);

      // Track online status
      if (!onlineUsers.has(userData._id)) {
        onlineUsers.set(userData._id, new Set());
      }
      onlineUsers.get(userData._id).add(socket.id);

      // Broadcast online status to all connected clients
      io.emit("online users", Array.from(onlineUsers.keys()));
      socket.emit("connected");
    });

    // Join a specific chat room
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User joined room: " + room);
    });

    // Typing indicators
    socket.on("typing", (room) => socket.in(room).emit("typing", room));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing", room));

    // New message broadcast
    socket.on("new message", (newMessageReceived) => {
      var chat = newMessageReceived.chat;
      if (!chat.users) return console.log("chat.users not defined");

      chat.users.forEach((user) => {
        if (user._id == newMessageReceived.sender._id) return;
        socket.in(user._id).emit("message received", newMessageReceived);
      });
    });

    // Message status updates
    socket.on("message_seen", ({ messageId, chatId, userId }) => {
      socket.in(chatId).emit("message_status_update", {
        messageId,
        status: "seen",
        seenBy: userId,
      });
    });

    // Handle disconnect — remove from online users
    socket.on("disconnect", () => {
      console.log("USER DISCONNECTED".red);
      if (socket.userId && onlineUsers.has(socket.userId)) {
        onlineUsers.get(socket.userId).delete(socket.id);
        if (onlineUsers.get(socket.userId).size === 0) {
          onlineUsers.delete(socket.userId);
        }
        io.emit("online users", Array.from(onlineUsers.keys()));
      }
    });
  });

  // Graceful shutdown handlers
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
