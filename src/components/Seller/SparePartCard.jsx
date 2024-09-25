
import React from 'react';
import { Box, Image, Text, Badge, Button, Flex, Stack } from '@chakra-ui/react';
import { FaCogs } from 'react-icons/fa';

const SparePartCard = ({ sparePart }) => {
  console.log(sparePart);
  
  const { images, name, description, price, usage, location } = sparePart;

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      _hover={{ boxShadow: 'lg' }}
      transition="all 0.3s ease"
    >
      <Image src={images[0]} alt={name} w="full" h="200px" objectFit="cover" />

      <Box p={4}>
        <Stack spacing={3}>
          <Text fontSize="lg" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="sm" color="gray.600">
            {description?.length > 60 ? `${description.substring(0, 60)}...` : description}
          </Text>
          <Text fontSize="xl" fontWeight="semibold" color="teal.600">
            Rs {price?.toLocaleString()}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Location: {location}
          </Text>
          <Badge colorScheme="teal">Usage: {usage}</Badge>
          <Button leftIcon={<FaCogs />} colorScheme="teal" size="sm" w="full">
            View Details
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SparePartCard;
