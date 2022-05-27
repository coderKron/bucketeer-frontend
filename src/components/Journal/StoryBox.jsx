import React, {useContext} from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Button,
  useColorModeValue as mode,
  Container,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useUpdateStorysFromJournal } from '../../hooks/useUpdateStorysFromJournal';
import { AuthContext } from '../../context/auth.context';


export function StoryBox(props) {
  const { story, journalId, rootProps } = props;
  const { title, kick, content, pictures, _id, createdBy } = story;
  const { updateStorysFromJournal } = useUpdateStorysFromJournal();
  const {isLoggedIn, user} = useContext(AuthContext);

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  const handleDeleteStory = e => {
    e.preventDefault();
    updateStorysFromJournal({ journalId, storyId: _id });
  };

  return (
    <Container maxW={'7xl'} p="12">
      <Box
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
      >
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
            maxWidth={{ base: '90%' }}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%"
          >
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {isMobile ? (
                <Image
                  width="15rem"
                  height="full"
                  borderRadius="lg"
                  src={pictures}
                  alt="a picture"
                  objectFit="contain"
                />
              ) : (
                <Image
                  src={pictures}
                  alt={'a picture'}
                  width="full"
                  height="15rem"
                  objectFit="cover"
                  transition="all 0.2s"
                  _groupHover={{
                    transform: 'scale(1.05)',
                  }}
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
          marginTop={{ base: '3', sm: '0' }}
        >
          <Heading marginTop="1">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {title}
            </Link>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={mode('gray.700', 'gray.200')}
          >
            {content}
          </Text>
          {isLoggedIn ? (
            <>
            {createdBy === user._id ? 
            (
            <Stack
            alignItems={"center"}>
            <Button
              onClick={handleDeleteStory}
              backgroundColor={mode('red.500', 'red.800')}
              color={mode('white', 'white')}
              variant={'solid'}
            >
              Delete Story
            </Button>
          </Stack>

            ) : 
            <></>}
            </>
          )
          : <></>
          }
         
        </Box>
      </Box>
    </Container>
  );
}
