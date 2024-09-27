import React, { useContext, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Tooltip,
  Spacer,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  FaCar,
  FaDashcube,
  FaPhone,
  FaStore,
  FaSignOutAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { MdBusiness, MdEmail, MdPerson } from "react-icons/md";
import { AuthContext } from "@/service/AuthProvider";
import CartCard from "./CartCard";


const Navbar = ({ userType }) => {
  const router = useRouter();
  const { logout, user } = useContext(AuthContext);


  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Yamaha ybr 125",
      location: "Ravi Road, Lahore",
      price: 170000,
      image: "https://example.com/bike.jpg", 
    },
    {
      id: 2,
      name: "Honda CD 70",
      location: "Mall Road, Lahore",
      price: 85000,
      image: "https://example.com/honda.jpg", 
    },
  ]);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
  };


  const handleRemoveFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <Box
      py={4}
      px={8}
      bg={useColorModeValue("teal.500", "teal.700")}
      borderBottom="2px solid"
      borderColor="teal.600"
      boxShadow="lg"
    >
      <Flex alignItems="center" justify="space-between">

        <HStack spacing={8} align="center">
          <Text
            fontWeight="bold"
            fontSize="2xl"
            color="white"
            cursor="pointer"
            onClick={() => handleNavigation("/Seller")}
          >
            BikesHub
          </Text>

          {userType === "seller" && (
            <HStack spacing={6}>
              <Tooltip label="Dashboard" fontSize="sm">
                <IconButton
                  icon={<FaDashcube size="24px" />}
                  aria-label="Dashboard"
                  variant="ghost"
                  colorScheme="teal"
                  color="white"
                  isRound
                  size="lg"
                  onClick={() => handleNavigation("/Seller")}
                />
              </Tooltip>

              <Tooltip label="My Stores" fontSize="sm">
                <IconButton
                  icon={<FaStore size="24px" />}
                  aria-label="My Stores"
                  variant="ghost"
                  colorScheme="teal"
                  color="white"
                  isRound
                  size="lg"
                  onClick={() => handleNavigation("/stores")}
                />
              </Tooltip>

              <Tooltip label="Ads" fontSize="sm">
                <IconButton
                  icon={<FaCar size="24px" />}
                  aria-label="Ads"
                  variant="ghost"
                  colorScheme="teal"
                  color="white"
                  isRound
                  size="lg"
                  onClick={() => handleNavigation("/ads")}
                />
              </Tooltip>

              <Tooltip label="Chats" fontSize="sm">
                <IconButton
                  icon={<FaPhone size="24px" />}
                  aria-label="Chats"
                  variant="ghost"
                  colorScheme="teal"
                  color="white"
                  isRound
                  size="lg"
                  onClick={() => handleNavigation("/chats")}
                />
              </Tooltip>
            </HStack>
          )}

          {userType === "buyer" && (
            <HStack spacing={6}>
              <Tooltip label="Stores" fontSize="sm">
                <IconButton
                  icon={<MdBusiness size="24px" />}
                  aria-label="Stores"
                  variant="ghost"
                  colorScheme="teal"
                  color="white"
                  isRound
                  size="lg"
                  onClick={() => handleNavigation("/stores")}
                />
              </Tooltip>

              <Tooltip label="Ads" fontSize="sm">
                <IconButton
                  icon={<FaCar size="24px" />}
                  aria-label="Ads"
                  variant="ghost"
                  colorScheme="teal"
                  color="white"
                  isRound
                  size="lg"
                  onClick={() => handleNavigation("/ads")}
                />
              </Tooltip>
            </HStack>
          )}
        </HStack>

        <Flex alignItems="center">
        
          <Menu>
            <MenuButton
              as={IconButton}
              icon={
                <Box position="relative">
                  <FaShoppingCart size="24px" />
                  {cartItems.length > 0 && (
                    <Badge
                      colorScheme="red"
                      position="absolute"
                      top="-1"
                      right="-1"
                      borderRadius="full"
                      boxSize="20px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                </Box>
              }
              aria-label="Cart"
              variant="ghost"
              colorScheme="teal"
              size="lg"
            />
            <MenuList maxW="sm" p={4} boxShadow="lg" overflowY="auto" maxH="400px">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveFromCart}
                  />
                ))
              ) : (
                <Text textAlign="center" p={4}>
                  No items in cart.
                </Text>
              )}
            </MenuList>
          </Menu>

          {/* User Profile and Logout */}
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<Avatar size="sm" name={user?.username} bg="white" color="teal.500" />}
              variant="ghost"
              _hover={{ bg: "teal.600" }}
              _active={{ bg: "teal.700" }}
              ml={4}
            />
            <MenuList boxShadow="lg" borderColor="teal.400">
              <Box p={4} textAlign="center" borderBottom="1px solid" borderColor="gray.200">
                <Avatar size="lg" bg="teal.500" mb={2} name={user?.username} />
                <Text fontWeight="bold" color="teal.600" fontSize="lg">
                  {user?.username}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {user?.userType}
                </Text>
              </Box>
              <MenuDivider />

              <MenuItem icon={<MdPerson size="18px" />} _hover={{ bg: "teal.50" }}>
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  Username: {user?.username}
                </Text>
              </MenuItem>
              <MenuItem icon={<MdEmail size="18px" />} _hover={{ bg: "teal.50" }}>
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  Email: {user?.email}
                </Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem
                icon={<FaSignOutAlt size="18px" />}
                _hover={{ bg: "red.50", color: "red.600" }}
                onClick={handleLogout}
              >
                <Text fontWeight="bold">Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
