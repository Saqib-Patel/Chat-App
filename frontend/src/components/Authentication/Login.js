import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
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
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
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
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="login-email" isRequired>
        <FormLabel color="#8696A0">Email Address</FormLabel>
        <Input
          value={email}
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
      <FormControl id="login-password" isRequired>
        <FormLabel color="#8696A0">Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
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
        Login
      </Button>
      <Button
        variant="outline"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        borderColor="rgba(37, 211, 102, 0.3)"
        color="#25D366"
        _hover={{
          bg: "rgba(37, 211, 102, 0.1)",
          borderColor: "rgba(37, 211, 102, 0.5)",
        }}
        borderRadius="8px"
        h="48px"
        fontSize="md"
      >
        🎯 Use Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
