"use client";

import CreateButton from "@/components/Custom/CreateButton";
import ModalForm from "@/components/Custom/ModalForm";
import Navbar from "@/components/Custom/Navbar";
import SearchBar from "@/components/Custom/SearchBar";
import StoreCard from "@/components/Seller/StoreCard";
import { ApiContext } from "@/service/ApiContext";
import { StoresContext } from "@/service/StoresProvider";
import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  useDisclosure,
  useToast,
  Text,
  VStack,
  Button,
  Divider,
  Stack,
  Icon,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { FaStore, FaFilter } from "react-icons/fa";

const Store = () => {
  const { createStore, loading } = useContext(ApiContext);
  const { stores, userStores } = useContext(StoresContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState("");
  const toast = useToast();

  const createStoreFields = [
    {
      name: "images",
      label: "Store Images",
      type: "file",
      accept: "image/*",
      multiple: true,
      isRequired: true,
    },
    {
      name: "name",
      label: "Store Name",
      type: "text",
      placeholder: "Enter store name",
      isRequired: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter store description",
      isRequired: true,
    },
  ];

  const handleSubmit = async (data) => {
    try {
      if (modalType === "createStore") {
        await createStore(data);
      }
      toast({
        title: "Success",
        description: `Successfully created store`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  return (
    <>
      <Navbar userType="seller" />
      <Container maxW="7xl" w="full" py={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Box flex="1" mr={4}>
            <SearchBar placeholder="Search stores, ads, and more..." />
          </Box>
          <CreateButton
            buttonText="Create Store"
            icon={FaStore}
            onClick={() => {
              setModalType("createStore");
              onOpen();
            }}
            colorScheme="teal"
          />
        </Flex>

        {/* All Stores Section */}
        <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="sm">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg" color="teal.600">
              All Stores
            </Heading>
            <Button leftIcon={<FaFilter />} colorScheme="teal" variant="outline" size="sm">
              Filters
            </Button>
          </Flex>
          <Divider mb={6} />

          <Box position="relative" overflow="hidden">
            {loading ? (
              <Flex justify="center" py={8}>
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : stores?.length > 0 ? (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} py={8}>
                {stores?.map((store) => (
                  <Box key={store._id} px={2} _hover={{ transform: "scale(1.05)", transition: "0.3s" }}>
                    <StoreCard store={store} />
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Flex justify="center" py={8}>
                <Text fontSize="xl" color="gray.500">
                  No stores available.
                </Text>
              </Flex>
            )}
          </Box>
        </Box>

        {/* My Stores Section */}
        <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="sm">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg" color="teal.600">
              My Stores
            </Heading>
            <Button leftIcon={<FaFilter />} colorScheme="teal" variant="outline" size="sm">
              Filters
            </Button>
          </Flex>
          <Divider mb={6} />

          <Box position="relative" overflow="hidden">
            {loading ? (
              <Flex justify="center" py={8}>
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : userStores?.length > 0 ? (
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} py={8}>
                {userStores?.map((store) => (
                  <Box key={store._id} px={2} _hover={{ transform: "scale(1.05)", transition: "0.3s" }}>
                    <StoreCard store={store} />
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Flex justify="center" py={8}>
                <Text fontSize="xl" color="gray.500">
                  No stores available.
                </Text>
              </Flex>
            )}
          </Box>
        </Box>

        <ModalForm
          isOpen={isOpen}
          onClose={onClose}
          formFields={modalType === "createStore" ? createStoreFields : []}
          formTitle={modalType === "createStore" ? "Create Store" : ""}
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export default Store;
