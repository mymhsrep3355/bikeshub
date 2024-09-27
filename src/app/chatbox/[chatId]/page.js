"use client";

import { useSearchParams } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Icon,
  useColorModeValue,
  Container,
  Divider,
  Avatar,
  VStack,
  Button,
} from "@chakra-ui/react";
import ChatBox from "@/components/Custom/ChatBox";
import Navbar from "@/components/Custom/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get("chatId");
  const sellerId = searchParams.get("sellerId");
  const sellerName = searchParams.get("sellerName");
  const adName = searchParams.get("adName");

  const bgColor = useColorModeValue("gray.50", "gray.900");

  return (
    <>
      <Navbar userType={"seller"} />
      <Container maxW="container.xl" py={1}>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={6}
          alignItems="flex-start"
        >
          <Box
            w={{ base: "full", md: "30%" }}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="md"
            borderRadius="md"
            p={4}
            mb={{ base: 6, md: 0 }}
          >
            <IconButton
              icon={<Icon as={FaArrowLeft} />}
              aria-label="Back"
              onClick={() => router.back()}
              colorScheme="teal"
              variant="ghost"
              mb={4}
            />

            {/* Seller Information */}
            <VStack spacing={4} alignItems="center" textAlign="center">
              <Avatar size="xl" name={sellerName} />
              <Text fontSize="xl" fontWeight="bold" color="teal.500">
                {sellerName}
              </Text>
              <Text fontSize="md" color="gray.500">
                Ad: {adName}
              </Text>
              <Divider w="full" />
              <Button
                variant="outline"
                colorScheme="teal"
                onClick={() => alert("Seller profile clicked!")}
              >
                View Seller Profile
              </Button>
            </VStack>
          </Box>

          <Box flex="1" overflowY="auto">
            <ChatBox
              chatId={chatId}
              sellerName={sellerName}
              sellerId={sellerId}
              adName={adName}
            />
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default ChatPage;
