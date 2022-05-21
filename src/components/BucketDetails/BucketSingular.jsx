import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Stack,
  Container,
  useColorModeValue as mode,
  SimpleGrid,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';

import Loading from '../Loading';
import Error from '../Error';
import { KickCard } from './KickCard';
import { KickGrid } from './KickGrid';

export default function BucketSingular() {
  const [bucket, setBucket] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { bucketId } = useParams();
  const { getToken, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log(bucketId);
    const storedToken = getToken();
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/bucket/${bucketId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setLoading(false);
        setBucket(response.data);
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(false);
      });
  }, [getToken, bucketId, isLoggedIn]);

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
              maxWidth={'100%'}
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
                ></Stack>
                <SimpleGrid>
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.200', 'white')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'black')}
                  >
                    <Link
                      key={bucket._id}
                      _hover={{
                        textDecor: 'none',
                      }}
                      role="group"
                    >
                      <Stack spacing="8">
                        <Box overflow="hidden">
                          <Image
                            src={bucket.picture}
                            alt={bucket.name}
                            width="full"
                            height="30rem"
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
                            <Heading size="xs">{bucket.name}</Heading>
                            <Text color="muted">{bucket.description}</Text>
                          </Stack>
                        </Stack>
                        {bucket.kicks?.map(kick => {
                          return (
                            <Box
                              maxW="7xl"
                              mx="auto"
                              px={{ base: '4', md: '8', lg: '12' }}
                              py={{ base: '6', md: '8', lg: '12' }}
                            >
                              <KickGrid>
                                <KickCard key={bucket._id} kick={bucket.kick} />
                              </KickGrid>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Link>
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
