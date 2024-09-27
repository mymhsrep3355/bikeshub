"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Input,
  VStack,
  HStack,
  Text,
  Flex,
  Avatar,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPaperPlane, FaPlus } from "react-icons/fa";

import { AuthContext } from "@/service/AuthProvider";
import { ChatContext } from "@/service/ChatContext";

const ChatBox = ({ chatId, sellerId}) => {
  const { user } = useContext(AuthContext);
  const { joinChat, sendMessage, messages, currentChat } = useContext(ChatContext); 
  const [input, setInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    if (user && chatId) {
      joinChat(user.id, sellerId);
    }
  }, [user, sellerId]);

  const handleSendMessage = () => {
    if (input.trim() === "" || !currentChat) return;
    sendMessage(currentChat, input); 
    setInput("");
  };

  const scrollbarTrackColor = useColorModeValue("gray.200", "gray.600");
  const scrollbarThumbColor = useColorModeValue("red.500", "red.300");
  const messageBgColorYou = "red.500";
  const messageTextColorYou = "white";
  const messageBgColorOther = useColorModeValue("gray.200", "gray.600");
  const messageTextColorOther = useColorModeValue("black", "white");
  const chatBoxBgColor = useColorModeValue("gray.100", "gray.800");
  const messageContainerBgColor = useColorModeValue("white", "gray.700");
  const inputBgColor = useColorModeValue("white", "gray.700");

  return (
    <Flex
      direction="column"
      bg={chatBoxBgColor}
      p={4}
      borderRadius="md"
      boxShadow="lg"
      height="90vh"
      width="100%"
      mx="auto"
    >
      <VStack
        flex={1}
        spacing={4}
        overflowY="auto"
        width="full"
        p={4}
        bg={messageContainerBgColor}
        borderRadius="md"
        boxShadow="md"
        sx={{
          "::-webkit-scrollbar": {
            width: "8px",
          },
          "::-webkit-scrollbar-track": {
            background: scrollbarTrackColor,
          },
          "::-webkit-scrollbar-thumb": {
            background: scrollbarThumbColor,
            borderRadius: "8px",
          },
        }}
      >
        {messages.map((message, index) => (
          <HStack
            key={index}
            alignSelf={message.sender === user.id ? "flex-end" : "flex-start"}
            bg={message.sender === user.id ? messageBgColorYou : messageBgColorOther}
            color={message.sender === user.id ? messageTextColorYou : messageTextColorOther}
            borderRadius="lg"
            p={4}
            maxWidth="75%"
            spacing={4}
            boxShadow="sm"
          >
            {message.sender !== user.id && (
              <Avatar size="sm" src={message.profilePic} name={message.senderName} />
            )}
            <Text fontSize="md">{message.content}</Text>
            {message.sender === user.id && (
              <Avatar size="sm" src={user.profilePic} name={user.username} />
            )}
          </HStack>
        ))}
      </VStack>

      <Box mt={4} width="full">
        <HStack spacing={3}>
          <Input
            flex={1}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            focusBorderColor="red.500"
            bg={inputBgColor}
            borderRadius="full"
            boxShadow="sm"
          />
          <IconButton
            colorScheme="red"
            aria-label="Send message"
            icon={<FaPaperPlane />}
            onClick={handleSendMessage}
            borderRadius="full"
          />
          <IconButton
            colorScheme="blue"
            aria-label="Create order"
            icon={<FaPlus />}
            onClick={onOpen}
            borderRadius="full"
          />
        </HStack>
      </Box>
    </Flex>
  );
};

export default ChatBox;
