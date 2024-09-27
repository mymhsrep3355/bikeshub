import React, { useState, useContext } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  useColorModeValue,
  Icon,
  Button,
  Stack,
} from "@chakra-ui/react";
import {
  FaHeart,
  FaPhone,
  FaMotorcycle,
  FaCalendar,
  FaTag,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { ChatContext } from "@/service/ChatContext";
import { AuthContext } from "@/service/AuthProvider";
import { useRouter } from "next/navigation";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const AdCard = ({ ad }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { joinChat, currentChat, setCurrentChat } = useContext(ChatContext);
  const { images, salePrice, adName, location, createdAt, contact, postedBy } = ad;
  const { model, brand, year, condition, description } = ad.bikeInfo || {};
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: false,
  };

  const handleContactSeller = async () => {
    console.log("Contact Seller clicked for Ad:", adName);
    if (postedBy && user && user.id) {
      const chatId = await joinChat(user.id, postedBy);
      if (chatId) {
        setCurrentChat(chatId);

        console.log({
          chatId,
          postedBy,
          adName,
          userId: user.id
        });

        router.push(
          `/chatbox/${chatId}?sellerId=${postedBy.toString()}&sellerName=${encodeURIComponent(adName)}&adName=${encodeURIComponent(adName)}`
        );
        
      }
    } else {
      console.error("User or Seller ID missing. Cannot join chat.");
    }
  };
  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={"teal.500"}
      boxShadow="md"
      bg={useColorModeValue("white", "gray.800")}
      _hover={{ boxShadow: "lg" }}
      transition="all 0.3s ease"
    >
      <Box h="150px" w="full" overflow="hidden">
        <Slider {...settings}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={adName}
              objectFit="cover"
              w="full"
              h="160px"
              style={{ display: "block" }}
            />
          ))}
        </Slider>
      </Box>

      <Box p="4">
        <Flex justifyContent="space-between" alignItems="center" mb="2">
          <Text fontSize="lg" fontWeight="bold" color="teal.500">
            Rs {salePrice.toLocaleString()}
          </Text>
          <IconButton
            icon={<Icon as={FaHeart} />}
            variant="outline"
            colorScheme="red"
            aria-label="Add to Wishlist"
            size="sm"
            isRound
          />
        </Flex>

        <Text
          fontSize="lg"
          fontWeight="semibold"
          mb="1"
          color={useColorModeValue("gray.700", "gray.200")}
        >
          {adName}
        </Text>

        <Text fontSize="xs" color="gray.500" mb={2}>
          {location} • {formattedDate}
        </Text>

        <Stack spacing={1} mb={4}>
          <Flex alignItems="center">
            <Icon as={FaMotorcycle} mr={1} color="teal.500" />
            <Text fontSize="sm" color="gray.600">
              <strong>Model:</strong> {model}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={FaTag} mr={1} color="teal.500" />
            <Text fontSize="sm" color="gray.600">
              <strong>Brand:</strong> {brand}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={FaCalendar} mr={1} color="teal.500" />
            <Text fontSize="sm" color="gray.600">
              <strong>Year:</strong> {year}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={FaTag} mr={1} color="teal.500" />
            <Text fontSize="sm" color="gray.600">
              <strong>Condition:</strong> {condition}
            </Text>
          </Flex>
          <Text fontSize="sm" color="gray.600">
            <strong>Description:</strong> {description}
          </Text>
        </Stack>

        <Button
          leftIcon={<FaPhone />}
          colorScheme="teal"
          variant="solid"
          width="full"
          mt={2}
          onClick={handleContactSeller}
        >
          Contact Seller
        </Button>
      </Box>
    </Box>
  );
};

export default AdCard;
