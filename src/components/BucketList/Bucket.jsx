import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  SimpleGrid,
  useColorModeValue as mode,
  Stack,
  Text,
  Alert,
  AlertIcon,
  ListItem,
  AlertDescription,
  UnorderedList,
  AlertTitle,
  useBreakpointValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { useGetBuckets } from '../../hooks/useGetBuckets';
import Loading from '../Loading';
import { NavLink } from 'react-router-dom';

const Buckets = () => {
  const { buckets, loading, error, errorMessage } = useGetBuckets();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  return (
    <>
      <Image src="/images/Experience-Freedom.png" alt="experience freedom" />
      <Box
        backgroundColor={mode('white.100')}
        bg="bg-surface"
        color={mode('black')}
      >
        <Container
          justifyContent={'center'}
          maxWidth={'100%'}
          py={{
            base: '16',
            md: '24',
          }}
        >
          <Stack
            justifyContent={'center'}
            spacing={{
              base: '12',
              md: '16',
            }}
          >
            <Stack
              justifyContent={'center'}
              alignItems="center"
              direction="column"
              justify="space-between"
            >
              <Heading>Your Buckets</Heading>
              <Stack direction={'row'}>
                <Button
                  as={NavLink}
                  to="/buckets/create"
                  variant={'solid'}
                  backgroundColor={mode('orange.500', 'blue.600')}
                >
                  Create new Bucket
                </Button>
                <Button
                  backgroundColor={mode('orange.500', 'blue.600')}
                  as={NavLink}
                  to="/kicks"
                  variant="solid"
                >
                  Go to Kicks
                </Button>
              </Stack>
            </Stack>
            <SimpleGrid
              padding={'5px'}
              justifyContent={'center'}
              columns={{
                base: 1,
                md: 2,
                lg: 2,
              }}
              gap={{
                base: '12',
                lg: '8',
              }}
            >
              {loading ? (
                <Loading />
              ) : error ? (
                <Alert
                  textAlign={'center'}
                  justifyContent={'center'}
                  status="error"
                >
                  <AlertIcon />
                  <AlertTitle>Could not Login:</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              ) : buckets.length ? (
                buckets.map(post => (
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.200', 'teal.700')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'white')}
                    key={post._id}
                  >
                    <Link
                      as={NavLink}
                      to={`/buckets/${post._id}`}
                      _hover={{
                        textDecor: 'none',
                      }}
                      role="group"
                    >
                      <Stack spacing="8">
                        <Box overflow="hidden">
                          <Image
                            src={post.picture}
                            alt={post.name}
                            width="full"
                            height="15rem"
                            objectFit="cover"
                            transition="all 0.2s"
                            _groupHover={{
                              transform: 'scale(1.05)',
                            }}
                          />
                        </Box>
                        <Stack
                          justifyContent={'space-around'}
                          flexDirection={'row'}
                          spacing="3"
                        >
                          <Stack maxW={'80%'} spacing="3">
                            <Heading size="medium">{post.name}</Heading>
                            <Text maxW={'80%'} color="muted">
                              {post.description}
                            </Text>
                          </Stack>
                          <Stack>
                            <Text fontWeight={'semibold'}>Kicks</Text>
                            <UnorderedList>
                              {post.kicks?.map(kick => {
                                return (
                                  <ListItem key={kick._id}>
                                    {kick.name}
                                  </ListItem>
                                );
                              })}
                            </UnorderedList>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Link>
                  </Box>
                ))
              ) : (
                <>
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.200', 'white')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'black')}
                  >
                    <Stack spacing="8">
                      <Box overflow="hidden">
                        <Image
                          src="/images/schotland-bucket.jpeg"
                          alt="schotland bucket picture"
                          width="full"
                          height="15rem"
                          objectFit="cover"
                          transition="all 0.2s"
                          _groupHover={{
                            transform: 'scale(1.05)',
                          }}
                        />
                      </Box>
                      <Stack
                        justifyContent={'space-around'}
                        flexDirection={'row'}
                        spacing="3"
                      >
                        <Stack spacing="3">
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="accent"
                          ></Text>
                          <Heading size="xs">
                            Example Bucket: Schotland!
                          </Heading>
                          <Text color="muted">
                            Travel through the most amazing parts of Schotland
                            on a moterbike
                          </Text>
                        </Stack>
                        <Button
                          backgroundColor={mode('black', 'gray.700')}
                          color={mode('white', 'white')}
                          colorScheme={mode('white', 'black')}
                          variant={'solid'}
                        >
                          <NavLink to="/bucket/create">Details</NavLink>
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.200', 'white')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'black')}
                  >
                    <Stack spacing="8">
                      <Box overflow="hidden">
                        <Image
                          src="/images/italy-bucket.jpeg"
                          alt="italy bucket picture"
                          width="full"
                          height="15rem"
                          objectFit="cover"
                          transition="all 0.2s"
                          _groupHover={{
                            transform: 'scale(1.05)',
                          }}
                        />
                      </Box>
                      <Stack
                        justifyContent={'space-around'}
                        flexDirection={'row'}
                        spacing="3"
                      >
                        <Stack spacing="3">
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="accent"
                          ></Text>
                          <Heading size="xs">Example Bucket: Italy!</Heading>
                          <Text color="muted">
                            Visiting every restaurant in Venice is a something
                            I've always wanted to do!
                          </Text>
                        </Stack>
                        <Button
                          backgroundColor={mode('black', 'gray.700')}
                          color={mode('white', 'white')}
                          colorScheme={mode('white', 'black')}
                          variant={'solid'}
                        >
                          <NavLink to="/bucket/create">Details</NavLink>
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </>
              )}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Buckets;
