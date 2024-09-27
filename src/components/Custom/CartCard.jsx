import React from "react";
import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const CartCard = ({ item, onRemove }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      p={4}
      mb={4}
      w="full"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="md"
    >
      <Flex alignItems="center">
        {/* Image Section */}
        <Image
          src={item.image}
          alt={item.name}
          boxSize="80px"
          borderRadius="md"
          mr={4}
        />

        {/* Details Section */}
        <Box flex="1">
          <Text fontWeight="bold" fontSize="lg">
            {item.name}
          </Text>
          <Text color="gray.500">{item.location}</Text>
          <Text color="teal.500" fontWeight="bold">
            Rs {item.price}
          </Text>
        </Box>

        {/* Delete Button */}
        <IconButton
          icon={<FaTrash />}
          colorScheme="red"
          variant="outline"
          onClick={() => onRemove(item.id)}
          aria-label="Remove from Cart"
          isRound
        />
      </Flex>
    </Box>
  );
};

export default CartCard;
