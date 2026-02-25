import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { ChatState } from "../../Context/ChatProvider";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Successful!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    if (pics === undefined) {
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      // Convert to base64 data URL as fallback (no external service needed)
      const reader = new FileReader();
      reader.readAsDataURL(pics);
      reader.onloadend = () => {
        // Use a placeholder or just skip - the default avatar will be used
        toast({
          title: "Profile picture noted",
          description: "Default avatar will be used. You can update your picture later.",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      };
    } else {
      toast({
        title: "Please select a JPEG or PNG image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="signup-first-name" isRequired>
        <FormLabel color="#8696A0">Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          bg="#2A3942"
          borderColor="transparent"
          _hover={{ bg: "#323F49" }}
          _focus={{ bg: "#2A3942", borderColor: "#25D366", boxShadow: "none" }}
          color="#E9EDEF"
          _placeholder={{ color: "#667781" }}
          borderRadius="8px"
        />
      </FormControl>
      <FormControl id="signup-email" isRequired>
        <FormLabel color="#8696A0">Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
          bg="#2A3942"
          borderColor="transparent"
          _hover={{ bg: "#323F49" }}
          _focus={{ bg: "#2A3942", borderColor: "#25D366", boxShadow: "none" }}
          color="#E9EDEF"
          _placeholder={{ color: "#667781" }}
          borderRadius="8px"
        />
      </FormControl>
      <FormControl id="signup-password" isRequired>
        <FormLabel color="#8696A0">Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password (min 6 characters)"
            onChange={(e) => setPassword(e.target.value)}
            bg="#2A3942"
            borderColor="transparent"
            _hover={{ bg: "#323F49" }}
            _focus={{ bg: "#2A3942", borderColor: "#25D366", boxShadow: "none" }}
            color="#E9EDEF"
            _placeholder={{ color: "#667781" }}
            borderRadius="8px"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              variant="ghost"
              color="#25D366"
              _hover={{ bg: "rgba(37, 211, 102, 0.1)" }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="signup-confirm-password" isRequired>
        <FormLabel color="#8696A0">Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
            bg="#2A3942"
            borderColor="transparent"
            _hover={{ bg: "#323F49" }}
            _focus={{ bg: "#2A3942", borderColor: "#25D366", boxShadow: "none" }}
            color="#E9EDEF"
            _placeholder={{ color: "#667781" }}
            borderRadius="8px"
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              variant="ghost"
              color="#25D366"
              _hover={{ bg: "rgba(37, 211, 102, 0.1)" }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="signup-pic">
        <FormLabel color="#8696A0">Upload your picture (optional)</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          bg="#2A3942"
          borderColor="transparent"
          borderRadius="8px"
          color="#E9EDEF"
          sx={{
            "::file-selector-button": {
              bg: "rgba(37, 211, 102, 0.15)",
              color: "#25D366",
              border: "1px solid rgba(37, 211, 102, 0.3)",
              borderRadius: "6px",
              px: 4,
              py: 1,
              mr: 3,
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "sm",
            },
          }}
        />
      </FormControl>
      <Button
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
        bg="#25D366"
        color="white"
        _hover={{
          bg: "#128C7E",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
        }}
        _active={{ transform: "translateY(0)", bg: "#075E54" }}
        borderRadius="8px"
        fontWeight="600"
        h="48px"
        fontSize="md"
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
