import {
  Box,
  Flex,
  Img,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';

export const Testimonial = props => {
  const { children, image, name, role } = props;
  return (
    <Box
      as="blockquote"
      rounded="2xl"
      bg={mode('orange.300', 'teal.800')}
      color={mode('white', 'white')}
      shadow="lg"
      px="10"
      py="8"
    >
      <Flex mb="6">
        <Img
          mt="-12"
          bg={mode('gray.700', 'white')}
          objectFit="cover"
          w="24"
          h="24"
          rounded="full"
          color={mode('gray.700', 'white')}
          shadow="0 0 0 10px currentColor"
          src={image}
          alt={name}
        />
        <Box marginStart="5">
          <Text
            color={mode('white', 'white')}
            as="cite"
            fontStyle="normal"
            fontSize="md"
            fontWeight="extrabold"
          >
            {name}
          </Text>
          <Text
            mt="1"
            color={mode('white', 'white')}
            textTransform="uppercase"
            fontSize="xs"
            fontWeight="semibold"
            letterSpacing="wide"
          >
            {role}
          </Text>
        </Box>
      </Flex>
      <Text color={mode('gray.100', 'white')}>{children}</Text>
    </Box>
  );
};
