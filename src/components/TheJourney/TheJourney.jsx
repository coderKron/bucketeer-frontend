import {
  Box,
  Flex,
  Button,
  Center,
  Stack,
  Heading,
  Img,
  SimpleGrid,
  Text,
  Image,
  Container,
  HStack,
  Divider,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import {
  HiBadgeCheck,
  HiChartSquareBar,
  HiCurrencyDollar,
  HiTemplate,
} from 'react-icons/hi';
import {
  FaArrowRight,
  FaFileSignature,
  FaHandsHelping,
  FaHeadset,
} from 'react-icons/fa';
import { HiBriefcase } from 'react-icons/hi';
import { GoCheck } from 'react-icons/go';
import { BiBookBookmark } from 'react-icons/bi';
import { Feature } from './Feature';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const FeatureImage = props => (
  <Box flex="1" {...props}>
    <Img
      objectFit="cover"
      h="100%"
      w="100%"
      src="/images/Whats-ahead.jpeg"
      alt=""
    />
  </Box>
);

const TheJourney = () => {
  const { user } = React.useContext(AuthContext);
  return (
    <>
      <Image src="/images/the-journey.png" alt="the journey" />
      <Box as="section" bg={mode('white', 'gray.800')} py="24">
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
                Believe
              </Text>
              <Divider />
            </HStack>
          </Container>
        </Box>
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
          <Flex
            justify="space-between"
            direction={{
              base: 'column',
              lg: 'row',
            }}
          >
            <Box
              maxW={{
                lg: 'lg',
              }}
            >
              <Box
                mb={{
                  lg: '8rem',
                }}
              >
                <Heading
                  lineHeight="shorter"
                  size="2xl"
                  letterSpacing="tight"
                  color={mode('gray.900', 'white')}
                  fontWeight="extrabold"
                >
                  Experience — <br />
                  <Box as="span" color={mode('orange.200', 'teal.400')}>
                    everything
                  </Box>
                </Heading>
                <Text
                  mt="4"
                  fontSize="2xl"
                  color={mode('gray.600', 'gray.400')}
                  maxW={{
                    lg: 'md',
                  }}
                >
                  Try not to invest on what is behind or ahead. Instead invest
                  in what is now.
                </Text>
              </Box>
              <FeatureImage
                my={{
                  base: '14',
                  lg: '0',
                }}
                display={{
                  base: 'block',
                  lg: 'none',
                }}
              />
              <SimpleGrid
                flex="1"
                columns={{
                  base: 1,
                  md: 2,
                }}
                spacing={{
                  base: '3rem',
                  md: '2rem',
                }}
              >
                <Feature
                  title="Order fulfillment"
                  icon={<HiBadgeCheck color={mode('orange', 'teal')} />}
                >
                  You will feel more fulfillment when you enjoy of the now.
                </Feature>
                <Feature
                  title="Return Investment"
                  icon={<HiCurrencyDollar color={mode('orange', 'teal')} />}
                >
                  Investing not in items or objects but in Experiences and
                  stories will pay more dividend.
                </Feature>
                <Feature
                  title="Happiness Comes"
                  icon={<HiChartSquareBar color={mode('orange', 'teal')} />}
                >
                  With every Experience you will grow as a person.
                </Feature>
                <Feature
                  title="Enlighten"
                  icon={<HiTemplate color={mode('orange', 'teal')} />}
                >
                  When the 'dust' has settled and you have realised the meaning
                  of life. You can help other achieve happiness and fulfillment.
                </Feature>
              </SimpleGrid>
            </Box>
            <FeatureImage
              maxW={{
                lg: '560px',
              }}
              display={{
                base: 'none',
                lg: 'block',
              }}
            />
          </Flex>
        </Box>
      </Box>
      <Box as="section" bg={mode('gray.50', 'gray.800')} py="20">
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
                Achieve
              </Text>
              <Divider />
            </HStack>
          </Container>
        </Box>
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
            spacing={{
              base: '4',
              lg: '20',
            }}
            direction={{
              base: 'column',
              lg: 'row',
            }}
          >
            <Center
              flex="1"
              shadow="lg"
              minH="26rem"
              maxW={{
                lg: 'xl',
              }}
            >
              <Img
                objectFit="cover"
                w="full"
                h="full"
                htmlWidth="576px"
                htmlHeight="420px"
                src="/images/achieve.jpeg"
                alt="Bring team together"
              />
            </Center>
            <Box
              maxW={{
                lg: 'lg',
              }}
            >
              <Heading
                size="2xl"
                mt="10"
                fontWeight="extrabold"
                letterSpacing="tight"
                lineHeight="normal"
              >
                Achieve greatness together with like minded
              </Heading>
              <Text fontSize="lg" mt="6" color={mode('gray.600', 'gray.400')}>
                Achieving is a very misunderstood word.
              </Text>
              <Button
                as={NavLink}
                to={user ? '/buckets' : '/login'}
                className="group"
                mt="8"
                backgroundColor={mode('orange.200', 'teal.700')}
                size="lg"
                px="8"
                fontWeight="bold"
                h="14"
                iconSpacing="3"
                rightIcon={
                  <Box
                    as={FaArrowRight}
                    fontSize="sm"
                    transition="transform 0.2s"
                    _groupHover={{
                      transform: 'translateX(2px)',
                    }}
                  />
                }
              >
                {user ? 'Buckets' : 'Login'}
              </Button>
            </Box>
          </Stack>
          <Divider my="20" opacity={1} />
          <SimpleGrid
            columns={{
              base: 1,
              md: 3,
            }}
            spacing={{
              base: '12',
              md: '8',
            }}
          >
            <Feature title="Create Buckets" icon={<HiBriefcase />}>
              Make your Buckets to inspire yourself to enjoy life in the moment.
            </Feature>
            <Feature title="Experience Kicks" icon={<GoCheck />}>
              Create them yourself, choose Kicks from other people. It is all a
              possibility. Just make sure you Experience them to the fullest.
            </Feature>
            <Feature title="Create stories" icon={<BiBookBookmark />}>
              Once you have Experienced your Bucket write your travel story so
              you will never forget the Experience. Make it eternal.
            </Feature>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default TheJourney;
