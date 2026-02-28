import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.find((u) => u._id === userToAdd._id)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query || query.trim().length === 0) {
      setSearchResult([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      setLoading(false);
      setSearchResult(data);
      setSearched(true);
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

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !groupChatName.trim()) {
      toast({
        title: "Please enter a group name",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (selectedUsers.length < 2) {
      toast({
        title: "Please select at least 2 members",
        description: "A group chat requires at least 3 people (including you)",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      setGroupChatName("");
      setSelectedUsers([]);
      setSearch("");
      setSearchResult([]);
      setSearched(false);
      toast({
        title: "Group chat created!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to create group!",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleClose = () => {
    setGroupChatName("");
    setSelectedUsers([]);
    setSearch("");
    setSearchResult([]);
    setSearched(false);
    onClose();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={handleClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(8px)" />
        <ModalContent bg="#1F2C34" border="1px solid #2A3942" borderRadius="12px">
          <ModalHeader
            fontSize="24px"
            fontWeight="600"
            display="flex"
            justifyContent="center"
            color="#E9EDEF"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton color="#667781" _hover={{ color: "#E9EDEF" }} />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Group name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
                bg="#2A3942"
                borderColor="transparent"
                _focus={{ borderColor: "#25D366" }}
                color="#E9EDEF"
                _placeholder={{ color: "#667781" }}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Search users to add (e.g. John)"
                mb={1}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                bg="#2A3942"
                borderColor="transparent"
                _focus={{ borderColor: "#25D366" }}
                color="#E9EDEF"
                _placeholder={{ color: "#667781" }}
              />
            </FormControl>

            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {loading ? (
              <Text color="#8696A0" py={3} fontSize="sm">Searching...</Text>
            ) : searched && searchResult.length === 0 ? (
              <Box py={4} textAlign="center" w="100%">
                <Text color="#667781" fontSize="sm">No users found</Text>
                <Text color="#667781" fontSize="xs" mt={1}>Try a different name or email</Text>
              </Box>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((u) => (
                  <UserListItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleGroup(u)}
                  />
                ))
            )}

            {selectedUsers.length > 0 && selectedUsers.length < 2 && (
              <Text color="#FFC107" fontSize="xs" mt={2}>
                Select at least {2 - selectedUsers.length} more member{selectedUsers.length === 1 ? "" : "s"}
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSubmit}
              bg="#25D366"
              color="white"
              _hover={{
                bg: "#128C7E",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)",
              }}
              _active={{ transform: "translateY(0)", bg: "#075E54" }}
              borderRadius="8px"
              isDisabled={selectedUsers.length < 2 || !groupChatName.trim()}
              _disabled={{
                bg: "#2A3942",
                color: "#667781",
                cursor: "not-allowed",
                _hover: { bg: "#2A3942", transform: "none", boxShadow: "none" },
              }}
            >
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
