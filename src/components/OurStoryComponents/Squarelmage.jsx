import { Box, Img } from '@chakra-ui/react';
import React from 'react';

export const SquareImage = props => (
  <Box pos="relative">
    <Img
      position="relative"
      zIndex="1"
      boxSize={{
        base: '20',
        md: '28',
      }}
      rounded="lg"
      objectFit="cover"
      {...props}
    />
    <Box
      pos="absolute"
      zIndex="0"
      w={{
        base: '20',
        md: '28',
      }}
      top="-1.5"
      left="1.5"
      h="100%"
      bg="bg-accent"
      rounded="lg"
    />
  </Box>
);
