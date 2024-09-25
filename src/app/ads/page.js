"use client";
import CreateButton from "@/components/Custom/CreateButton";
import Navbar from "@/components/Custom/Navbar";
import ModalForm from "@/components/Custom/ModalForm";
import SearchBar from "@/components/Custom/SearchBar";
import { AdsContext } from "@/service/AdsProvider";
import {
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Container,
  useToast,
  useDisclosure,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { FaAdversal, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdCard from "@/components/Seller/AdCard";
import { ApiContext } from "@/service/ApiContext";
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

const Ads = () => {
  const toast = useToast();
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

  const { userAds, loading, error, allAds } = useContext(AdsContext);
  const { createStore, postAd } = useContext(ApiContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState("");

  const handleSubmit = async (data) => {
    try {
      if (modalType === "createStore") {
        await createStore(data);
      } else if (modalType === "postAd") {
        await postAd(data);
      }
      toast({
        title: "Success",
        description: `Successfully ${
          modalType === "createStore" ? "created store" : "posted ad"
        }`,
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
      <Container maxW="container.xl" p={4}>
        <Box my={4}>
          <SearchBar />
        </Box>

        <Flex justifyContent="center" my={6}>
          <CreateButton
            buttonText="Post Ad"
            icon={FaAdversal}
            onClick={() => {
              setModalType("postAd");
              onOpen();
            }}
          />
        </Flex>

        <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="sm">
          <Heading size="lg" mb={4} color="teal.600" textAlign="center">
            Your Ads
          </Heading>
          <Box position="relative" overflow="hidden">
            {loading ? (
              <Flex justify="center" py={8}>
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : userAds?.length > 0 ? (
              <SimpleGrid columns={[1, 2, 3]} spacing={6} py={8}>
                {userAds?.map((ad) => (
                  <Box key={ad._id} px={2}>
                    <ItemCard item={ad} user={true} />
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Flex justify="center" py={8}>
                <Text fontSize="xl" color="gray.500">
                  No ads available.
                </Text>
              </Flex>
            )}
          </Box>
        </Box>

        <Box mb={12} p={6} bg="gray.50" borderRadius="lg" boxShadow="sm">
          <Heading size="lg" mb={4} color="teal.600" textAlign="center">
            All Ads
          </Heading>
          <Box position="relative" overflow="hidden">
            {loading ? (
              <Flex justify="center" py={8}>
                <Spinner size="xl" color="teal.500" />
              </Flex>
            ) : allAds?.length > 0 ? (
              <Slider {...sliderSettings}>
                {allAds?.map((ad) => (
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

        <ModalForm
          isOpen={isOpen}
          onClose={onClose}
          formFields={
            modalType === "createStore" ? createStoreFields : postAdFields
          }
          formTitle={modalType === "createStore" ? "Create Store" : "Post Ad"}
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};

export default Ads;
