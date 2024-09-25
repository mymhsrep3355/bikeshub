"use client";
import React, { useEffect, useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Container,
  Image,
  Text,
  Heading,
  SimpleGrid,
  Flex,
  Spinner,
  Button,
  Badge,
  useToast,
  Stack,
  Divider,
  useDisclosure,
} from "@chakra-ui/react";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { StoresContext } from "@/service/StoresProvider";
import VehicleCard from "@/components/Seller/VehicleCard";
import SparePartCard from "@/components/Seller/SparePartCard";
import Navbar from "@/components/Custom/Navbar";
import ModalForm from "@/components/Custom/ModalForm";

const StoreDetailsPage = () => {
  const { storeById, fetchStoreDetails, addProductVehicle, userStores } = useContext(StoresContext);
  const router = useRouter();
  const toast = useToast();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  console.log("Store ID:", id);
  const [loading, setLoading] = useState(true);
  const [isUserStore, setIsUserStore] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        setLoading(true);
        await fetchStoreDetails(id);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    setIsUserStore(userStores.some((store) => store._id === id));
  }, [userStores, id]);


  const sparePartFormFields = [
    {
      name: "images",
      label: "Images",
      type: "file",
      accept: "image/*",
      multiple: true,
      isRequired: true,
    },
    { name: "name", label: "Name", type: "text", isRequired: true },
    { name: "usage", label: "Usage", type: "text", isRequired: true },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      isRequired: true,
    },
    // { name: "storeId", label: "Store ID", type: "hidden", value: id },
    { name: "price", label: "Price", type: "number", isRequired: true },
  ];
  const vehicleFormFields = [
    {
      name: "images",
      label: "Images",
      type: "file",
      accept: "image/*",
      multiple: true,
      isRequired: true,
    },
    { name: "name", label: "Name", type: "text", isRequired: true },
    { name: "location", label: "Location", type: "text", isRequired: true },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      isRequired: true,
    },
    // { name: "storeId", label: "Store ID", type: "hidden", value: id },
    { name: "price", label: "Price", type: "number", isRequired: true },
    { name: "company", label: "Company", type: "text", isRequired: true },
    { name: "year", label: "Year", type: "number", isRequired: true },
    { name: "model", label: "Model", type: "text", isRequired: true },
  ];

  const handleAddVehicle = async (data) => {
    try {
      if (modalType === "Add vehicle") {
        await addProductVehicle(data, id);
      } else if (modalType === "Add spare part") {
        await addSpareParts(data, id);
      }
      
      toast({
        title: "Success",
        description: "Vehicle added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast({
        title: "Error",
        description: "Failed to add vehicle",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  if (loading) {
    return (
      <Container maxW="7xl" py={6}>
        <Flex justify="center" alignItems="center" height="50vh">
          <Spinner size="xl" color="teal.500" />
        </Flex>
      </Container>
    );
  }

  if (!storeById) {
    return (
      <Container maxW="7xl" py={6}>
        <Text fontSize="lg" color="red.500">
          Store not found.
        </Text>
      </Container>
    );
  }

  return (
    <>
      <Navbar userType={"seller"} />
      <Container maxW="7xl" py={8}>
        <Button
          leftIcon={<FaArrowLeft />}
          onClick={() => router.back()}
          mb={6}
          colorScheme="teal"
          variant="solid"
          size="md"
        >
          Back to Stores
        </Button>


        <Box
          mb={12}
          p={6}
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          textAlign="center"
          overflow="hidden"
        >
          <Image
            src={
              storeById.store?.images || "https://via.placeholder.com/800x400"
            }
            alt={storeById.store?.name}
            w="100%"
            h={{ base: "250px", md: "300px" }}
            objectFit="cover"
            borderRadius="md"
          />
          <Box mt={4}>
            <Heading as="h1" size="xl" color="teal.700" mb={2}>
              {storeById.store?.name}
            </Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              {storeById.store?.description}
            </Text>
            <Badge
              colorScheme="teal"
              fontSize="md"
              px={4}
              py={1}
              borderRadius="full"
            >
              Total Products:{" "}
              {storeById.vehicles.length + storeById.spareParts.length}
            </Badge>
          </Box>
        </Box>

        {isUserStore && (
          <Flex mb={12} justify="flex-end">
            <Button
              leftIcon={<FaPlusCircle />}
              colorScheme="teal"
              onClick={() => {
                setModalType("addVehicle");
                onOpen();
              }}
              mr={4}
            >
              Add Vehicle
            </Button>
            <Button
              leftIcon={<FaPlusCircle />}
              colorScheme="teal"
              onClick={() => {
                setModalType("addSparePart");
                onOpen();
              }}
            >
              Add Spare Part
            </Button>
          </Flex>
        )}

        <Box mb={12}>
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h2" size="lg" color="teal.700">
              Vehicles
            </Heading>
            <Divider borderColor="teal.300" w="full" />
          </Flex>
          {storeById.vehicles?.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
              {storeById.vehicles.map((vehicle) => (
                <Box
                  key={vehicle._id}
                  bg="white"
                  p={4}
                  borderRadius="md"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.3s ease"
                >
                  <VehicleCard vehicle={vehicle} />
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Flex justify="center" p={6}>
              <Text fontSize="md" color="gray.500">
                No vehicles available at the moment.
              </Text>
            </Flex>
          )}
        </Box>

        <Box mb={12}>
          <Flex justifyContent="space-between" alignItems="center" mb={4}>
            <Heading as="h2" size="lg" color="teal.700">
              Spare Parts
            </Heading>
            <Divider borderColor="teal.300" w="full" />
          </Flex>
          {storeById.spareParts?.length > 0 ? (
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
              {storeById.spareParts.map((sparePart) => (
                <Box
                  key={sparePart._id}
                  bg="white"
                  p={4}
                  borderRadius="md"
                  boxShadow="sm"
                  _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.3s ease"
                >
                  <SparePartCard sparePart={sparePart} />
                </Box>
              ))}
            </SimpleGrid>
          ) : (
            <Flex justify="center" p={6}>
              <Text fontSize="md" color="gray.500">
                No spare parts available at the moment.
              </Text>
            </Flex>
          )}
        </Box>

        <ModalForm
          isOpen={isOpen}
          onClose={onClose}
          formFields={modalType === "addVehicle" ? vehicleFormFields : sparePartFormFields}
          formTitle={modalType === "addVehicle" ? "Add Vehicle" : "Add Spare Part"}
          onSubmit={handleAddVehicle}
        />
      </Container>
    </>
  );
};

export default StoreDetailsPage;
