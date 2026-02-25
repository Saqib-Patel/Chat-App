import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text, Flex } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search || search.trim().length === 0) {
      toast({
        title: "Please enter a name or email to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);
      setHasSearched(false);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
      setHasSearched(true);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load search results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoadingChat(false);
    }
  };

  const handleDrawerClose = () => {
    setSearch("");
    setSearchResult([]);
    setHasSearched(false);
    onClose();
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#1F2C34"
        w="100%"
        p="8px 16px"
        borderBottom="1px solid #2A3942"
      >
        <Tooltip label="Search users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            borderRadius="8px"
            _hover={{ bg: "rgba(37, 211, 102, 0.1)" }}
          >
            <SearchIcon color="#25D366" />
            <Text
              display={{ base: "none", md: "flex" }}
              px={3}
              color="#8696A0"
              fontSize="sm"
              fontWeight="400"
            >
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Flex alignItems="center" gap={2}>
          <Box
            w="28px"
            h="28px"
            borderRadius="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="#25D366"
            boxShadow="0 2px 10px rgba(37, 211, 102, 0.25)"
          >
            <Text fontSize="sm" color="white">💬</Text>
          </Box>
          <Text
            fontSize="xl"
            fontFamily="Segoe UI, Inter"
            fontWeight="700"
            color="#E9EDEF"
            letterSpacing="-0.01em"
          >
            Chat<Text as="span" color="#25D366">Flow</Text>
          </Text>
        </Flex>

        <Flex alignItems="center">
          <Menu>
            <MenuButton p={1} position="relative">
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="xl" m={1} color="#8696A0" />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No new messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New message in ${notif.chat.chatName}`
                    : `New message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="transparent"
              rightIcon={<ChevronDownIcon color="#8696A0" />}
              _hover={{ bg: "rgba(37, 211, 102, 0.1)" }}
              _active={{ bg: "rgba(37, 211, 102, 0.15)" }}
              borderRadius="8px"
              px={2}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
                border="2px solid rgba(37, 211, 102, 0.3)"
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem
                onClick={logoutHandler}
                color="#F15C6D"
                _hover={{ bg: "rgba(241, 92, 109, 0.1)", color: "#F15C6D" }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      <Drawer placement="left" onClose={handleDrawerClose} isOpen={isOpen}>
        <DrawerOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(4px)" />
        <DrawerContent bg="#111B21" borderRight="1px solid #2A3942">
          <DrawerHeader
            borderBottomWidth="1px"
            borderColor="#2A3942"
            color="#E9EDEF"
            fontWeight="600"
            bg="#1F2C34"
          >
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                bg="#2A3942"
                borderColor="transparent"
                _focus={{ borderColor: "#25D366" }}
                color="#E9EDEF"
                _placeholder={{ color: "#667781" }}
              />
              <Button
                onClick={handleSearch}
                bg="#25D366"
                color="white"
                _hover={{ bg: "#128C7E" }}
                borderRadius="8px"
              >
                Go
              </Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ) : hasSearched && searchResult.length === 0 ? (
              <Box py={8} textAlign="center">
                <Text fontSize="40px" mb={3}>🔍</Text>
                <Text color="#E9EDEF" fontWeight="500" mb={1}>
                  No users found
                </Text>
                <Text color="#667781" fontSize="sm">
                  Try searching with a different name or email
                </Text>
              </Box>
            ) : (
              searchResult?.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => accessChat(u._id)}
                />
              ))
            )}

            {!hasSearched && !loading && searchResult.length === 0 && (
              <Box py={8} textAlign="center">
                <Text fontSize="40px" mb={3}>💬</Text>
                <Text color="#667781" fontSize="sm">
                  Search for users to start a conversation
                </Text>
              </Box>
            )}

            {loadingChat && (
              <Box display="flex" justifyContent="center" py={4}>
                <Spinner color="#25D366" />
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
