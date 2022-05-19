import React from 'react';
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
} from '@chakra-ui/react';
import { CTAButton } from './CTAButton';
import { Feature } from './Feature';
import { Testimonial } from './Testimonial';
import { Link } from 'react-router-dom';
import { GiHighKick } from 'react-icons/gi';
import { BsBucket } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { FiFileText } from 'react-icons/fi';

function Homepage() {
  const { colorMode, toggleColorMode } = useColorMode();

  const backgroundColorBig = () => {
    if (colorMode === 'light') {
      return 'white';
    } else {
    }
  };
  const backgroundColorText = () => {
    if (colorMode === 'light') {
      return 'gray';
    } else {
      return 'white';
    }
  };
  const backgroundColorIcons = () => {
    if (colorMode === 'light') {
      return '#ff6767';
    } else {
    }
  };
  const backgroundColorButtons = () => {
    if (colorMode === 'light') {
      return 'white';
    } else {
    }
  };
  return (
    <>
      <Box p={'0'} minH={'auto'} as="section" width={'100%'}>
        <Container p={'0'} className="App" maxWidth={'100%'}>
          <video autoPlay loop muted>
            <source src={videoBucketeer} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Container>
      </Box>
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
              <CTAButton
                w={{
                  base: 'full',
                  md: 'auto',
                }}
              >
                <Link to="/signup">Sign up here</Link>
              </CTAButton>
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
                image="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                name="Ruben Poelen"
                role="CFE, Bucketeer"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Testimonial>
              <Testimonial
                image="https://images.unsplash.com/photo-1589729482945-ca6f3a235f7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                name="Louise Gabrielle"
                role="CBE, Bucketeer"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco.
              </Testimonial>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Homepage;
