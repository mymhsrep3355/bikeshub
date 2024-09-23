// ChatBox.jsx
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
  ScrollableBox,
} from "@chakra-ui/react";
import { ChatContext } from "@/service/ChatContext";
import { AuthContext } from "@/service/AuthProvider";
import { FaTimes } from "react-icons/fa";

const ChatBox = ({ isOpen, onClose, chatId, sellerName }) => {
  const [messageContent, setMessageContent] = useState("");
  const { sendMessage, messages, currentChat } = useContext(ChatContext); 
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageContent.trim() && user.id && chatId) {
      sendMessage(chatId, messageContent);
      setMessageContent("");
    } else {
      console.error("Cannot send message. Missing data.");
    }
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      right={0}
      w={{ base: "full", md: "sm" }}
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      shadow="lg"
      p={4}
      zIndex={1000}
      display={isOpen ? "block" : "none"}
    >
      <HStack justifyContent="space-between">
        <Text fontSize="md" fontWeight="bold">
          Chat with {sellerName}
        </Text>
        <IconButton
          aria-label="Close chat"
          icon={<FaTimes />}
          size="sm"
          onClick={onClose}
        />
      </HStack>
      <VStack spacing={2} mt={4}>
        <Box
          w="full"
          h="250px" 
          overflowY="auto"
          bg="gray.50"
          p={2}
          borderRadius="md"
        >

          {messages
            .filter((msg) => msg.chatId === currentChat) 
            .map((msg, index) => (
              <Box
                key={index}
                bg={msg.sender === user.id ? "teal.100" : "gray.200"} 
                p={2}
                borderRadius="md"
                alignSelf={msg.sender === user.id ? "flex-end" : "flex-start"}
                mb={1}
                maxW="70%"
                wordBreak="break-word"
              >
                <Text fontSize="sm" color="gray.800">
                  {msg.content}
                </Text>
                <Text fontSize="xs" color="gray.500" textAlign="right">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </Text>
              </Box>
            ))}
          <div ref={messagesEndRef} />
        </Box>
        <HStack w="full">
          <Input
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type your message"
            flex="1"
          />
          <Button colorScheme="teal" onClick={handleSendMessage}>
            Send
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ChatBox;
