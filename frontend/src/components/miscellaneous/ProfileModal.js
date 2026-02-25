import { ViewIcon } from "@chakra-ui/icons";
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
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
          variant="ghost"
          color="#8696A0"
          _hover={{ bg: "rgba(37, 211, 102, 0.1)", color: "#25D366" }}
          borderRadius="8px"
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, 0.6)" backdropFilter="blur(8px)" />
        <ModalContent bg="#1F2C34" border="1px solid #2A3942" borderRadius="12px" h="410px">
          <ModalHeader
            fontSize="28px"
            fontWeight="600"
            display="flex"
            justifyContent="center"
            color="#E9EDEF"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton color="#667781" _hover={{ color: "#E9EDEF" }} />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box
              p="3px"
              borderRadius="full"
              bg="#25D366"
              boxShadow="0 4px 20px rgba(37, 211, 102, 0.3)"
            >
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
                border="3px solid #1F2C34"
              />
            </Box>
            <Text
              fontSize={{ base: "18px", md: "20px" }}
              color="#8696A0"
              mt={4}
            >
              {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={onClose}
              variant="ghost"
              color="#8696A0"
              _hover={{ bg: "rgba(37, 211, 102, 0.1)", color: "#E9EDEF" }}
              borderRadius="8px"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
