import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Img,
  Stack,
  Image,
  Container,
  Divider,
  SimpleGrid,
  Avatar,
  useBreakpointValue,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { AuthContext } from '../context/auth.context';
import { members } from './OurStoryComponents/data';
import { SquareImage } from './OurStoryComponents/Squarelmage';

const OurStory = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <>
      <Image src="/images/our-story.png" alt="the journey" />
      <Box backgroundColor={mode('gray.50')} bg="bg-surface">
        <Container py={{ base: '4', md: '8' }}>
          <HStack>
            <Divider />
            <Text fontSize="lg" fontWeight="medium" whiteSpace="nowrap">
              Bucketeers
            </Text>
            <Divider />
          </HStack>
        </Container>
      </Box>
      <Box
        as="section"
        bg={mode('gray.50', 'gray.800')}
        pb="24"
        pos="relative"
        px={{
          base: '6',
          lg: '12',
        }}
      >
        <Box maxW="7xl" mx="auto">
          <Box
            maxW={{
              lg: 'md',
              xl: 'xl',
            }}
            pt={{
              base: '20',
              lg: '40',
            }}
            pb={{
              base: '16',
              lg: '24',
            }}
          >
            <Heading
              as="h1"
              size="3xl"
              lineHeight="1"
              fontWeight="extrabold"
              letterSpacing="tight"
            >
              We want to inspire you{' '}
              <Box
                as="mark"
                color={mode('orange.200', 'teal.300')}
                bg="transparent"
              >
                to start Experiencing.
              </Box>
            </Heading>
            <Text
              mt={4}
              fontSize="xl"
              fontWeight="medium"
              color={mode('gray.600', 'gray.400')}
            >
              Stop living in the future. Stop living in the past. Start living
              in the now. What do YOU want to do NOW!
            </Text>
            <Stack
              direction={{
                base: 'column',
                sm: 'row',
              }}
              spacing="4"
              mt="8"
            >
              <Button
                as={NavLink}
                to="/journey"
                size="lg"
                backgroundColor={mode('orange.200', 'teal.300')}
                height="14"
                px="8"
                fontSize="md"
              >
                Find out more
              </Button>
              <Button
                as={NavLink}
                to={user ? '/buckets/create' : '/signup'}
                size="lg"
                bg="white"
                color="gray.800"
                _hover={{
                  bg: 'gray.50',
                }}
                height="14"
                px="8"
                shadow="base"
                fontSize="md"
              >
                {user ? 'Create Bucket' : 'Sign up already!'}
              </Button>
            </Stack>
          </Box>
        </Box>

        <Box
          pos={{
            lg: 'absolute',
          }}
          insetY={{
            lg: '0',
          }}
          insetEnd={{
            lg: '0',
          }}
          bg="gray.50"
          w={{
            base: 'full',
            lg: '50%',
          }}
          height={{
            base: '96',
            lg: 'full',
          }}
          sx={{
            clipPath: {
              lg: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
            },
          }}
        >
          <Img
            height="100%"
            width="100%"
            objectFit="cover"
            src="/images/bucketeer-story.png"
            alt="story"
          />
        </Box>
      </Box>

      <Container
        backgroundColor={mode('white')}
        maxW={'100%'}
        py={{
          base: '16',
          md: '24',
        }}
      >
        <Box backgroundColor={mode('white')} bg="bg-surface">
          <Container py={{ base: '4', md: '8' }}>
            <HStack>
              <Divider />
              <Text fontSize="lg" fontWeight="medium" whiteSpace="nowrap">
                User stories
              </Text>
              <Divider />
            </HStack>
          </Container>
        </Box>
        <Stack
          spacing={{
            base: '12',
            md: '16',
          }}
        >
          <Stack
            spacing={{
              base: '8',
              md: '10',
            }}
          >
            <Stack spacing="3" align="center" textAlign="center">
              <Text
                fontSize={{
                  base: 'sm',
                  md: 'md',
                }}
                color="accent"
                fontWeight="semibold"
              >
                We're always searching for more Bucketeers
              </Text>
              <Stack
                spacing={{
                  base: '4',
                  md: '5',
                }}
              >
                <Heading
                  size={useBreakpointValue({
                    base: 'sm',
                    md: 'md',
                  })}
                >
                  Meet some of our users
                </Heading>
                <Text
                  fontSize={{
                    base: 'lg',
                    md: 'xl',
                  }}
                  color="muted"
                >
                  And learn about their amazing Experiences.
                </Text>
              </Stack>
            </Stack>
            <Stack
              direction={{
                base: 'column-reverse',
                md: 'row',
              }}
              spacing="3"
              justify="center"
            >
              <Button
                backgroundColor={mode('orange.200', 'teal.300')}
                as={NavLink}
                to="/journey"
                variant="secondary"
                size="lg"
              >
                Learn more
              </Button>
              <Button
                backgroundColor={mode('orange.200', 'teal.300')}
                as={NavLink}
                to="/signup"
                variant="primary"
                size="lg"
              >
                Become a Bucketeer
              </Button>
            </Stack>
          </Stack>
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            columnGap="8"
            rowGap={{
              base: '6',
              md: '8',
              lg: '16',
            }}
          >
            {members.map(member => (
              <Box
                backgroundColor={mode('orange.50')}
                key={member.name}
                bg="bg-surface"
                p="6"
                boxShadow={mode('sm', 'sm-dark')}
                borderRadius="md"
              >
                <Stack spacing="4" align="center" textAlign="center">
                  <Stack>
                    <Stack
                      spacing={{
                        base: '4',
                        md: '5',
                      }}
                      align="center"
                    >
                      <Avatar
                        src={member.image}
                        boxSize={{
                          base: '16',
                          md: '20',
                        }}
                      />
                      <Box>
                        <Text fontWeight="medium" fontSize="lg">
                          {member.name}
                        </Text>
                        <Text color="accent">{member.role}</Text>
                      </Box>
                    </Stack>
                    <Text color="muted">{member.description}</Text>
                  </Stack>
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  );
};

export default OurStory;
