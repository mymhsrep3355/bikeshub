"use client"; // Ensure this is at the top of your file for Next.js

import React from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

// Dynamically import react-slick with SSR disabled
const Slider = dynamic(() => import('react-slick'), { ssr: false });

const AdCard = ({ ad }) => {
  const { images, salePrice, adName, location, createdAt } = ad;
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  // Slider settings for react-slick
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show only one image at a time
    slidesToScroll: 1,
    arrows: true, // Enable navigation arrows if needed
    autoplay: true,
    autoplaySpeed: 3000, // Auto slide interval in ms
    adaptiveHeight: false, // Disable adaptive height for consistent image height
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={"teal.500"}
      boxShadow="md"
      bg={useColorModeValue('white', 'gray.800')}
      _hover={{ boxShadow: 'lg' }}
      transition="all 0.3s ease"
    >
      <Box h="180px" w="full" overflow="hidden"> 
        <Slider {...settings}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={adName}
              objectFit="cover"
              w="full"
              h="180px" 
              style={{ display: 'block' }}
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
            size="md"
            isRound
          />
        </Flex>

        <Text fontSize="xl" fontWeight="semibold" mb="2" color={useColorModeValue('gray.700', 'gray.200')}>
          {adName}
        </Text>

        <Text fontSize="sm" color="gray.500">
          {location}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {formattedDate}
        </Text>
      </Box>
    </Box>
  );
};

export default AdCard;
