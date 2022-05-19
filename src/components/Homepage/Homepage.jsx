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
                image="/images/team-picture-ruben.jpeg"
                name="Ruben Poelen"
                role="CFE, Bucketeer"
              >
                The greatest feat anyone can achieve is total, independent
                freedom. No strings except for your loved ones. Going into this
                amazing project I felt that a lot of people had forgetten the
                beauties of the world and were merely focussed on achieving
                their "work goals". So with my friend Louise we made a platform
                where people can share their amazing journeys and experiences,
                so you can one day try them yourself.
              </Testimonial>
              <Testimonial
                image="/images/team-picture-louise.jpeg"
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
