import React, { useContext } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Spacer,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaCar, FaDashcube, FaPhone, FaStore } from "react-icons/fa";
import { MdBusiness, MdPerson } from "react-icons/md";
import { AuthContext } from "@/service/AuthProvider";

const Navbar = ({ userType }) => {
  const router = useRouter();
  const {logout} = useContext(AuthContext);
  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleLogout = () => {
    logout();
  };  

  return (
    <Box
      py={4}
      px={8}
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      boxShadow="sm"
    >
      <Flex alignItems="center">
        <HStack spacing={8}>
          <Text
            fontWeight="bold"
            fontSize="2xl"
            color="teal.600"
            cursor="pointer"
            onClick={() => handleNavigation("/Seller")}
          >
            BikesHub
          </Text>

          {userType === "seller" && (
            <HStack spacing={6}>
              <Flex
                align="center"
                direction="column"
                cursor="pointer"
                onClick={() => handleNavigation("/Seller")}
              >
                <IconButton
                  icon={<FaDashcube size="24px" />}
                  aria-label="My Stores"
                  variant="ghost"
                  colorScheme="teal"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  Seller
                </Text>
              </Flex>
              <Flex
                align="center"
                direction="column"
                cursor="pointer"
                onClick={() => handleNavigation("/stores")}
              >
                <IconButton
                  icon={<FaStore size="24px" />}
                  aria-label="My Stores"
                  variant="ghost"
                  colorScheme="teal"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  My Stores
                </Text>
              </Flex>
              <Flex
                align="center"
                direction="column"
                cursor="pointer"
                onClick={() => handleNavigation("/ads")}
              >
                <IconButton
                  icon={<FaCar size="24px" />}
                  aria-label="Ads"
                  variant="ghost"
                  colorScheme="teal"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  Ads
                </Text>
              </Flex>
              <Flex
                align="center"
                direction="column"
                cursor="pointer"
                onClick={() => handleNavigation("/chats")}
              >
                <IconButton
                  icon={<FaPhone size="24px" />}
                  aria-label="Chats"
                  variant="ghost"
                  colorScheme="teal"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  Chats
                </Text>
              </Flex>
            </HStack>
          )}

          {/* Buyer Links */}
          {userType === "buyer" && (
            <HStack spacing={6}>
              <Flex
                align="center"
                direction="column"
                cursor="pointer"
                onClick={() => handleNavigation("/stores")}
              >
                <IconButton
                  icon={<MdBusiness size="24px" />}
                  aria-label="Stores"
                  variant="ghost"
                  colorScheme="teal"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  Stores
                </Text>
              </Flex>
              <Flex
                align="center"
                direction="column"
                cursor="pointer"
                onClick={() => handleNavigation("/ads")}
              >
                <IconButton
                  icon={<FaCar size="24px" />}
                  aria-label="Ads"
                  variant="ghost"
                  colorScheme="teal"
                  isRound
                  size="lg"
                />
                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                  Ads
                </Text>
              </Flex>
            </HStack>
          )}
        </HStack>

        <Spacer />


        <Menu>
          <MenuButton as={IconButton} icon={<Avatar size="sm" bg="teal.500" />} />
          <MenuList>
            <MenuItem onClick={() => handleNavigation("/profile")}>
              <MdPerson size="18px" style={{ marginRight: "8px" }} />
              Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => handleLogout()}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;
