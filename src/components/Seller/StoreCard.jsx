import React from 'react';
import Link from 'next/link';
import { Box, Image, Text, Flex, Badge, useColorModeValue } from '@chakra-ui/react';

const StoreCard = ({ store, isUserStore }) => {
    const { images, name, description, _id } = store;
    const borderColor = isUserStore ? 'teal.500' : useColorModeValue('gray.300', 'gray.700');

    return (
        <Link href={`/stores/${_id}`} passHref>
            <Box
                as="a"
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                borderColor={borderColor}
                boxShadow="md"
                bg={useColorModeValue('white', 'gray.800')}
                _hover={{ boxShadow: 'lg', transform: 'translateY(-5px)' }}
                transition="all 0.3s ease"
                cursor="pointer"
            >
                {images?.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={name}
                        objectFit="cover"
                        w="full"
                        h="180px"
                        style={{ display: 'block' }}
                    />
                ))}
                <Box p={4}>
                    <Text fontSize="lg" fontWeight="bold" color="teal.600" mb={2}>
                        {name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        {description.length > 60 ? `${description.substring(0, 60)}...` : description}
                    </Text>
                    {isUserStore && (
                        <Badge mt={2} colorScheme="teal">
                            My Store
                        </Badge>
                    )}
                </Box>
            </Box>
        </Link>
    );
};

export default StoreCard;
