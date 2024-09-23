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
  Button,
  Stack,
} from '@chakra-ui/react';
import {
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const ItemCard = ({ item }) => {
  const { images, price, name, location, createdAt, condition, status } = item;
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
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
              alt={name}
              objectFit="cover"
              w="full"
              h="180px"
              style={{ display: 'block' }}
            />
          ))}
        </Slider>
      </Box>

      <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Text fontSize="lg" fontWeight="bold" color="teal.600">
            Rs {price.toLocaleString()}
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

        <Text fontSize="lg" fontWeight="semibold" mb={1}>
          {name}
        </Text>

        <Stack spacing={1} mb={4}>
          <Flex alignItems="center">
            <Icon as={FaMapMarkerAlt} mr={2} color="teal.500" />
            <Text fontSize="sm">{location}</Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={FaClock} mr={2} color="teal.500" />
            <Text fontSize="sm">{formattedDate}</Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={FaClock} mr={2} color="teal.500" />
            <Text fontSize="sm">{status}</Text>
          </Flex>
          {condition && (
            <Flex alignItems="center">
              <Icon as={FaMoneyBillWave} mr={2} color="teal.500" />
              <Text fontSize="sm">Condition: {condition}</Text>
            </Flex>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default ItemCard;
