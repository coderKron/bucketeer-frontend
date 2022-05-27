import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Link,
  Button,
  HStack,
  VStack,
  Image,
  Text,
  Stack,
  Container,
  useBreakpointValue,
  useColorModeValue as mode,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';
import { useGetBucketDetails } from '../../hooks/useGetBucketDetails';

import Loading from '../Loading';
import Error from '../Error';
import { KickCardBucket } from './KickCard';
import { KickGridBucket } from './KickGrid';

export default function BucketSingular() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { bucketId } = useParams();
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const { bucket, error, errorMessage, loading, deleteBucket } =
    useGetBucketDetails();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });
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
                maxW={'100%'}
                justifyContent={'center'}
                spacing={{
                  base: '12',
                  md: '16',
                }}
              >
                <Stack
                  maxW={'100%'}
                  justifyContent={'center'}
                  alignItems="center"
                  direction={'column'}
                  justify={'space-between'}
                >
                  <Button
                    backgroundColor={mode('orange.300', 'teal.400')}
                    color={'white'}
                    as={NavLink}
                    to="/buckets"
                    variant={'solid'}
                  >
                    Back to Buckets
                  </Button>
                </Stack>
                <SimpleGrid maxW={'100%'}>
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.100', 'teal.800')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'white')}
                  >
                    {isMobile ? (
                      <VStack maxW={'100%'} spacing="8">
                        {isMobile ? (
                          <Box overflow="hidden">
                            <Image
                              src={bucket.picture}
                              alt={bucket.name}
                              width="full"
                              height="15rem"
                              objectFit="cover"
                              transition="all 0.2s"
                              _groupHover={{
                                transform: 'scale(1.05)',
                              }}
                            />
                          </Box>
                        ) : (
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
                        )}

                        <Stack
                          maxW={'100%'}
                          justifyContent={'space-between'}
                          flexDirection={'row'}
                          spacing="3"
                        >
                          <Stack spacing="3">
                            <Heading size="xs">Title: {bucket.name}</Heading>
                            <Text color="muted">
                              Description: {bucket.description}
                            </Text>
                          </Stack>
                        </Stack>

                        <Box
                          maxW="7xl"
                          mx="auto"
                          px={{ base: '4', md: '8', lg: '12' }}
                          py={{ base: '6', md: '8', lg: '12' }}
                        >
                          <VStack marginTop={'30px'} direction={'row'}>
                            <Button
                              onClick={deleteBucket}
                              backgroundColor={mode('red.500', 'red.800')}
                              color={mode('white', 'white')}
                              variant={'solid'}
                            >
                              Delete Bucket
                            </Button>
                            <Button
                              as={NavLink}
                              to={`/buckets/${bucket._id}/edit`}
                              backgroundColor={mode('green.500', 'green.600')}
                              color={mode('white', 'white')}
                              variant={'solid'}
                            >
                              Edit Bucket
                            </Button>
                          </VStack>
                        </Box>
                      </VStack>
                    ) : (
                      <VStack>
                        <HStack maxW={'100%'} spacing="8">
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
                            maxW={'100%'}
                            justifyContent={'space-between'}
                            flexDirection={'row'}
                            spacing="3"
                          >
                            <Stack spacing="3">
                              <Heading size="xs">Title: {bucket.name}</Heading>
                              <Text color="muted">
                                Description: {bucket.description}
                              </Text>
                            </Stack>
                          </Stack>

                          <Box
                            maxW="7xl"
                            mx="auto"
                            px={{ base: '4', md: '8', lg: '12' }}
                            py={{ base: '6', md: '8', lg: '12' }}
                          ></Box>
                        </HStack>
                        <HStack>
                          <Button
                            onClick={deleteBucket}
                            backgroundColor={mode('red.500', 'red.800')}
                            color={mode('white', 'white')}
                            variant={'solid'}
                          >
                            Delete Bucket
                          </Button>
                          <Button
                            as={NavLink}
                            to={`/buckets/${bucket._id}/edit`}
                            backgroundColor={mode('green.500', 'green.600')}
                            color={mode('white', 'white')}
                            variant={'solid'}
                          >
                            Edit Bucket
                          </Button>
                        </HStack>
                      </VStack>
                    )}
                    <Box bg="bg-surface">
                      <Container maxWidth={'100%'} py={{ base: '4', md: '8' }}>
                        <HStack>
                          <Divider />
                          <Text
                            fontSize={isMobile ? 'small' : 'lg'}
                            fontWeight="medium"
                            whiteSpace="nowrap"
                          >
                            <i> Bucket: {bucket.name}'s Kicks</i>
                          </Text>
                          <Divider />
                        </HStack>
                      </Container>
                    </Box>
                    <Stack
                      justifyContent={'center'}
                      alignItems="center"
                      direction={'column'}
                      justify={'space-between'}
                      marginBottom="10px"
                    >
                      <Button
                        as={NavLink}
                        to="/kicks"
                        backgroundColor={mode('orange.300', 'teal.400')}
                        color={'white'}
                        variant={'solid'}
                      >
                        Add Kicks
                      </Button>
                    </Stack>
                    <Divider />
                    <Stack>
                      <Box
                        maxWidth={bucket.kicks?.length > 1 ? '100%' : '25%'}
                        px={{
                          base: '4',
                          md: '8',
                          lg: '12',
                        }}
                        py={{
                          base: '6',
                          md: '8',
                          lg: '12',
                        }}
                      >
                        <KickGridBucket>
                          {bucket.kicks?.map(kick => {
                            return (
                              <KickCardBucket
                                key={kick._id}
                                kick={kick}
                                bucketId={bucketId}
                              />
                            );
                          })}
                        </KickGridBucket>
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
