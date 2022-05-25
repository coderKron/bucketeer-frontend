import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  Image,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useBreakpointValue,
  Select,
  SkeletonText,
} from '@chakra-ui/react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useGetBuckets } from '../../hooks/useGetBuckets';
import { useCreateKick } from '../../hooks/useCreateKick';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { RadioCard, RadioCardGroup } from './RadioCardGroup';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '100%' };

function CreateKicks() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isUploading, setIsUploading] = useState(false);
  const [pictures, setPictures] = useState(null);
  const [title, setTitle] = useState('');
  const [continent, setContinent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedBuckets, setSelectedBuckets] = useState(null);
  const { buckets } = useGetBuckets();
  const { error, errorMessage, loading, createNewKick } = useCreateKick();
  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // const [center, setCenter] = useState({ lat: 48.8584, lng: 2.2945 });
  const [address, setAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 27.9881, lng: 86.925 });
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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

  const handleFileInputChange = e => {
    setIsUploading(true);
    const imageData = new FormData();
    imageData.append('pictures', e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_URL}/api/upload`, imageData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(res => {
        setPictures(res.data.secure_url);
        setIsUploading(false);
      })
      .catch(error => console.log(error));
  };

  const handleSelect = async value => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleSubmit = e => {
    const kickData = {
      name: title,
      description,
      pictures,
      continent,
      category,
      buckets: selectedBuckets,
      location: coordinates,
      country: address,
    };
    console.log(kickData);
    createNewKick(kickData);

    setTitle('');
    setDescription('');
    setCategory('');
    setSelectedBuckets('');
    setPictures(null);
    setContinent('');
  };

  return (
    <>
      {error && (
        <Alert textAlign={'center'} justifyContent={'center'} status="error">
          <AlertIcon />
          <AlertTitle>Could not Create Kick:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Image src="/images/experience-kicks.png" alt="experience kicks" />
      <Container
        py={{
          base: '6',
          md: '8',
        }}
        maxW={isDesktop ? '60%' : '100%'}
      >
        <Stack spacing="5">
          <Stack
            spacing="4"
            direction={{
              base: 'column',
              sm: 'row',
            }}
            justify="space-between"
          >
            <Box>
              <Text fontSize="lg" fontWeight="medium">
                Create Kick
              </Text>
              <Text color="muted" fontSize="sm">
                Bring Kicks from dreams to reality.
              </Text>
            </Box>
          </Stack>
          <Divider />
          <Stack spacing="5" divider={<StackDivider />}>
            <FormControl id="name">
              <Stack
                direction={{
                  base: 'column',
                  md: 'row',
                }}
                spacing={{
                  base: '1.5',
                  md: '8',
                }}
                justify="space-between"
              >
                <FormLabel variant="inline">Title</FormLabel>
                <Input
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                  maxW={{
                    md: '3xl',
                  }}
                  placeholder={'Walking in the Amazones'}
                />
              </Stack>
            </FormControl>
            <Select
              onChange={e => {
                setContinent(e.target.value);
              }}
              spacing="3"
            >
              <option value={'select Bucket'}>Continent where Kick is</option>
              <option key={'Europe'} value={'Europe'}>
                Europe
              </option>
              <option key={'Asia'} value={'Asia'}>
                Asia
              </option>
              <option key={'North-America'} value={'North-America'}>
                North-America
              </option>
              <option key={'South-America'} value={'South-America'}>
                South-America
              </option>
              <option key={'Middle-East'} value={'Middle-East'}>
                Middle-East
              </option>
              <option key={'Africa'} value={'Africa'}>
                Africa
              </option>
              <option key={'Australia'} value={'Australia'}>
                Australia
              </option>
              <option key={'Antarctica'} value={'Antarctica'}>
                Antarctica
              </option>
            </Select>
            <FormControl>
              <Stack
                direction={{
                  base: 'column',
                  md: 'row',
                }}
                spacing={{
                  base: '1.5',
                  md: '8',
                }}
                justify="space-between"
              >
                <FormLabel variant={'inline'}>Location </FormLabel>

                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({ placeholder: 'Type Location' })}
                      />

                      <div>
                        {loading ? <div>Loading...</div> : null}

                        {suggestions.map((suggestion, i) => {
                          const style = {
                            color: 'black',
                            backgroundColor: suggestion.active
                              ? '#41b6e6'
                              : '#fff',
                          };

                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, { style })}
                              key={i}
                            >
                              {suggestion.description}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                {/* <Input
                  isRequired
                  type={'text'}
                  placeholder="Location"
                  onChange={e => {
                    // setCity(e.target.value);
                  }}
                  maxW={{ md: '2xl' }}
                  
                /> */}
              </Stack>

              <Flex alignItems="center" h="30vh" w="100%">
                <Box h="100%" w="100%">
                  {/* Google Map Box */}
                  <GoogleMap
                    center={{ lat: coordinates.lat, lng: coordinates.lng }}
                    zoom={15}
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    options={{
                      zoomControl: true,
                      streetViewControl: false,
                      mapTypeControl: true,
                      fullscreenControl: false,
                    }}
                    onLoad={map => setMap(map)}
                  >
                    <Marker
                      position={{ lat: coordinates.lat, lng: coordinates.lng }}
                    />
                  </GoogleMap>
                </Box>
              </Flex>
            </FormControl>
            <Select spacing="3">
              <option value={'select Bucket'}>Select your Bucket</option>
              {buckets.map(option => (
                <option
                  key={option._id}
                  onClick={e => {
                    setSelectedBuckets(option._id);
                  }}
                  value={option._id}
                >
                  Bucket: {option.name}
                </option>
              ))}
            </Select>
            <RadioCardGroup spacing="3">
              {['Travel', 'Chill', 'Activity'].map(option => (
                <RadioCard
                  key={option}
                  onClick={() => {
                    setCategory(option);
                  }}
                  value={option}
                >
                  <Text color="emphasized" fontWeight="medium" fontSize="sm">
                    Category: {option}
                  </Text>
                  <Text color="muted" fontSize="sm">
                    The category determines what the Experience represents.
                  </Text>
                </RadioCard>
              ))}
            </RadioCardGroup>
            <FormControl id="picture">
              <Stack
                direction={{
                  base: 'column',
                  md: 'row',
                }}
                spacing={{
                  base: '1.5',
                  md: '8',
                }}
                justify="space-between"
              >
                <FormLabel variant="inline">Picture of Kick</FormLabel>
                <Stack
                  spacing={{
                    base: '3',
                    md: '5',
                  }}
                  direction={{
                    base: 'column',
                    sm: 'row',
                  }}
                  width="full"
                  maxW={{
                    md: '3xl',
                  }}
                >
                  <Input
                    required={true}
                    id="pictures"
                    defaultValue={pictures}
                    type="file"
                    onChange={e => {
                      handleFileInputChange(e);
                    }}
                  />
                </Stack>
              </Stack>
            </FormControl>
            <FormControl id="bio">
              <Stack
                direction={{
                  base: 'column',
                  md: 'row',
                }}
                spacing={{
                  base: '1.5',
                  md: '8',
                }}
                justify="space-between"
              >
                <Box>
                  <FormLabel variant="inline">Bio</FormLabel>
                  <FormHelperText mt="0" color="muted">
                    Write what you did or want to do in this Kick. Give people
                    enough information so that they can put your Kick in their
                    Buckets as well!
                  </FormHelperText>
                </Box>
                <Textarea
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  maxW={{
                    md: '3xl',
                  }}
                  rows={9}
                  resize="none"
                />
              </Stack>
            </FormControl>

            <Flex direction="row-reverse">
              <Button onClick={handleSubmit} type="submit" variant="primary">
                Save
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default CreateKicks;
