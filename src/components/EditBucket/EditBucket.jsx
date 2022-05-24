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
import { useUpdateBucket } from '../../hooks/useUpdateBucket';

import Loading from '../Loading';
import Error from '../Error';

export default function EditBucket() {
  const [isUploading, setIsUploading] = useState(false);
  const { bucketId } = useParams();
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const [bucket, setBucket] = useState('');
  const [loading, setLoading] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const storedToken = getToken();
  const [error, setError] = useState('');

  const [title, setTitle] = useState(`${null}`);
  const [picture, setPicture] = useState(null);
  const [description, setDescription] = useState(`${null}`);
  const { updateBucket } = useUpdateBucket();

  useEffect(() => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/bucket/${bucketId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setLoading(false);
        setBucket(response.data);
        setTitle(response.data.name);
        setPicture(response.data.picture);
        setDescription(response.data.description);
        console.log(bucket);
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(false);
      });
  }, [getToken, bucketId, isLoggedIn]);

  const handleFileInputChange = e => {
    setIsUploading(true);
    const imageData = new FormData();
    imageData.append('pictures', e.target.files[0]);

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
    e.preventDefault();
    const bucketData = {
      name: title,
      description,
      picture,
    };
    updateBucket(bucketData);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : bucket ? (
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
                  <NavLink to={'/buckets'}>
                    <Button variant={'solid'}>Back to Buckets</Button>
                  </NavLink>
                </Stack>
                <SimpleGrid>
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.50', 'teal.700')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'white')}
                  >
                    <Stack spacing="8">
                      <Box overflow="hidden">
                        <Image
                          src={bucket.picture}
                          alt={bucket.name}
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
                              Picture of Experience
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
                                Edit what you wanna achieve in this Bucket?
                                Which catergory Kicks. Or what country for
                                example.
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
                            Save Bucket
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
