"use client";  
import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useToast } from "@chakra-ui/react";
import { BASE_URL } from "@/Constants";


export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const toast = useToast();

  const joinChat = async (buyerId, sellerId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/chats/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ buyerId, sellerId }),
      });
      const data = await response.json();
      if (response.ok) {
        setCurrentChat(data.chatId);
        setMessages(data.messages || []);
        toast({
          title: "Chat Joined",
          description: "You have successfully joined the chat.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        return data.chatId;
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to join the chat.",
          status: "error",
          duration: 3000,
          isClosable: true, 
        })
        throw new Error(data.message || "Failed to join the chat.");

      }
    } catch (error) {
      console.error("Error joining chat:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to join the chat.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return null;
    }
  };

  const sendMessage = async (chatId, content) => {
    try {
      if (!user || !user.id) {
        throw new Error("User is not authenticated.");
      }
      const senderId = user.id;
      const response = await fetch(`${BASE_URL}/api/chats/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId, senderId, content }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: senderId, content, timestamp: new Date().toISOString() },
        ]);
        toast({
          title: "Message Sent",
          description: "Your message has been sent successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(data.message || "Failed to send the message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send the message.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ChatContext.Provider
      value={{ joinChat, sendMessage, messages, currentChat, setCurrentChat }}
    >
      {children}
    </ChatContext.Provider>
  );
};
