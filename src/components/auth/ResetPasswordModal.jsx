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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { BASE_URL } from '@/Constants';

export const ResetPasswordModal = ({ isOpen, onClose, email, otp }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/users/reset-password`, {
        email,
        newPassword,
      });

      if (res.status === 200) {
        toast({
          title: "Password reset successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue resetting your password. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }finally{
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reset Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="new-password" isRequired>
            <FormLabel>New Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              focusBorderColor="red.500"
            />
          </FormControl>

          <FormControl id="confirm-password" isRequired mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              focusBorderColor="red.500"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleSubmit} size="lg">
            Reset Password
          </Button>
          <Button variant="ghost" onClick={onClose} size="lg">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};