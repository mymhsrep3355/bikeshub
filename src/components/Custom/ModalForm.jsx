import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useDisclosure,
  Box,
  VStack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { AuthContext } from '@/service/AuthProvider';

const ModalForm = ({ isOpen, onClose, formFields, formTitle, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const { token } = useContext(AuthContext);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: Array.from(files), 
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (formTitle === 'Post Ad') {
      const { model, brand, year, condition, description, ...rest } = formData;
      const bikeInfo = { model, brand, year, condition, description };
      const structuredData = {
        ...rest,
        bikeInfo, 
      };
      onSubmit(structuredData, token); // Pass structured data and token to the onSubmit function
    } else {
      onSubmit(formData, token); // For other forms, send the formData as is
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {formFields.map((field) => (
                <GridItem key={field.name} colSpan={field.colSpan || 1}>
                  <FormControl isRequired={field.isRequired}>
                    <FormLabel>{field.label}</FormLabel>
                    {field.type === 'textarea' ? (
                      <Textarea
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                      />
                    ) : field.type === 'file' ? (
                      <Input
                        type="file"
                        name={field.name}
                        accept={field.accept}
                        multiple={field.multiple}
                        onChange={handleChange}
                      />
                    ) : field.type === 'select' ? (
                      <Select
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                      >
                        {field.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        onChange={handleChange}
                      />
                    )}
                  </FormControl>
                </GridItem>
              ))}
            </Grid>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleFormSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalForm;
