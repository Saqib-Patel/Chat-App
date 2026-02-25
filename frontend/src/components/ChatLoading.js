import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack p={3} spacing={2}>
      <Skeleton height="60px" startColor="#1F2C34" endColor="#2A3942" borderRadius="8px" />
      <Skeleton height="60px" startColor="#1F2C34" endColor="#2A3942" borderRadius="8px" />
      <Skeleton height="60px" startColor="#1F2C34" endColor="#2A3942" borderRadius="8px" />
      <Skeleton height="60px" startColor="#1F2C34" endColor="#2A3942" borderRadius="8px" />
      <Skeleton height="60px" startColor="#1F2C34" endColor="#2A3942" borderRadius="8px" />
      <Skeleton height="60px" startColor="#1F2C34" endColor="#2A3942" borderRadius="8px" />
      <Skeleton height="60px" startColor="#1F2C34" endColor="#2A3942" borderRadius="8px" />
      <Skeleton height="60px" startColor="#1F2C34" endColor="#2A3942" borderRadius="8px" />
    </Stack>
  );
};

export default ChatLoading;
