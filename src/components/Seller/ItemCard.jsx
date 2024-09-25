import React, { useState, useContext } from 'react';
import dynamic from 'next/dynamic';
import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  useColorModeValue,
  Icon,
  Button,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  Textarea,
} from '@chakra-ui/react';
import {
  FaHeart,
  FaMapMarkerAlt,
  FaClock,
  FaEdit,
  FaTrash,
  FaMoneyBillWave,
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { ApiContext } from '@/service/ApiContext';


const Slider = dynamic(() => import('react-slick'), { ssr: false });

const ItemCard = ({ item, user = false }) => {
  console.log(item);
  
  const { images, salePrice, adName, location, createdAt, condition, status, _id, name, price} = item;
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adDetails, setAdDetails] = useState({
    adName: adName,
    salePrice: salePrice,
    status,
    location,
    description: item.description || "",
  });
  const { updateAd, deleteAd } = useContext(ApiContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdDetails({ ...adDetails, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await updateAd(_id, adDetails);
      onClose(); 
    } catch (error) {
      console.error('Error updating ad:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAd(_id);
      onClose();
    } catch (error) {
      console.error('Error deleting ad:', error);
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      boxShadow="md"
      bg={useColorModeValue('white', 'gray.800')}
      _hover={{ boxShadow: 'lg' }}
      transition="all 0.3s ease"
    >

      <Box h="180px" w="full" overflow="hidden">
        <Slider {...settings}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={adName}
              objectFit="cover"
              w="full"
              h="180px"
              style={{ display: 'block' }}
            />
          ))}
        </Slider>
      </Box>

      <Box p={4}>
        <Flex justifyContent="space-between" alignItems="center" mb={2}>
          <Text fontSize="lg" fontWeight="bold" color="teal.600">
            Rs {salePrice?.toLocaleString() || price?.toLocaleString()}
          </Text>
          <IconButton
            icon={<Icon as={FaHeart} />}
            variant="outline"
            colorScheme="red"
            aria-label="Add to Wishlist"
            size="sm"
            isRound
          />
        </Flex>

        <Text fontSize="lg" fontWeight="semibold" mb={1}>
          {adName || name}
        </Text>

        <Stack spacing={1} mb={4}>
          <Flex alignItems="center">
            <Icon as={FaMapMarkerAlt} mr={2} color="teal.500" />
            <Text fontSize="sm">{location}</Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={FaClock} mr={2} color="teal.500" />
            <Text fontSize="sm">{formattedDate}</Text>
          </Flex>
          <Flex alignItems="center">
            <Icon as={FaClock} mr={2} color="teal.500" />
            <Text fontSize="sm">{status}</Text>
          </Flex>
          {condition && (
            <Flex alignItems="center">
              <Icon as={FaMoneyBillWave} mr={2} color="teal.500" />
              <Text fontSize="sm">Condition: {condition}</Text>
            </Flex>
          )}
        </Stack>

        {user && (
          <Flex justifyContent="space-between">
          <Button
            leftIcon={<FaEdit />}
            colorScheme="teal"
            variant="outline"
            size="sm"
            onClick={onOpen}
          >
            Edit
          </Button>
          <Button
            leftIcon={<FaTrash />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Flex>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Ad Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3}>
              <Input
                placeholder="Ad Name"
                name="adName"
                value={adDetails.adName}
                onChange={handleChange}
              />
              <Input
                placeholder="Sale Price"
                name="salePrice"
                type="number"
                value={adDetails.salePrice}
                onChange={handleChange}
              />
              <Input
                placeholder="Status"
                name="status"
                value={adDetails.status}
                onChange={handleChange}
              />
              <Input
                placeholder="Location"
                name="location"
                value={adDetails.location}
                onChange={handleChange}
              />
              <Textarea
                placeholder="Description"
                name="description"
                value={adDetails.description}
                onChange={handleChange}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleUpdate}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ItemCard;
