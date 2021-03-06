import { Box, Center, useColorModeValue as mode } from '@chakra-ui/react';
import * as React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

export const CTAButton = props => {
  const { children, ...rest } = props;
  return (
    <Center
      minW="240px"
      as="button"
      px="6"
      color={mode('white', 'white')}
      py="4"
      textTransform="uppercase"
      fontWeight="bold"
      transition="all 0.2s"
      rounded="lg"
      outline={0}
      bg={mode('orange.300', 'red.800')}
      _focus={{
        shadow: 'outline',
      }}
      _active={{
        transform: 'translateY(2px)',
      }}
      _hover={{
        bg: 'blue.700',
      }}
      {...rest}
    >
      {children}
      <Box as={BiRightArrowAlt} ml="2" fontSize="lg" />
    </Center>
  );
};
