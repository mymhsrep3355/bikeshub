
import React from 'react';
import { Box, Image, Text, Badge, Button, Flex, Stack } from '@chakra-ui/react';
import { FaCar } from 'react-icons/fa';

const VehicleCard = ({ vehicle }) => {
  const { images, name, model, price, year, condition, location } = vehicle;

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
          <Flex justifyContent="space-between">
            <Text fontSize="sm" color="gray.500">
              {model} - {year}
            </Text>
            <Badge colorScheme="teal">{condition}</Badge>
          </Flex>
          <Text fontSize="xl" fontWeight="semibold" color="teal.600">
            Rs {price?.toLocaleString()}
          </Text>
          <Text fontSize="sm" color="gray.600">
            Location: {location}
          </Text>
          <Button leftIcon={<FaCar />} colorScheme="teal" size="sm" w="full">
            View Details
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default VehicleCard;
