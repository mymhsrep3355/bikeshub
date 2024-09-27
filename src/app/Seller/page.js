"use client";

import Navbar from "@/components/Custom/Navbar";
import React, { useContext, useState, useEffect } from "react";
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
  Spinner,
  Grid,
  GridItem,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ApiContext } from "@/service/ApiContext";
import { ChatContext } from "@/service/ChatContext";
import dynamic from "next/dynamic";
import ChatBox from "@/components/Custom/ChatBox";

const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemCard from "@/components/Seller/ItemCard";

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
    borderRadius="full"
    boxShadow="lg"
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
    borderRadius="full"
    boxShadow="lg"
  />
);

const Seller = () => {
  const { ads, featuredProducts, spareParts, loading, error } = useContext(AdsContext);
  const { createStore, postAd } = useContext(ApiContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chat, setChat, isChatOpen, setIsChatOpen } = useContext(ChatContext);
  const [modalType, setModalType] = useState("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching data",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error]);

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

  const postAdFields = [
    {
      name: "images",
      label: "Images",
      type: "file",
      accept: "image/*",
      multiple: true,
      isRequired: true,
    },
    {
      name: "adName",
      label: "Ad Name",
      type: "text",
      placeholder: "Enter ad name",
      isRequired: true,
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Enter location",
      isRequired: true,
    },
    {
      name: "salePrice",
      label: "Sale Price",
      type: "number",
      placeholder: "Enter sale price",
      isRequired: true,
    },
    {
      name: "contact",
      label: "Contact",
      type: "text",
      placeholder: "Enter contact info",
      isRequired: true,
    },
    {
      name: "model",
      label: "Model",
      type: "text",
      placeholder: "Enter bike model",
      isRequired: true,
    },
    {
      name: "brand",
      label: "Brand",
      type: "text",
      placeholder: "Enter bike brand",
      isRequired: true,
    },
    {
      name: "year",
      label: "Year",
      type: "number",
      placeholder: "Enter bike year",
      isRequired: true,
    },
    {
      name: "condition",
      label: "Condition",
      type: "select",
      placeholder: "Select bike condition",
      isRequired: true,
      options: [
        { value: "new", label: "New" },
        { value: "used", label: "Used" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter bike description",
      isRequired: true,
    },
  ];

  const handleSubmit = async (data) => {
    try {
      if (modalType === "createStore") {
        await createStore(data);
      } else if (modalType === "postAd") {
        await postAd(data);
      }
      toast({
        title: "Success",
        description: `Successfully ${modalType === "createStore" ? "created store" : "posted ad"}`,
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
    prevArrow: <PrevArrow />,
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
      <Container maxW="8xl" py={6} px={{ base: 4, md: 8 }}>

        <Flex justify="space-between" align="center" mb={8}>
          <Box flex="1" mr={4}>
            <SearchBar placeholder="Search ads, stores, and more..." />
          </Box>
          <CreateButton
            buttonText="Create Store"
            icon={FaStore}
            onClick={() => {
              setModalType("createStore");
              onOpen();
            }}
            colorScheme="teal"
            size="md"
          />
        </Flex>
        <Box mb={12} p={6} bg="white" borderRadius="lg" boxShadow="lg">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg" color="teal.600">
              Featured Ads
            </Heading>
            <Link
              color="teal.500"
              fontWeight="bold"
              onClick={() => router.push("/ads")}
              fontSize="md"
            >
              View more →
            </Link>
          </Flex>
          <Box position="relative" overflow="hidden">
            {loading ? (
              <Flex justify="center" py={8}>
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : ads.length > 0 ? (
              <Slider {...sliderSettings}>
                {ads.map((ad) => (
                  <Box key={ad._id} px={2}>
                    <AdCard ad={ad} />
                  </Box>
                ))}
              </Slider>
            ) : (
              <Flex justify="center" py={8}>
                <Text fontSize="xl" color="gray.500">
                  No featured ads available.
                </Text>
              </Flex>
            )}
          </Box>
        </Box>
        <Box mb={12} p={6} bg="white" borderRadius="lg" boxShadow="lg">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg" color="teal.600">
              Featured Vehicles in Stores
            </Heading>
            <Link
              color="teal.500"
              fontWeight="bold"
              onClick={() => router.push("/stores")}
              fontSize="md"
            >
              View more →
            </Link>
          </Flex>
          <Box position="relative" overflow="hidden">
            {loading ? (
              <Flex justify="center" py={8}>
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : featuredProducts.length > 0 ? (
              <Slider {...sliderSettings}>
                {featuredProducts.map((item) => (
                  <Box key={item._id} px={2}>
                    <ItemCard item={item} user={false} />
                  </Box>
                ))}
              </Slider>
            ) : (
              <Flex justify="center" py={8}>
                <Text fontSize="xl" color="gray.500">
                  No featured vehicles available.
                </Text>
              </Flex>
            )}
          </Box>
        </Box>

        {/* Featured Spare Parts Section */}
        <Box mb={12} p={6} bg="white" borderRadius="lg" boxShadow="lg">
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading size="lg" color="teal.600">
              Featured Spare Parts
            </Heading>
            <Link
              color="teal.500"
              fontWeight="bold"
              onClick={() => router.push("/stores")}
              fontSize="md"
            >
              View more →
            </Link>
          </Flex>
          <Box position="relative" overflow="hidden">
            {loading ? (
              <Flex justify="center" py={8}>
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : spareParts.length > 0 ? (
              <Slider {...sliderSettings}>
                {spareParts.map((item) => (
                  <Box key={item._id} px={2}>
                    <ItemCard item={item} />
                  </Box>
                ))}
              </Slider>
            ) : (
              <Flex justify="center" py={8}>
                <Text fontSize="xl" color="gray.500">
                  No featured spare parts available.
                </Text>
              </Flex>
            )}
          </Box>
        </Box>

        {/* Create Modal */}
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
