import React from 'react';
import { Box, Button, Icon, Text, Flex } from '@chakra-ui/react';

const CreateButton = ({ buttonText, icon, onClick }) => {
  return (
    <Flex justify="center" align="center" mt={5}>

      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        p="2px"
        bgGradient="linear(to-r, yellow.400, teal.300, blue.400)"
        _hover={{
          bgGradient: 'linear(to-r, yellow.300, teal.200, blue.300)',
          transform: 'scale(1.05)',
        }}
        transition="all 0.3s ease-in-out"
        onClick={onClick} 
        cursor="pointer"
      >
        <Button
          variant="unstyled"
          bg="white"
          borderRadius="full"
          px={6}
          py={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          _hover={{
            bg: 'gray.100',
          }}
        >
          <Icon as={icon} color="teal.800" boxSize={4} mr={2} />
          <Text fontWeight="bold" fontSize="lg" color="teal.800">
            {buttonText}
          </Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default CreateButton;
