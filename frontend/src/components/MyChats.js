import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, Flex } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, Avatar } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const h = hours % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
  };

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      w={{ base: "100%", md: "35%" }}
      bg="#111B21"
      borderRight="1px solid #2A3942"
      h="100%"
    >
      {/* Sidebar Header */}
      <Box
        px={4}
        py={3}
        bg="#1F2C34"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #2A3942"
      >
        <Text
          fontSize="lg"
          fontWeight="600"
          color="#E9EDEF"
        >
          Chats
        </Text>
        <GroupChatModal>
          <Button
            display="flex"
            fontSize="sm"
            rightIcon={<AddIcon fontSize="10px" />}
            variant="ghost"
            color="#25D366"
            _hover={{
              bg: "rgba(37, 211, 102, 0.1)",
            }}
            borderRadius="8px"
            size="sm"
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>

      {/* Chat List */}
      <Box
        display="flex"
        flexDir="column"
        w="100%"
        h="100%"
        overflowY="auto"
      >
        {chats ? (
          <Stack spacing={0}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat === chat
                    ? "#2A3942"
                    : "transparent"
                }
                px={3}
                py={3}
                key={chat._id}
                borderBottom="1px solid rgba(42, 57, 66, 0.5)"
                transition="background 0.15s ease"
                _hover={{
                  bg:
                    selectedChat === chat
                      ? "#2A3942"
                      : "#202C33",
                }}
                display="flex"
                alignItems="center"
                gap={3}
              >
                {/* Avatar */}
                <Box position="relative">
                  <Avatar
                    size="md"
                    name={!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                    bg="#25D366"
                    color="white"
                    fontSize="md"
                  />
                </Box>

                {/* Chat Info */}
                <Box flex={1} overflow="hidden">
                  <Flex justifyContent="space-between" alignItems="center" mb="2px">
                    <Text
                      fontWeight="500"
                      fontSize="md"
                      color="#E9EDEF"
                      noOfLines={1}
                    >
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                    {chat.latestMessage && (
                      <Text fontSize="xs" color="#667781" flexShrink={0} ml={2}>
                        {formatTime(chat.latestMessage.createdAt || chat.updatedAt)}
                      </Text>
                    )}
                  </Flex>
                  {chat.latestMessage && (
                    <Text fontSize="sm" color="#8696A0" noOfLines={1}>
                      {chat.isGroupChat && (
                        <Text as="span" color="#25D366" fontWeight="500">
                          {chat.latestMessage.sender.name}:{" "}
                        </Text>
                      )}
                      {chat.latestMessage.content.length > 40
                        ? chat.latestMessage.content.substring(0, 41) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
