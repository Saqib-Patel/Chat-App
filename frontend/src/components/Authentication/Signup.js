import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
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
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
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
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please select a valid image (JPEG or PNG)",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
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
            placeholder="Enter password"
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
        <FormLabel color="#8696A0">Upload your picture</FormLabel>
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
              transition: "all 0.2s ease",
              _hover: {
                bg: "rgba(37, 211, 102, 0.25)",
              },
            },
          }}
        />
      </FormControl>
      <Button
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
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
