
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { OTPModal } from './OTPModal';
import { BASE_URL } from '@/Constants';

export const ForgotPasswordModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const toast = useToast();

  const handleEmailSubmit = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/users/forgot-password`, {
        email,
      });

      if (res.status === 200) {
        toast({
          title: "OTP Sent",
          description: "Check your email for the OTP.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsOTPModalOpen(true); 
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue sending the OTP. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }finally{
      onClose()
    }
  };

  return (
    <>
      <Text color="red.500" cursor="pointer" onClick={onOpen}>
        Forgot password?
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleEmailSubmit}>
              Send OTP
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isOTPModalOpen && (
        <OTPModal
          isOpen={isOTPModalOpen}
          onClose={() => setIsOTPModalOpen(false)}
          email={email} 
        />
      )}
    </>
  );
};
