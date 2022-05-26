import React from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
  useBreakpointValue} from '@chakra-ui/react';


export function StoryBox(props){
    const { story, journalId, rootProps } = props;
    const { title, kick, content, pictures, timestamps } = story;

    const isMobile = useBreakpointValue({
      base: true,
      md: false,
    });
  

  return (
    <Container maxW={'7xl'} p="12">
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="space-between">
        <Box
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          >
          <Box
          
           maxWidth={{ base: '90%'}}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {isMobile ? (
                <Image
                width="15rem"
                height= "full"
                
                borderRadius="lg"
                src={pictures}
                alt="a picture"
                objectFit="contain"
              />
              ):(
                <Image
                width="25rem"
                height= "auto"
                borderRadius="lg"
                src={pictures}
                alt="a picture"
                objectFit="contain"
              />
              )}
            </Link>
          </Box>
        </Box> 
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          textAlign="center"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {title}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            >
            {content}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

