import React, { useContext, useRef, useState } from 'react';
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
  Select,
} from '@chakra-ui/react';
import { useGetBuckets } from '../../hooks/useGetBuckets';
import { useCreateKick } from '../../hooks/useCreateKick';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { RadioCard, RadioCardGroup } from './RadioCardGroup';

function CreateKicks() {
  const [isUploading, setIsUploading] = useState(false);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [picture, setPicture] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedBuckets, setSelectedBuckets] = useState('');
  const { buckets } = useGetBuckets();
  const { error, errorMessage, loading, createNewKick } = useCreateKick();
  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [errorLocationMessage, setErrorLocationMessage] = useState('');

  const getLocation = (city, country) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=+${city},+${country}&key=${process.env.REACT_APP_googleKey}`;
    axios
      .get(url)
      .then(res => {
        setLat(res[0].geometry.location.lat);
        setLong(res[0].geometry.location.lng);
      })
      .catch(locationError => {
        setErrorLocationMessage(locationError.response.data.message);
      });
  };

  const handleFileInputChange = e => {
    setIsUploading(true);
    const imageData = new FormData();
    imageData.append('picture', e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_URL}/api/upload`, imageData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(res => {
        setPicture(res.data.secure_url);
        setIsUploading(false);
      })
      .catch(error => console.log(error));
  };

  const handleSubmit = e => {
    const kickData = {
      name: title,
      description,
      picture,
      category,
      buckets: selectedBuckets,
      location: [lat, long],
    };
    createNewKick(kickData);

    setTitle('');
    setDescription('');
    setCategory('');
    setSelectedBuckets('');
    setPicture('');
    setLong('');
    setLat('');
  };

  return (
    <>
      {error && (
        <Alert textAlign={'center'} justifyContent={'center'} status="error">
          <AlertIcon />
          <AlertTitle>Could not Create Bucket:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Image src="/images/experience-kicks.png" alt="experience kicks" />
      <Container
        py={{
          base: '6',
          md: '8',
        }}
        maxW={'40%'}
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
                <FormLabel variant={'inline'}>Location</FormLabel>
                <Input
                  isRequired
                  placeholder="City"
                  onChange={e => {
                    setCity(e.target.value);
                  }}
                  maxW={{ md: '2xl' }}
                />
                <Input
                  isRequired
                  placeholder="Country"
                  onChange={e => {
                    setCountry(e.target.value);
                  }}
                  maxW={{ md: '2xl' }}
                />
                <Button
                  px={'50px'}
                  onClick={getLocation(city, country)}
                  variant={'solid'}
                >
                  Check
                </Button>
              </Stack>
            </FormControl>
            <RadioCardGroup defaultValue="one" spacing="3">
              {buckets.map(option => (
                <RadioCard
                  key={option._id}
                  onClick={e => {
                    setSelectedBuckets(option._id);
                  }}
                  value={option._id}
                >
                  <Text color="emphasized" fontWeight="medium" fontSize="sm">
                    Bucket: {option.name}
                  </Text>
                  <Text color="muted" fontSize="sm">
                    Add Kick to this Bucket
                  </Text>
                </RadioCard>
              ))}
            </RadioCardGroup>
            <RadioCardGroup
              defaultValue="one"
              onChange={e => {
                setCategory(e.target.value);
              }}
              spacing="3"
            >
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
                    id="picture"
                    type="file"
                    defaultValue={picture}
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
