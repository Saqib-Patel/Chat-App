import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="transparent"
      _hover={{
        bg: "rgba(37, 211, 102, 0.08)",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="#E9EDEF"
      px={3}
      py={2}
      mb={1}
      borderRadius="8px"
      borderBottom="1px solid rgba(42, 57, 66, 0.5)"
      transition="all 0.15s ease"
    >
      <Avatar
        mr={3}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
        border="2px solid rgba(37, 211, 102, 0.2)"
      />
      <Box>
        <Text fontWeight="500" fontSize="sm">{user.name}</Text>
        <Text fontSize="xs" color="#667781">
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
