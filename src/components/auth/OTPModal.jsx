import React, { useState, useRef } from 'react';
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
  HStack,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { ResetPasswordModal } from './ResetPasswordModal';
import { BASE_URL } from '@/Constants';

export const OTPModal = ({ isOpen, onClose, email }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const toast = useToast();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);
try {
  const response = await fetch(`${BASE_URL}/api/users/verify-otp`,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      otp: otpValue,
    }),
  })
  console.log(response.status);
  
  if (response.status===200) {
    setIsResetPasswordModalOpen(true);
  }
} catch (error) {
  console.log(error);
  
}
 
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" color="teal.600">Enter OTP</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel textAlign="center" fontWeight="bold">
                Please enter the 6-digit code sent to your email
              </FormLabel>
              <HStack justify="center" spacing={4} mt={4}>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    textAlign="center"
                    fontSize="2xl"
                    width="50px"
                    height="50px"
                    borderColor="teal.600"
                    focusBorderColor="teal.600"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[index] && index > 0) {
                        inputRefs.current[index - 1].focus();
                      }
                    }}
                  />
                ))}
              </HStack>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit} size="lg">
              Verify OTP
            </Button>
            <Button variant="ghost" onClick={onClose} size="lg">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isResetPasswordModalOpen && (
        <ResetPasswordModal
          isOpen={isResetPasswordModalOpen}
          onClose={() => setIsResetPasswordModalOpen(false)}
          email={email} 
          otp={otp.join('')} 
        />
      )}
    </>
  );
};