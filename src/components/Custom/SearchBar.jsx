import React from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Select,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaSearch, FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa';

const SearchBar = () => {
  return (
    <Flex
      align="center"
      w={"100%"}
      mx="auto"
      py={4}
      px={6}
      bg="white"
      boxShadow="md"
      borderRadius="md"
      gap={4}
    >
      <InputGroup flex="1" maxW="200px">
        <InputLeftElement pointerEvents="none">
          <Icon as={FaMapMarkerAlt} color="teal.600" />
        </InputLeftElement>
        <Select
          placeholder="Pakistan"
          variant="outline"
          borderRadius="md"
          pl="40px" 
        >
          <option value="Lahore">Lahore</option>
          <option value="Islamabad">Islamabad</option>
          <option value="Karachi">Karachi</option>
        </Select>
        <InputRightElement pointerEvents="none">
          <Icon as={FaChevronDown} color="gray.500" />
        </InputRightElement>
      </InputGroup>


      <InputGroup flex="3">
        <Input
          type="text"
          placeholder="Find Bikes, Spare Parts and more..."
          variant="outline"
          borderRadius="md"
          focusBorderColor="teal.500"
          _placeholder={{ color: 'gray.500' }}
        />
        <InputRightElement>
          <IconButton
            icon={<FaSearch />}
            colorScheme="teal"
            aria-label="Search"
            borderRadius="md"
            boxSize={10}
            variant="solid"
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default SearchBar;
