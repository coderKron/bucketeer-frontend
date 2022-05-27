import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Link,
  Button,
  Image,
  Text,
  Stack,
  HStack,
  VStack,
  Container,
  useColorModeValue as mode,
  SimpleGrid,
  FormControl,
  Select,
  SkeletonText,
  Flex,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';
import { useGetBuckets } from '../../hooks/useGetBuckets';
import { useAddKickToBucket } from '../../hooks/useAddKickToBucket';
import { LikeButton } from './LikeButton';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import Loading from '../Loading';
import Error from '../Error';

export default function Kickdetails() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [kick, setKick] = useState({});
  const [error, setError] = useState(false);
  const [bucketId, setBucketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [location, setLocation] = useState(undefined);
  const [coordinates, setCoordinates] = useState({ lat: 27.9881, lng: 86.925 });
  const { kickId } = useParams();
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const { buckets } = useGetBuckets();
  const { addKickToBucket } = useAddKickToBucket();
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const libraries = ['places'];

  useEffect(() => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/kick/${kickId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setLoading(false);
        setKick(response.data);
        setCoordinates(response.data.location);
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(false);
      });
  }, [getToken, kickId, isLoggedIn]);

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (loadError) {
    return 'Error loading map';
  }
  if (!isLoaded) {
    return <SkeletonText />;
  }

  const handleLike = e => {};

  const handleAddKick = e => {
    e.preventDefault();

    addKickToBucket({
      bucketId: bucketId,
      kickId: kickId,
    });
    setBucketId('');
  };

  console.log(coordinates);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : kick ? (
        <>
          <Image src="/images/experience-kicks.png" alt="experience kicks" />

          <Box bg={'bg-surface'} color={mode('black')}>
            <Container
              justifyContent={'center'}
              maxWidth={isDesktop ? '70%' : '100%'}
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
                  direction={'column'}
                  justify={'space-between'}
                >
                  <Button
                    as={NavLink}
                    to={'/kicks'}
                    backgroundColor={mode('orange.300', 'teal.400')}
                    variant={'solid'}
                  >
                    Back to Kicks
                  </Button>
                </Stack>
                <SimpleGrid position={'relative'}>
                  <LikeButton
                    position="absolute"
                    onClick={handleLike}
                    top="4"
                    right="4"
                    aria-label={`Like this Kick.`}
                  />
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.200', 'teal.700')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'black')}
                  >
                    <Stack spacing="8">
                      <Box overflow="hidden">
                        {isDesktop ? (
                          <HStack>
                            <Image
                              src={kick.pictures}
                              alt={kick.name}
                              width="full"
                              maxW={'600px'}
                              height="25rem"
                              objectFit="cover"
                              transition="all 0.2s"
                              _groupHover={{
                                transform: 'scale(1.05)',
                              }}
                            />

                            <Flex alignItems="center" h="30vh" w="100%">
                              <Box h="100%" w="100%">
                                <GoogleMap
                                  center={{
                                    lat: parseFloat(coordinates.lat),
                                    lng: parseFloat(coordinates.lng),
                                  }}
                                  zoom={10}
                                  mapContainerStyle={{
                                    width: '100%',
                                    height: '100%',
                                  }}
                                  options={{
                                    zoomControl: true,
                                    streetViewControl: false,
                                    mapTypeControl: true,
                                    fullscreenControl: false,
                                  }}
                                  onLoad={map => setMap(map)}
                                >
                                  <Marker
                                    position={{
                                      lat: parseFloat(coordinates.lat),
                                      lng: parseFloat(coordinates.lng),
                                    }}
                                  />
                                </GoogleMap>
                              </Box>
                            </Flex>
                          </HStack>
                        ) : (
                          <VStack>
                            <Image
                              src={kick.pictures}
                              alt={kick.name}
                              width="full"
                              height="25rem"
                              objectFit="cover"
                              transition="all 0.2s"
                              _groupHover={{
                                transform: 'scale(1.05)',
                              }}
                            />

                            <Flex alignItems="center" h="30vh" w="50%">
                              <Box h="100%" w="100%">
                                <GoogleMap
                                  center={{
                                    lat: parseFloat(coordinates.lat),
                                    lng: parseFloat(coordinates.lng),
                                  }}
                                  zoom={10}
                                  mapContainerStyle={{
                                    width: '100%',
                                    height: '100%',
                                  }}
                                  options={{
                                    zoomControl: true,
                                    streetViewControl: false,
                                    mapTypeControl: true,
                                    fullscreenControl: false,
                                  }}
                                  onLoad={map => setMap(map)}
                                >
                                  <Marker
                                    position={{
                                      lat: parseFloat(coordinates.lat),
                                      lng: parseFloat(coordinates.lng),
                                    }}
                                  />
                                </GoogleMap>
                              </Box>
                            </Flex>
                          </VStack>
                        )}
                      </Box>

                      <Stack
                        justifyContent={'space-around'}
                        flexDirection={'row'}
                        spacing="3"
                      >
                        <HStack spacing="35">
                          <Box>
                            <Heading size="xs">{kick.name}</Heading>
                            <Text color="muted">{kick.country}</Text>
                          </Box>
                          <Box>
                            <Text color="muted">{kick.description}</Text>
                          </Box>
                        </HStack>
                      </Stack>

                      <Stack
                        justifyContent={'center'}
                        alignItems="center"
                        justify={'space-between'}
                        flexDirection={'row'}
                        spacing="9"
                      >
                        <Box
                          flexDirection={'row'}
                          justifyContent="space-around"
                          alignItems={'center'}
                          display="flex"
                          spacing="8"
                        >
                          {buckets.length && (
                            <>
                              <FormControl>
                                <Select
                                  onChange={e => {
                                    setBucketId(e.target.value);
                                  }}
                                  placeholder="Select Bucket"
                                >
                                  {buckets.length &&
                                    buckets.map(singleBucket => {
                                      return (
                                        <option value={singleBucket._id}>
                                          {singleBucket.name}
                                        </option>
                                      );
                                    })}
                                </Select>
                              </FormControl>
                              <Button
                                backgroundColor={mode('gray.700', 'orange.600')}
                                color={mode('white', 'white')}
                                variant={'solid'}
                                type="submit"
                                onClick={handleAddKick}
                              >
                                Add
                              </Button>
                            </>
                          )}
                        </Box>
                      </Stack>
                    </Stack>
                  </Box>
                </SimpleGrid>
              </Stack>
            </Container>
          </Box>
        </>
      ) : (
        <Error />
      )}
    </>
  );
}
