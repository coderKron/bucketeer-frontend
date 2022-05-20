import React from 'react';

import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  useColorModeValue as mode,
} from '@chakra-ui/react';

export default function Loading() {
  return (
    <div>
      <Box textAlign="center" py={10} px={6}>
        <Box display="inline-block">
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rounded={'50px'}
            w={'55px'}
            h={'55px'}
            textAlign="center"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.300"
              color={mode('#ff6767', 'white')}
              size="xl"
            />
          </Flex>
        </Box>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          You're travels are incoming
        </Heading>
      </Box>
    </div>
  );
}
