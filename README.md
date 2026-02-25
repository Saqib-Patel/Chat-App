# 💬 ChatFlow — Real-Time Chat Application

<div align="center">

![ChatFlow](https://img.shields.io/badge/ChatFlow-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)
![MERN](https://img.shields.io/badge/MERN_Stack-000000?style=for-the-badge&logo=mongodb&logoColor=47A248)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

**A full-stack real-time chat application built with the MERN stack and Socket.io, featuring a WhatsApp-inspired dark theme design.**

[🚀 Live Demo](#) · [📖 Documentation](#api-endpoints) · [🐛 Report Bug](https://github.com/Saqib-Patel/Chat-App/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---------|------------|
| ⚡ **Real-Time Messaging** | Instant message delivery powered by Socket.io |
| 👥 **Group Chats** | Create groups, add/remove members, admin controls |
| 🟢 **Online Presence** | Live online/offline status indicators |
| 🔍 **User Search** | Find users instantly by name or email |
| ✏️ **Message Status** | Sent, delivered, and seen indicators (✓✓) |
| 🔔 **Notifications** | Real-time notification badges for new messages |
| 💬 **Typing Indicators** | See when someone is typing in real-time |
| 🔒 **JWT Authentication** | Secure login with hashed passwords (bcrypt) |
| 🎯 **Guest Login** | One-click demo access for testing |
| 📱 **Responsive Design** | Works on desktop, tablet, and mobile |
| 🌙 **WhatsApp Dark Theme** | Beautiful dark mode UI inspired by WhatsApp |

---

## 🛠️ Tech Stack

<div align="center">

| Technology | Purpose |
|-----------|---------|
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Database |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | Backend Framework |
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black) | Frontend Library |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | Runtime Environment |
| ![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white) | Real-Time Communication |
| ![Chakra UI](https://img.shields.io/badge/Chakra_UI-319795?style=flat-square&logo=chakraui&logoColor=white) | Component Library |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Authentication |

</div>

---

## 📸 Screenshots

### Landing Page
> WhatsApp-inspired landing page with animated phone mockup

### Chat Interface
> Real-time messaging with green sent bubbles, gray received bubbles, and tick indicators

### Group Chat
> Create and manage group conversations with admin controls

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 14.0.0
- **MongoDB Atlas** account (or local MongoDB)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Saqib-Patel/Chat-App.git
cd Chat-App
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

4. **Set up environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chatflow
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

5. **Run the application**

```bash
# Start backend server
npm start

# In a new terminal, start frontend
cd frontend
npm start
```

6. **Open in browser**
```
http://localhost:3000
```

### Quick Demo
Use the **Guest Credentials** button on the login page for instant access:
- Email: `guest@example.com`
- Password: `123456`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/user` | Register new user | ❌ |
| `POST` | `/api/user/login` | Login user | ❌ |
| `GET` | `/api/user?search=` | Search users | ✅ |

### Chats
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/chat` | Access/create 1-on-1 chat | ✅ |
| `GET` | `/api/chat` | Fetch all user chats | ✅ |
| `POST` | `/api/chat/group` | Create group chat | ✅ |
| `PUT` | `/api/chat/rename` | Rename group chat | ✅ |
| `PUT` | `/api/chat/groupadd` | Add user to group | ✅ |
| `PUT` | `/api/chat/groupremove` | Remove user from group | ✅ |

### Messages
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/message` | Send message | ✅ |
| `GET` | `/api/message/:chatId` | Get chat messages | ✅ |

---

## 🔌 Socket.io Events

### Client → Server
| Event | Payload | Description |
|-------|---------|-------------|
| `setup` | `userData` | Initialize socket connection |
| `join chat` | `roomId` | Join a chat room |
| `new message` | `messageData` | Send a new message |
| `typing` | `roomId` | Notify typing started |
| `stop typing` | `roomId` | Notify typing stopped |

### Server → Client
| Event | Payload | Description |
|-------|---------|-------------|
| `connected` | — | Socket connected successfully |
| `message received` | `messageData` | New message received |
| `typing` | `roomId` | User is typing |
| `stop typing` | `roomId` | User stopped typing |
| `online users` | `[userId]` | Updated online users list |

---

## 📁 Project Structure

```
Chat-App/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   ├── generateToken.js   # JWT token generator
│   │   └── seed.js            # Guest user seeder
│   ├── controllers/
│   │   ├── userControllers.js
│   │   ├── chatControllers.js
│   │   └── messageControllers.js
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   └── errorMiddleware.js  # Global error handler
│   ├── models/
│   │   ├── userModel.js
│   │   ├── chatModel.js
│   │   └── messageModel.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── chatRoutes.js
│   │   └── messageRoutes.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Authentication/
│       │   ├── miscellaneous/
│       │   └── userAvatar/
│       ├── Context/
│       │   └── ChatProvider.js
│       ├── Pages/
│       │   ├── Homepage.js
│       │   └── Chatpage.js
│       ├── config/
│       │   └── ChatLogics.js
│       └── theme.js
├── .env
├── package.json
└── README.md
```

---

## 🌍 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `your_secret_key` |
| `NODE_ENV` | Environment mode | `development` / `production` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

---

## 🏗️ Deployment

### Build for Production
```bash
# From root directory
npm run build
```

This installs all dependencies and builds the React frontend. In production mode, the Express server serves the built frontend files.

### Deploy to Render
1. Push code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set build command: `npm run build`
4. Set start command: `npm start`
5. Add environment variables

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Saqib Patel**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/Saqib-Patel)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/saqib-patel)

---

<div align="center">

**Built with ❤️ and the MERN Stack**

⭐ Star this repo if you found it helpful!

</div>
