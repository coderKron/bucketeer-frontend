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
import { FaArrowRight } from 'react-icons/fa';
import { FaCopy, FaPlug, FaRecycle } from 'react-icons/fa';
import { HiBriefcase } from 'react-icons/hi';
import { GoCheck } from 'react-icons/go';
import { TiAdjustBrightness } from 'react-icons/ti';
import { WiMeteor } from 'react-icons/wi';
import { BiBookBookmark } from 'react-icons/bi';
import { Feature } from './Feature';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

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
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { user } = React.useContext(AuthContext);
  return (
    <>
      <Image src="/images/the-journey.png" alt="the journey" />
      <Box as="section" bg={mode('white', 'gray.700')} py="24">
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
      <Box as="section" bg={mode('gray.50', 'gray.800')} pt="16" pb="32">
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
                Inspire
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
          <Heading
            textAlign="center"
            letterSpacing="tight"
            fontWeight="extrabold"
          >
            Become the best version of yourself.
          </Heading>
          <Box mt="24">
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
              }}
              spacing={{
                base: '16',
                md: '8',
              }}
            >
              <Stack spacing="12" maxW="lg">
                <Feature
                  icon={<Box as={TiAdjustBrightness} w="6" h="6" />}
                  title="Be the light of someone else"
                >
                  People have their dark times and their negative experiences.
                  Maybe you can create the Experience someone needs. Maybe you
                  have that genius idea. Or have experienced something amazing
                  that you know will make people happy. Be someone elses light.
                </Feature>
                <Feature
                  icon={<Box as={WiMeteor} w="6" h="6" />}
                  title="The Meteor is coming"
                >
                  Life is too short to focus on any thing other than what you
                  enjoy to do. Of couse you will have to work to be able to do
                  what you like. Just don't forget to enjoy your short and
                  precious time on Earth.
                </Feature>
              </Stack>
              <Center shadow="lg" minH="26rem">
                <Img
                  objectFit="cover"
                  w="full"
                  h="full"
                  src="https://images.unsplash.com/photo-1609921205586-7e8a57516512?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fGRlc2lnbmVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                  alt="Holding phone with app installed"
                />
              </Center>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
      <Box as="section" bg={mode('white', 'gray.700')} py="20">
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
                Achieve greatness together
              </Heading>
              <Text fontSize="lg" mt="6" color={mode('gray.600', 'gray.400')}>
                Achieving is a very misunderstood word. Nowadays achieving is
                linked to obtaining either power of money. But the real
                achievement in life is having a fulfilled life. Gaining
                experiences and when you're ready, pointing people in the right
                direction.
              </Text>
              <Stack justifyContent={'center'} alignItems="center">
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
                <Text>Or</Text>
                <Button
                  as={NavLink}
                  to={user ? '/kicks' : '/signup'}
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
                  {user ? 'Kicks' : 'Sign up'}
                </Button>
              </Stack>
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
