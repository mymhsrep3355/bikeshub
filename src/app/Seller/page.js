"use client";
import Navbar from "@/components/Custom/Navbar";
import React, { useContext } from "react";
import SearchBar from "@/components/Custom/SearchBar";
import CreateButton from "@/components/Custom/CreateButton";
import { FaStore } from "react-icons/fa";
import AdCard from "@/components/Seller/AdCard";
import { AdsContext } from "@/service/AdsProvider";
import {
  Box,
  SimpleGrid,
  Container,
  Flex,
  Text,
  Heading,
  Divider,
} from "@chakra-ui/react";

const Seller = () => {
  const { ads } = useContext(AdsContext);

  return (
    <>
      <Navbar userType="seller" />
      <Container maxW="7xl" py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Box flex="1" mr={4}>
            <SearchBar />
          </Box>
        </Flex>
        <CreateButton
          buttonText="Create Store"
          icon={FaStore}
          onClick={() => {
            console.log("Create Store");
          }}
        />

        <Divider my={4} />

        <Box mb={8}>
          <Heading size="lg" mb={4} color="teal.600">
            <Text>Featured Ads</Text>
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {ads.length > 0 ? (
              ads.map((ad) => <AdCard key={ad._id} ad={ad} />)
            ) : (
              <Text fontSize="lg" color="gray.500">
                No ads found. Please create a new ad to get started.
              </Text>
            )}
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
};

export default Seller;
