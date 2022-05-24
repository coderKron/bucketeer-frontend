import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Link,
  StackDivider,
  Input,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  Image,
  FormHelperText,
  Text,
  Stack,
  Container,
  useColorModeValue as mode,
  SimpleGrid,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';
import { useUpdateKick } from '../../hooks/useUpdateKick';
import { RadioCard, RadioCardGroup } from './RadioCardGroup';

import Loading from '../Loading';
import Error from '../Error';

export default function EditKick() {
  const [isUploading, setIsUploading] = useState(false);
  const { kickId } = useParams();
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const [kick, setKick] = useState('');
  const [loading, setLoading] = useState(false);
  const storedToken = getToken();
  const [error, setError] = useState(false);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState(`${null}`);
  const [pictures, setPictures] = useState(null);
  const [description, setDescription] = useState(`${null}`);
  const { updateKick } = useUpdateKick();

  useEffect(() => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/kick/${kickId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setLoading(false);
        console.log(response.data);
        setKick(response.data);
        setTitle(response.data.name);
        setPictures(response.data.pictures);
        setCategory(response.data.category);
        setDescription(response.data.description);
      })
      .catch(error => {
        setLoading(false);
        setError(false);
      });
  }, [getToken, kickId, isLoggedIn]);

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

  const handleSubmit = e => {
    e.preventDefault();
    const kickData = {
      name: title,
      description,
      pictures,
      category,
    };
    updateKick(kickData);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : kick ? (
        <>
          <Image
            src="/images/Experience-Freedom.png"
            alt="experience freedom"
          />
          <Box bg={'bg-surface'} color={mode('black')}>
            <Container
              justifyContent={'center'}
              maxWidth={'90%'}
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
                  <NavLink to={'/kicks'}>
                    <Button variant={'solid'}>Back to Kicks</Button>
                  </NavLink>
                </Stack>
                <SimpleGrid>
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.200', 'teal.800')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'white')}
                  >
                    <Stack spacing="8">
                      <Box overflow="hidden">
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
                      </Box>

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
                              value={title}
                              onChange={e => {
                                setTitle(e.target.value);
                              }}
                              maxW={{
                                md: '3xl',
                              }}
                            />
                          </Stack>
                        </FormControl>
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
                              <Text
                                color="emphasized"
                                fontWeight="medium"
                                fontSize="sm"
                              >
                                Category: {option}
                              </Text>
                              <Text color="muted" fontSize="sm">
                                The category determines what the Experience
                                represents.
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
                            <FormLabel variant="inline">
                              Picture of Kick
                            </FormLabel>
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
                                required
                                id="picture"
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
                                Edit the purpose of the kick. The activity or
                                what is supposed to be done. Maybe even the
                                location!
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
                              rows={5}
                              resize="none"
                            />
                          </Stack>
                        </FormControl>
                      </Stack>
                      <Box
                        maxW="7xl"
                        mx="auto"
                        px={{ base: '4', md: '8', lg: '12' }}
                        py={{ base: '6', md: '8', lg: '12' }}
                      >
                        <Stack direction={'row'}>
                          <Button
                            type="submit"
                            onClick={handleSubmit}
                            backgroundColor={mode('red.500', 'gray.800')}
                            color={mode('white', 'white')}
                            variant={'solid'}
                          >
                            Save Kick
                          </Button>
                        </Stack>
                      </Box>
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
