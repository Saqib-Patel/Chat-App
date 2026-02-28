import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Flex,
  Button,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import "../components/styles.css";

function Homepage() {
  const history = useHistory();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);

  const features = [
    { icon: "⚡", title: "Real-Time Messaging", desc: "Instant delivery with Socket.io — messages arrive in milliseconds" },
    { icon: "👥", title: "Group Chats", desc: "Create groups, add members, and chat together seamlessly" },
    { icon: "🟢", title: "Online Presence", desc: "See who's online in real-time with live status indicators" },
    { icon: "✏️", title: "Message Status", desc: "Sent, Delivered, and Seen indicators just like WhatsApp" },
    { icon: "🔒", title: "Secure Auth", desc: "JWT protected authentication with bcrypt encrypted passwords" },
    { icon: "🔍", title: "User Search", desc: "Find and connect with users instantly by name or email" },
  ];

  const techStack = ["MongoDB", "Express.js", "React.js", "Node.js", "Socket.io", "Chakra UI"];

  if (showAuth) {
    return (
      <Box
        w="100%"
        minH="100vh"
        bg="#0B141A"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={4}
      >
        <Container maxW="md" centerContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={4}
            bg="#111B21"
            w="100%"
            mb={4}
            borderRadius="12px"
            border="1px solid #2A3942"
          >
            <Flex alignItems="center" gap={3}>
              <Box
                w="40px"
                h="40px"
                borderRadius="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="#25D366"
                boxShadow="0 4px 15px rgba(37, 211, 102, 0.3)"
              >
                <Text fontSize="xl" color="white">💬</Text>
              </Box>
              <Text
                fontSize="3xl"
                fontFamily="Segoe UI, Inter"
                fontWeight="700"
                color="#25D366"
              >
                ChatFlow
              </Text>
            </Flex>
          </Box>

          <Box
            bg="#111B21"
            w="100%"
            p={6}
            borderRadius="12px"
            border="1px solid #2A3942"
            animation="fadeInUp 0.5s ease"
          >
            <Tabs isFitted variant="soft-rounded">
              <TabList mb="1.5em" bg="#0B141A" p={1} borderRadius="8px">
                <Tab>Login</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Button
            mt={4}
            variant="ghost"
            color="#8696A0"
            onClick={() => setShowAuth(false)}
            _hover={{ color: "#25D366" }}
            fontSize="sm"
          >
            ← Back to Home
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box w="100%" minH="100vh" bg="#0B141A" overflowY="auto" overflowX="hidden">
      <Box
        as="nav"
        position="sticky"
        top={0}
        zIndex={100}
        bg="rgba(11, 20, 26, 0.9)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid #2A3942"
        px={{ base: 4, md: 8 }}
        py={3}
      >
        <Flex maxW="1200px" mx="auto" justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap={2}>
            <Box
              w="36px"
              h="36px"
              borderRadius="50%"
              bg="#25D366"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 2px 10px rgba(37, 211, 102, 0.25)"
            >
              <Text fontSize="md" color="white">💬</Text>
            </Box>
            <Text
              fontSize="xl"
              fontWeight="700"
              color="#25D366"
              letterSpacing="-0.01em"
            >
              ChatFlow
            </Text>
          </Flex>
          <Flex gap={3}>
            <Button
              variant="outline"
              borderColor="rgba(37, 211, 102, 0.3)"
              color="#25D366"
              _hover={{ bg: "rgba(37, 211, 102, 0.1)", borderColor: "#25D366" }}
              borderRadius="8px"
              size="sm"
              onClick={() => setShowAuth(true)}
            >
              Login
            </Button>
            <Button
              bg="#25D366"
              color="white"
              _hover={{ bg: "#128C7E" }}
              borderRadius="8px"
              size="sm"
              onClick={() => setShowAuth(true)}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Box>

      <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} py={{ base: 12, md: 20 }}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          alignItems="center"
          gap={{ base: 10, lg: 16 }}
        >
          <Box flex={1} textAlign={{ base: "center", lg: "left" }}>
            <Text
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="800"
              color="#E9EDEF"
              lineHeight="1.1"
              mb={4}
              animation="fadeInUp 0.6s ease"
            >
              Chat Without{" "}
              <Text as="span" color="#25D366">
                Limits.
              </Text>
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="#8696A0"
              mb={8}
              maxW="500px"
              mx={{ base: "auto", lg: "0" }}
              lineHeight="1.6"
              animation="fadeInUp 0.8s ease"
            >
              Real-time messaging with the people that matter. Built with the MERN
              stack and powered by Socket.io for instant communication.
            </Text>
            <Flex
              gap={4}
              justifyContent={{ base: "center", lg: "flex-start" }}
              animation="fadeInUp 1s ease"
            >
              <Button
                size="lg"
                bg="#25D366"
                color="white"
                _hover={{
                  bg: "#128C7E",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(37, 211, 102, 0.3)",
                }}
                _active={{ bg: "#075E54" }}
                borderRadius="8px"
                fontWeight="600"
                px={8}
                h="52px"
                onClick={() => setShowAuth(true)}
              >
                Start Chatting →
              </Button>
              <Button
                as={Link}
                href="https://github.com/Saqib-Patel/Chat-App"
                target="_blank"
                size="lg"
                variant="outline"
                borderColor="#2A3942"
                color="#E9EDEF"
                _hover={{
                  bg: "rgba(255, 255, 255, 0.05)",
                  borderColor: "#3B4A54",
                  textDecoration: "none",
                }}
                borderRadius="8px"
                fontWeight="500"
                px={8}
                h="52px"
              >
                View on GitHub
              </Button>
            </Flex>
          </Box>

          <Box flex={1} display="flex" justifyContent="center">
            <Box className="phone-mockup">
              <Box className="phone-mockup-header">
                <Box className="avatar">S</Box>
                <Box className="info">
                  <h4>ChatFlow Group</h4>
                  <span className="status">3 members online</span>
                </Box>
              </Box>
              <Box className="phone-mockup-messages">
                <Box className="mock-msg received">Hey! Welcome to ChatFlow 👋</Box>
                <Box className="mock-msg sent">Thanks! This looks amazing 🚀</Box>
                <Box className="mock-msg received">It's built with MERN + Socket.io</Box>
                <Box className="mock-msg sent">Real-time messaging? Sweet!</Box>
                <Box className="mock-msg received">Try the group chat feature too 👥</Box>
                <Box className="mock-msg sent">Already on it! 💚</Box>
              </Box>
              <Box className="phone-mockup-input">
                <Box className="input-mock">Type a message...</Box>
                <Box className="send-mock">▶</Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>

      <Box bg="#111B21" py={{ base: 12, md: 20 }} borderTop="1px solid #2A3942">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }}>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="700"
            color="#E9EDEF"
            textAlign="center"
            mb={3}
          >
            Everything You Need to{" "}
            <Text as="span" color="#25D366">
              Stay Connected
            </Text>
          </Text>
          <Text
            fontSize="md"
            color="#8696A0"
            textAlign="center"
            mb={12}
            maxW="600px"
            mx="auto"
          >
            Built with modern tech for a seamless chatting experience
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {features.map((feature, idx) => (
              <Box key={idx} className="feature-card" animation={`fadeInUp ${0.3 + idx * 0.1}s ease`}>
                <Box className="icon">{feature.icon}</Box>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      <Box py={{ base: 10, md: 16 }} bg="#0B141A">
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} textAlign="center">
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="700"
            color="#E9EDEF"
            mb={8}
          >
            Powered By
          </Text>
          <Flex gap={3} flexWrap="wrap" justifyContent="center">
            {techStack.map((tech, idx) => (
              <Box key={idx} className="tech-badge">
                {tech}
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>

      <Box
        borderTop="1px solid #2A3942"
        py={8}
        bg="#111B21"
      >
        <Box maxW="1200px" mx="auto" px={{ base: 4, md: 8 }} textAlign="center">
          <Text color="#8696A0" fontSize="sm" mb={2}>
            Built with ❤️ and MERN Stack by{" "}
            <Text as="span" color="#25D366" fontWeight="600">
              Saqib Patel
            </Text>
          </Text>
          <Flex gap={4} justifyContent="center" mt={3}>
            <Link
              href="https://github.com/Saqib-Patel"
              isExternal
              color="#667781"
              fontSize="sm"
              _hover={{ color: "#25D366" }}
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/saqib-patel"
              isExternal
              color="#667781"
              fontSize="sm"
              _hover={{ color: "#25D366" }}
            >
              LinkedIn
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default Homepage;
