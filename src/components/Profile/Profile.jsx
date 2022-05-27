import axios from 'axios';
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Container,
  useBreakpointValue as breakpoint,
  HStack,
  SimpleGrid,
  Divider,
  Input,
  Skeleton,
  Image,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { CardContent } from './CardContent';
import { CardWithAvatar } from './CardWithAvatar';

import { AuthContext } from '../../context/auth.context';
import { Link, useNavigate, NavLink, useParams } from 'react-router-dom';
import { useGetBuckets } from '../../hooks/useGetBuckets';
import Loading from '../Loading';
import { useGetAllJournals } from '../../hooks/useGetAllJournals';

const Profile = () => {
  const { isLoggedIn, getToken, user, isLoading } =
    React.useContext(AuthContext);
  const { buckets, loading, error, errorMessage } = useGetBuckets();
  const { journal } = useGetAllJournals();
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(null);

  const [email, setEmail] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [way, setWay] = React.useState(null);
  const [tagline, setTagline] = React.useState(null);
  const { userId } = useParams();

  React.useEffect(() => {
    const storedToken = getToken();
    axios
      .get(`${process.env.REACT_APP_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setEmail(response.data.email);
        setUserName(response.data.userName);
        setTagline(response.data.tagline);
        setWay(response.data.way);
        setProfilePicture(response.data.profilePicture);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <>
      {isLoggedIn ? (
        <>
          <Box
            as="section"
            pt="20"
            pb="12"
            position="relative"
            backgroundColor={mode('gray.100', 'gray.700')}
          >
            <Box
              position="absolute"
              inset="0"
              height="32"
              backgroundImage={'/images/profile-banner.png'}
            />
            <CardWithAvatar
              backgroundColor={mode('orange.50', 'teal.600')}
              maxW="xl"
              avatarProps={{
                src: `${profilePicture}`,
                name: `${userName}`,
              }}
              action={
                <Button
                  as={NavLink}
                  to={`/user/${user._id}/edit`}
                  size="sm"
                  leftIcon={<HiPencilAlt />}
                >
                  Edit
                </Button>
              }
            >
              <CardContent>
                <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
                  {userName}
                </Heading>
                <Text>Way: {way}</Text>
                <Text color={mode('gray.600', 'gray.400')}>{tagline}</Text>
              </CardContent>
            </CardWithAvatar>
          </Box>
          <Box bg="bg-surface" backgroundColor={mode('gray.100')}>
            <Container
              py={{
                base: '4',
                md: '8',
              }}
            >
              <HStack>
                <Divider />
                <Text fontSize="lg" fontWeight="medium" whiteSpace="nowrap">
                  Buckets
                </Text>
                <Divider />
              </HStack>
            </Container>
          </Box>
          <Container
            backgroundColor={mode('gray.100')}
            maxW={'100%'}
            py={{
              base: '16',
              md: '24',
            }}
          >
            <Stack
              spacing={{
                base: '16',
                md: '24',
              }}
            >
              <Stack
                spacing={{
                  base: '8',
                  md: '10',
                }}
                align="center"
              >
                <Stack
                  spacing={{
                    base: '4',
                    md: '6',
                  }}
                  textAlign="center"
                >
                  <Stack spacing="4">
                    <Text
                      fontWeight="semibold"
                      color="accent"
                      fontSize={{
                        base: 'sm',
                        md: 'md',
                      }}
                    >
                      Your Buckets
                    </Text>
                    <Heading
                      size={breakpoint({
                        base: 'md',
                        md: 'lg',
                      })}
                    >
                      Your first 3 Buckets ... Ever!
                    </Heading>
                  </Stack>
                  <Text
                    fontSize={{
                      base: 'lg',
                      md: 'xl',
                    }}
                    maxW="2xl"
                    color="muted"
                  >
                    Catch up on what you missed or subscribe to our newsletter
                  </Text>
                </Stack>
              </Stack>
              <SimpleGrid
                columns={{
                  base: 1,
                  md: 2,
                  lg: 3,
                }}
                rowGap={{
                  base: '8',
                  md: '12',
                }}
                columnGap="8"
              >
                {buckets?.slice(0, 3).map(post => (
                  <Box
                    backgroundColor={mode('orange.100', 'teal.400')}
                    borderRadius="lg"
                    p="6"
                    bg="bg-surface"
                    boxShadow={mode('lg', 'lg-dark')}
                    _groupHover={{
                      boxShadow: mode('xl', 'xl-dark'),
                    }}
                    transition="all 0.2s"
                    height="full"
                  >
                    <Stack
                      spacing={{
                        base: '8',
                        lg: '16',
                      }}
                      justify="space-between"
                      height="full"
                    >
                      <Stack spacing="8">
                        <Box overflow="hidden">
                          <Image
                            src={post.picture}
                            alt={post.name}
                            width="full"
                            height="15rem"
                            objectFit="cover"
                          />
                        </Box>
                        <Stack spacing="3">
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="accent"
                          >
                            {post.user?.userName}
                          </Text>
                          <Heading size="xs">{post.title}</Heading>
                          <Text color="muted">{post.description}</Text>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
          <Box bg="bg-surface">
            <Container
              py={{
                base: '4',
                md: '8',
              }}
            >
              <HStack>
                <Divider />
                <Text fontSize="lg" fontWeight="medium" whiteSpace="nowrap">
                  Journals
                </Text>
                <Divider />
              </HStack>
            </Container>
          </Box>
          <Container
            backgroundColor={mode('white', 'gray.700')}
            maxW={'100%'}
            py={{
              base: '16',
              md: '24',
            }}
          >
            <Stack
              spacing={{
                base: '16',
                md: '24',
              }}
            >
              <Stack
                spacing={{
                  base: '8',
                  md: '10',
                }}
                align="center"
              >
                <Stack
                  spacing={{
                    base: '4',
                    md: '6',
                  }}
                  textAlign="center"
                >
                  <Stack spacing="4">
                    <Text
                      fontWeight="semibold"
                      color="accent"
                      fontSize={{
                        base: 'sm',
                        md: 'md',
                      }}
                    >
                      Your Journals
                    </Text>
                    <Heading
                      size={breakpoint({
                        base: 'md',
                        md: 'lg',
                      })}
                    >
                      The first 3 Journals created by you!
                    </Heading>
                  </Stack>
                  <Text
                    fontSize={{
                      base: 'lg',
                      md: 'xl',
                    }}
                    maxW="2xl"
                    color="muted"
                  >
                    Have a look at the amazing Journals you have created!
                  </Text>
                </Stack>
              </Stack>
              <SimpleGrid
                columns={{
                  base: 1,
                  md: 2,
                  lg: 3,
                }}
                rowGap={{
                  base: '8',
                  md: '12',
                }}
                columnGap="8"
              >
                {journal?.slice(0, 3).map(post => (
                  <Box
                    backgroundColor={mode('orange.100', 'teal.400')}
                    borderRadius="lg"
                    p="6"
                    bg="bg-surface"
                    boxShadow={mode('lg', 'lg-dark')}
                    _groupHover={{
                      boxShadow: mode('xl', 'xl-dark'),
                    }}
                    transition="all 0.2s"
                    height="full"
                  >
                    <Stack
                      spacing={{
                        base: '8',
                        lg: '16',
                      }}
                      justify="space-between"
                      height="full"
                    >
                      <HStack marginBottom={'5px'} justifyContent={'center'}>
                        {post.story?.slice(0, 3).map(element => {
                          return (
                            <Stack spacing="5px">
                              <Box>
                                <Image
                                  boxSize="150"
                                  src={element.pictures}
                                  alt={element.title}
                                  fallback={<Skeleton />}
                                />
                              </Box>
                            </Stack>
                          );
                        })}
                      </HStack>
                      <Stack spacing="3">
                        <Heading size="xs">Title: {post.title}</Heading>
                        <Text color="muted">{post.description}</Text>
                      </Stack>
                    </Stack>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Container>
        </>
      ) : (
        navigate('/login')
      )}
    </>
  );
};

export default Profile;
