import React, { useContext } from 'react';
import videoBucketeer from '../../videos/adventure.mp4';
import '../../App.css';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  useColorMode,
  useColorModeValue as mode,
  Divider,
  Text,
  HStack,
  Avatar,
  Button,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';
import { CTAButton } from './CTAButton';
import { Feature } from './Feature';
import { Testimonial } from './Testimonial';
import { Link, NavLink } from 'react-router-dom';
import { GiHighKick } from 'react-icons/gi';
import { BsBucket } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';
import { posts } from './data';

function Homepage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoggedIn } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
  const backgroundColorBig = () => {
    if (colorMode === 'light') {
      return 'white';
    } else {
    }
  };
  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <Box p={'0'} minH={'auto'} as="section" width={'100%'}>
          <Container p={'0'} className="App" maxWidth={'100%'}>
            <video autoPlay loop muted>
              <source src={videoBucketeer} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Container>
        </Box>
      )}

      <Box as="section" pb="24">
        <Box
          bg={backgroundColorBig}
          color={mode('red.400', 'white')}
          pt="24"
          pb="12rem"
        >
          <Box
            maxW={{
              base: 'xl',
              md: '7xl',
            }}
            mx="auto"
            px={{
              base: '6',
              md: '8',
            }}
          >
            <Stack
              spacing="10"
              direction={{
                base: 'column',
                lg: 'row',
              }}
              align={{
                base: 'flex-start',
                lg: 'center',
              }}
              justify="space-between"
            >
              <Heading
                size="2xl"
                lineHeight="short"
                fontWeight="extrabold"
                color={mode('#822727', 'white')}
                maxW={{
                  base: 'unset',
                  lg: '800px',
                }}
              >
                Bucketeer: a "way" to find experiences that will bring joy and
                happiness
              </Heading>
              {!isLoggedIn ? (
                <CTAButton
                  backgroundColor={mode('orange.200', 'teal.400')}
                  color="white"
                  as={NavLink}
                  to={'/signup'}
                  w={{
                    base: 'full',
                    md: 'auto',
                  }}
                >
                  Sign up here
                </CTAButton>
              ) : (
                <CTAButton
                  backgroundColor={mode('orange.200', 'teal.400')}
                  color="white"
                  as={NavLink}
                  to={'/buckets'}
                  w={{
                    base: 'full',
                    md: 'auto',
                  }}
                >
                  Go to Buckets
                </CTAButton>
              )}
            </Stack>
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: 4,
              }}
              spacing={{
                base: '12',
                md: '8',
                lg: '2',
              }}
              mt={{
                base: '12',
                md: '20',
              }}
            >
              <Feature
                icon={<BsBucket color={mode('#822727', 'white')} />}
                title="Buckets"
              >
                Create, edit or share your self made (themed) Buckets. Where you
                keep track of all the Kicks you still have to complete!
              </Feature>
              <Feature
                icon={<GiHighKick color={mode('#822727', 'white')} />}
                title="Kicks"
              >
                Create your own personal adventure, chill or travel kicks that
                every user can see or add to their Buckets.
              </Feature>
              <Feature
                icon={<FaUserFriends color={mode('#822727', 'white')} />}
                title="Enlighten"
              >
                Experience first hand how much people love your created Kicks
                and comment on other people's Kicks how much you would love to
                experience them.
              </Feature>
              <Feature
                icon={<FiFileText color={mode('#822727', 'white')} />}
                title="Blog your Experiences"
              >
                After completing your Buckets, write your experiences down. Was
                it as amazing you had anticpated? Or came it short.
              </Feature>
            </SimpleGrid>
          </Box>
        </Box>
        <Box mt="-24">
          <Box
            maxW={{
              base: 'xl',
              md: '7xl',
            }}
            mx="auto"
            px={{
              base: '6',
              md: '8',
            }}
          >
            <SimpleGrid
              spacing="14"
              columns={{
                base: 1,
                lg: 2,
              }}
            >
              <Testimonial
                image="/images/team-picture-ruben.jpeg"
                name="Ruben Poelen"
                role="CFE, Bucketeer"
              >
                The greatest feat anyone can achieve is total, independent
                freedom. No strings except for your loved ones. Going into this
                amazing project I felt that a lot of people had forgotten the
                beauties of the world and were merely focussed on achieving
                their "work goals". So with my friend Louise we made a platform
                where people can share their amazing journeys and experiences,
                so you can one day try them yourself.
              </Testimonial>
              <Testimonial
                image="/images/team-picture-louise2.jpg"
                name="Louise Gabrielle"
                role="CBE, Bucketeer"
              >
                Life is a journey, not a destination. Amongst the wonders and
                chaos of life it is so important to have a sense of freedom, a
                sense of adventure and a direction. So many of us get so stuck
                in the work, sleep, eat, repeat routine, we forget the
                importance of our journeys, dreams and experiences. Combining
                our idea's Ruben and I have created a platform where people can
                share their dreams, journeys, experience and goals. I hope that
                you have many. Smile and laugh as much as you can.
              </Testimonial>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Box backgroundColor={mode('white', 'gray.900')} bg="bg-surface">
        <Container maxWidth={'100%'} py={{ base: '4', md: '8' }}>
          <HStack>
            <Divider />
            <Text fontSize="lg" fontWeight="medium" whiteSpace="nowrap">
              <i> "Become who you're ment to be"</i>
            </Text>
            <Divider />
          </HStack>
        </Container>
      </Box>
      <Box backgroundColor={mode('orange.300', 'gray.900')} bg="bg-surface">
        <Container
          maxWidth={'100%'}
          py={{
            base: '16',
            md: '24',
          }}
        >
          <Stack
            spacing={{
              base: '12',
              md: '16',
            }}
          >
            <Stack direction="row" justify="space-between">
              <Stack
                spacing={{
                  base: '4',
                  md: '5',
                }}
              >
                <Stack spacing="3">
                  <Text
                    color="accent"
                    fontWeight="semibold"
                    fontSize={{
                      base: 'sm',
                      md: 'md',
                    }}
                  >
                    Kicks
                  </Text>
                  <Heading
                    size={useBreakpointValue({
                      base: 'sm',
                      md: 'md',
                    })}
                  >
                    Our top 3 Kicks of the day
                  </Heading>
                </Stack>
                <Text
                  color="muted"
                  fontSize={{
                    base: 'lg',
                    md: 'xl',
                  }}
                >
                  Inspire yourself with a glimpse of experiences that can be
                  yours one day.
                </Text>
              </Stack>
              {!isMobile && (
                <Button
                  backgroundColor={mode('orange.200', 'teal.400')}
                  color="white"
                  as={NavLink}
                  to="/kicks"
                  variant="ghost"
                  size="lg"
                >
                  Show all
                </Button>
              )}
            </Stack>
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: 3,
              }}
              gap={{
                base: '12',
                lg: '8',
              }}
            >
              {posts.map(post => (
                <Link
                  to="/"
                  key={post.id}
                  _hover={{
                    textDecor: 'none',
                  }}
                  role="group"
                >
                  <Stack spacing="8">
                    <Box overflow="hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width="full"
                        height="15rem"
                        objectFit="cover"
                        transition="all 0.2s"
                        _groupHover={{
                          transform: 'scale(1.05)',
                        }}
                      />
                    </Box>
                    <Stack spacing="3">
                      <Text fontSize="sm" fontWeight="semibold" color="accent">
                        {post.category}
                      </Text>
                      <Heading size="xs">{post.title}</Heading>
                      <Text color="muted">{post.excerpt}</Text>
                    </Stack>
                    <HStack>
                      <Avatar src={post.author.avatarUrl} boxSize="10" />
                      <Box fontSize="sm">
                        <Text fontWeight="medium">{post.author.name}</Text>
                        <Text color="muted">{post.publishedAt}</Text>
                      </Box>
                    </HStack>
                  </Stack>
                </Link>
              ))}
            </SimpleGrid>
            {isMobile && (
              <Button
                backgroundColor={mode('orange.700', 'blue.600')}
                as={NavLink}
                to="/kicks"
                variant="primary"
                size="lg"
              >
                Show all
              </Button>
            )}
          </Stack>
        </Container>
        <Box backgroundColor={mode('white', 'gray.900')} bg="bg-surface">
          <Container maxWidth={'100%'} py={{ base: '4', md: '8' }}>
            <HStack>
              <Divider />
              <Text fontSize="lg" fontWeight="medium" whiteSpace="nowrap">
                <i> "Ride on the waves of freedom"</i>
              </Text>
              <Divider />
            </HStack>
          </Container>
        </Box>
      </Box>
    </>
  );
}

export default Homepage;
