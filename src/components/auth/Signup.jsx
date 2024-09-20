import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Stack,
  Checkbox,
  Link,
  HStack,
  Text,
  Select,
  InputGroup,
  InputLeftElement,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import { MdEmail, MdPerson } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { BASE_URL } from '@/Constants';
import axios from 'axios';

const Signup = ({ setIsLoginPage }) => {
  console.log(BASE_URL);
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: '',
    userType: '',
    username: '', 
    password: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password, userType, username } = formData;
    console.log(formData);
  
    try {
      const res = await axios.post(`${BASE_URL}/api/users/signup`, 
        { 
          email, 
          password, 
          userType, 
          username 
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        toast({
          title: "Account created.",
          description: "Your account has been successfully created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsLoginPage(true);
      }
    } catch (error) {
      console.error("Error registering:", error.response?.data || error.message);
      toast({
        title: "Registration failed.",
        description: "There was an error creating your account. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  

  return (
    <Flex align="center" justify="center" h="75vh" bg="white">
      <Box
        w={{ base: '100%', md: '500px' }}
        p={8}
        rounded="lg"
        boxShadow="lg"
        bg="white"
      >
        <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal">
          Create Your Account
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdEmail} color="teal" />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  focusBorderColor="teal"
                  value={formData.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="userType" isRequired>
              <FormLabel>User Type</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdPerson} color="teal" />
                </InputLeftElement>
                <Select
                  placeholder="Select user type"
                  focusBorderColor="teal"
                  value={formData.userType}
                  onChange={handleChange}
                  pl="2.5rem" 
                >
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                </Select>
              </InputGroup>
            </FormControl>

            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={MdPerson} color="teal" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  focusBorderColor="teal"
                  value={formData.username}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>


            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="teal" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Create a password"
                  focusBorderColor="teal"
                  value={formData.password}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>

            <Checkbox
              id="termsAccepted"
              colorScheme="red"
              isChecked={formData.termsAccepted}
              onChange={handleChange}
            >
              <Text fontSize={'sm'}>
                I agree to the Terms and Conditions
              </Text>
            </Checkbox>

            <Button
              mt={4}
              colorScheme="red"
              bg="teal"
              color="white"
              _hover={{ bg: 'red.700' }}
              size="lg"
              type="submit"
            >
              Sign Up
            </Button>
          </Stack>
        </form>
        <HStack mt={4} justify="center">
          <Text color="gray.600">Already have an account?</Text>
          <Link onClick={() => setIsLoginPage(true)} color="teal.500">
            Login
          </Link>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Signup;