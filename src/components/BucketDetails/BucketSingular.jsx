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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';
import { useGetBucketDetails } from '../../hooks/useGetBucketDetails';

import Loading from '../Loading';
import Error from '../Error';
import { KickCard } from './KickCard';
import { KickGrid } from './KickGrid';

export default function BucketSingular() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { bucketId } = useParams();
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const { bucket, error, errorMessage, loading, deleteBucket } =
    useGetBucketDetails();

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Alert textAlign={'center'} justifyContent={'center'} status="error">
          <AlertIcon />
          <AlertTitle>Could not get Bucket:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
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
                    backgroundColor={mode('orange.100', 'teal.800')}
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
                      <Stack
                        justifyContent={'center'}
                        alignItems="center"
                        direction={'column'}
                        justify={'space-between'}
                      >
                        <NavLink to={'/kicks'}>
                          <Button
                            backgroundColor={mode('orange.700', 'gray.800')}
                            color={mode('white', 'white')}
                            variant={'solid'}
                          >
                            Add Kicks
                          </Button>
                        </NavLink>
                      </Stack>
                      <Box
                        maxW="7xl"
                        mx="auto"
                        px={{ base: '4', md: '8', lg: '12' }}
                        py={{ base: '6', md: '8', lg: '12' }}
                      >
                        <KickGrid>
                          {bucket.kicks?.map(kick => {
                            return (
                              <KickCard
                                key={kick._id}
                                kick={kick}
                                bucketId={bucketId}
                              />
                            );
                          })}
                        </KickGrid>
                        <Stack marginTop={'30px'} direction={'row'}>
                          <Button
                            onClick={deleteBucket}
                            backgroundColor={mode('red.500', 'gray.800')}
                            color={mode('white', 'white')}
                            variant={'solid'}
                          >
                            Delete Bucket
                          </Button>
                          <Button
                            as={NavLink}
                            to={`/buckets/${bucket._id}/edit`}
                            backgroundColor={mode('red.500', 'gray.800')}
                            color={mode('white', 'white')}
                            variant={'solid'}
                          >
                            Edit Bucket
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
