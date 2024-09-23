"use client";

import Navbar from "@/components/Custom/Navbar";
import React, { useContext, useState } from "react";
import SearchBar from "@/components/Custom/SearchBar";
import CreateButton from "@/components/Custom/CreateButton";
import ModalForm from "@/components/Custom/ModalForm";
import { FaStore, FaAdversal, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import AdCard from "@/components/Seller/AdCard";
import { AdsContext } from "@/service/AdsProvider";
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  Divider,
  useDisclosure,
  useToast,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ApiContext } from "@/service/ApiContext";
import { ChatContext } from "@/service/ChatContext"; // Import ChatContext for managing chat state
import dynamic from "next/dynamic";
import ChatBox from "@/components/Custom/ChatBox"; // Import the ChatBox component

const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <IconButton
    aria-label="Next Slide"
    icon={<FaArrowRight />}
    onClick={onClick}
    position="absolute"
    top="50%"
    right="0"
    transform="translateY(-50%)"
    zIndex={1}
    size="sm"
    colorScheme="teal"
    bg="teal.500"
    _hover={{ bg: "teal.600" }}
  />
);

const PrevArrow = ({ onClick }) => (
  <IconButton
    aria-label="Previous Slide"
    icon={<FaArrowLeft />}
    onClick={onClick}
    position="absolute"
    top="50%"
    left="-3%"
    transform="translateY(-50%)"
    zIndex={1}
    size="sm"
    colorScheme="teal"
    bg="teal.500"
    _hover={{ bg: "teal.600" }}
  />
);

const Seller = () => {
  const { ads } = useContext(AdsContext);
  const { createStore, postAd } = useContext(ApiContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chat, setChat, isChatOpen, setIsChatOpen } = useContext(ChatContext);
  const [modalType, setModalType] = useState("");
  const toast = useToast();
  const router = useRouter();

  const createStoreFields = [
    { name: "name", label: "Store Name", type: "text", placeholder: "Enter store name", isRequired: true },
    { name: "description", label: "Description", type: "textarea", placeholder: "Enter store description", isRequired: true },
  ];

  const postAdFields = [
    { name: "images", label: "Images", type: "file", accept: "image/*", multiple: true, isRequired: true },
    { name: "adName", label: "Ad Name", type: "text", placeholder: "Enter ad name", isRequired: true },
    { name: "location", label: "Location", type: "text", placeholder: "Enter location", isRequired: true },
    { name: "salePrice", label: "Sale Price", type: "number", placeholder: "Enter sale price", isRequired: true },
    { name: "contact", label: "Contact", type: "text", placeholder: "Enter contact info", isRequired: true },
    { name: "model", label: "Model", type: "text", placeholder: "Enter bike model", isRequired: true },
    { name: "brand", label: "Brand", type: "text", placeholder: "Enter bike brand", isRequired: true },
    { name: "year", label: "Year", type: "number", placeholder: "Enter bike year", isRequired: true },
    {
      name: "condition", label: "Condition", type: "select", placeholder: "Select bike condition", isRequired: true,
      options: [
        { value: "new", label: "New" },
        { value: "used", label: "Used" }
      ]
    },
    { name: "description", label: "Description", type: "textarea", placeholder: "Enter bike description", isRequired: true },
  ];

  const handleSubmit = async (data) => {
    try {
      if (modalType === "createStore") {
        await createStore(data);
      } else if (modalType === "postAd") {
        await postAd(data);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
    }
    onClose();
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    swipe: true,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Navbar userType="seller" />
      <Container maxW="7xl" w={"full"} py={2}>
        <Flex justify="space-between" align="center" mb={4}>
          <Box flex="1" mr={4}>
            <SearchBar />
          </Box>
        </Flex>
        <Flex flexDir={"row"} justify={"center"} gap={3}>
          <CreateButton
            buttonText="Create Store"
            icon={FaStore}
            onClick={() => {
              setModalType("createStore");
              onOpen();
            }}
          />
          <CreateButton
            buttonText="Post Ad"
            icon={FaAdversal}
            onClick={() => {
              setModalType("postAd");
              onOpen();
            }}
          />
        </Flex>
        <Divider my={4} />

        <Box mb={8}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg" mb={4} color="teal.600">
              Featured Ad's
            </Heading>
            <Link
              color="gray.500"
              fontWeight="bold"
              onClick={() => router.push("/ads")}
              fontSize="md"
            >
              View more →
            </Link>
          </Flex>

          <Box position="relative" overflow="hidden">
            {ads.length > 3 ? (
              <Slider {...sliderSettings}>
                {ads.map((ad) => (
                  <Box key={ad._id} px={2}>
                    <AdCard ad={ad} />
                  </Box>
                ))}
              </Slider>
            ) : (
              <Flex wrap="wrap" justify="center">
                {ads.slice(0, 3).map((ad) => (
                  <Box key={ad._id} p={2}>
                    <AdCard ad={ad} />
                  </Box>
                ))}
              </Flex>
            )}
          </Box>
        </Box>

        <ModalForm
          isOpen={isOpen}
          onClose={onClose}
          formFields={modalType === "createStore" ? createStoreFields : postAdFields}
          formTitle={modalType === "createStore" ? "Create Store" : "Post Ad"}
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export default Seller;
