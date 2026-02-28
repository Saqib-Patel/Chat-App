import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text, Flex } from "@chakra-ui/layout";
import "./styles.css";
import { IconButton, Spinner, useToast, Avatar } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";

const ENDPOINT = process.env.REACT_APP_API_URL || "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const handleSendClick = async () => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <Box display="flex" flexDir="column" w="100%" h="100%">
          <Flex
            alignItems="center"
            bg="#1F2C34"
            px={4}
            py={2}
            borderBottom="1px solid #2A3942"
            borderLeft="1px solid #2A3942"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
              variant="ghost"
              color="#25D366"
              _hover={{ bg: "rgba(37, 211, 102, 0.1)" }}
              borderRadius="8px"
              mr={2}
            />

            <Avatar
              size="sm"
              name={
                !selectedChat.isGroupChat
                  ? getSender(user, selectedChat.users)
                  : selectedChat.chatName
              }
              src={
                !selectedChat.isGroupChat
                  ? getSenderFull(user, selectedChat.users)?.pic
                  : undefined
              }
              bg="#25D366"
              color="white"
            />

            <Box flex={1} ml={3}>
              <Text fontSize="md" fontWeight="500" color="#E9EDEF">
                {!selectedChat.isGroupChat
                  ? getSender(user, selectedChat.users)
                  : selectedChat.chatName.toUpperCase()}
              </Text>
              <Text fontSize="xs" color="#8696A0">
                {istyping ? (
                  <Text as="span" color="#25D366">typing...</Text>
                ) : (
                  selectedChat.isGroupChat
                    ? `${selectedChat.users.length} members`
                    : "tap here for contact info"
                )}
              </Text>
            </Box>

            <Flex gap={1}>
              {!selectedChat.isGroupChat ? (
                <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                />
              ) : (
                <UpdateGroupChatModal
                  fetchMessages={fetchMessages}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              )}
            </Flex>
          </Flex>

          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            flex={1}
            w="100%"
            overflowY="hidden"
            className="whatsapp-doodle-bg"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
                color="#25D366"
                thickness="3px"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            {istyping && (
              <Box px={4} pb={1}>
                <div className="typing-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </Box>
            )}
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={2}
            px={3}
            py={2}
            bg="#1F2C34"
            borderTop="1px solid #2A3942"
            borderLeft="1px solid #2A3942"
          >
            <IconButton
              icon={<Text fontSize="xl">😊</Text>}
              variant="ghost"
              borderRadius="50%"
              size="sm"
              color="#8696A0"
              _hover={{ bg: "rgba(255,255,255,0.05)" }}
              aria-label="Emoji"
            />

            <IconButton
              icon={<Text fontSize="lg">📎</Text>}
              variant="ghost"
              borderRadius="50%"
              size="sm"
              color="#8696A0"
              _hover={{ bg: "rgba(255,255,255,0.05)" }}
              aria-label="Attach"
            />

            <FormControl
              onKeyDown={sendMessage}
              id="message-input"
              isRequired
              flex={1}
            >
              <Input
                variant="filled"
                bg="#2A3942"
                placeholder="Type a message"
                value={newMessage}
                onChange={typingHandler}
                borderRadius="8px"
                border="none"
                _hover={{ bg: "#323F49" }}
                _focus={{
                  bg: "#2A3942",
                  borderColor: "transparent",
                  boxShadow: "none",
                }}
                color="#E9EDEF"
                _placeholder={{ color: "#667781" }}
                h="42px"
              />
            </FormControl>

            {newMessage ? (
              <IconButton
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                }
                onClick={handleSendClick}
                bg="#25D366"
                borderRadius="50%"
                size="md"
                _hover={{ bg: "#128C7E" }}
                _active={{ bg: "#075E54" }}
                aria-label="Send"
              />
            ) : (
              <IconButton
                icon={<Text fontSize="xl">🎤</Text>}
                variant="ghost"
                borderRadius="50%"
                size="md"
                color="#8696A0"
                _hover={{ bg: "rgba(255,255,255,0.05)" }}
                aria-label="Voice"
              />
            )}
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          h="100%"
          gap={4}
          bg="#222E35"
          borderLeft="1px solid #2A3942"
          w="100%"
        >
          <Box
            w="200px"
            h="200px"
            borderRadius="50%"
            bg="rgba(37, 211, 102, 0.06)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation="float 4s ease-in-out infinite"
          >
            <Text fontSize="80px" opacity={0.7}>💬</Text>
          </Box>
          <Text
            fontSize="2xl"
            fontWeight="300"
            color="#E9EDEF"
            mt={4}
          >
            ChatFlow Web
          </Text>
          <Text fontSize="sm" color="#8696A0" textAlign="center" maxW="400px" lineHeight="1.6">
            Send and receive messages in real-time.
            <br />
            Select a chat from the sidebar to start messaging.
          </Text>
          <Box
            mt={4}
            px={6}
            py={2}
            borderRadius="full"
            bg="rgba(37, 211, 102, 0.08)"
            border="1px solid rgba(37, 211, 102, 0.15)"
          >
            <Text fontSize="xs" color="#25D366">
              🔒 End-to-end encrypted messaging
            </Text>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
