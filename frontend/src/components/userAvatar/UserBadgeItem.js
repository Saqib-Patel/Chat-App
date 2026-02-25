import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="full"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      bg="rgba(37, 211, 102, 0.15)"
      color="#25D366"
      border="1px solid rgba(37, 211, 102, 0.3)"
      cursor="pointer"
      onClick={handleFunction}
      transition="all 0.2s ease"
      _hover={{
        bg: "rgba(37, 211, 102, 0.25)",
        borderColor: "rgba(37, 211, 102, 0.5)",
      }}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} fontSize="8px" />
    </Badge>
  );
};

export default UserBadgeItem;
