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
  AlertDescription,
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
              <NavLink to="/bucket/create">
                <Button variant={'solid'} backgroundColor={mode('orange.200')}>
                  Create new Bucket
                </Button>
              </NavLink>
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
                    backgroundColor={mode('orange.200', 'white')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'black')}
                  >
                    <Link
                      _hover={{
                        textDecor: 'none',
                      }}
                      role="group"
                    >
                      <Stack key={post._id} spacing="8">
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
                          <Stack spacing="3">
                            <Text
                              fontSize="sm"
                              fontWeight="semibold"
                              color="accent"
                            >
                              {post.category}
                            </Text>
                            <Heading size="xs">{post.name}</Heading>
                            <Text color="muted">{post.description}</Text>
                          </Stack>
                          <Button
                            backgroundColor={mode('black', 'gray.700')}
                            color={mode('white', 'white')}
                            colorScheme={mode('white', 'black')}
                            variant={'solid'}
                          >
                            <NavLink to={`/bucket/${post._id}`}>
                              Details
                            </NavLink>
                          </Button>
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
