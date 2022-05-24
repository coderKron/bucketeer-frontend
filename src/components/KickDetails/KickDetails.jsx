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
  Container,
  useColorModeValue as mode,
  SimpleGrid,
  FormControl,
  Select,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';
import { useGetBuckets } from '../../hooks/useGetBuckets';
import { useAddKickToBucket } from '../../hooks/useAddKickToBucket';
import { LikeButton } from './LikeButton';

import Loading from '../Loading';
import Error from '../Error';

export default function Kickdetails() {
  const [kick, setKick] = useState({});
  const [error, setError] = useState(false);
  const [bucketId, setBucketId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { kickId } = useParams();
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const { buckets } = useGetBuckets();
  const { addKickToBucket } = useAddKickToBucket();

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
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(false);
      });
  }, [getToken, kickId, isLoggedIn]);

  const handleLike = e => {};

  const handleAddKick = e => {
    e.preventDefault();

    addKickToBucket({
      bucketId: bucketId,
      kickId: kickId,
    });
    setBucketId('');
  };

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
              maxWidth={'70%'}
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
                  <Button as={NavLink} to={'/kicks'} variant={'solid'}>
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
                    backgroundColor={mode('orange.200', 'white')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'black')}
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

                      <Stack
                        justifyContent={'space-around'}
                        flexDirection={'row'}
                        spacing="3"
                      >
                        <Stack spacing="3">
                          <Heading size="xs">{kick.name}</Heading>
                          <Text color="muted">{kick.country}</Text>
                          <Text color="muted">{kick.description}</Text>
                        </Stack>
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
