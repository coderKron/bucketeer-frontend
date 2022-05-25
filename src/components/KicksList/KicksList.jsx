import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  FormControl,
  Image,
  Link,
  SimpleGrid,
  useColorModeValue as mode,
  Stack,
  Text,
  VStack,
  Alert,
  Select,
  FormLabel,
  Divider,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { useGetKicks } from '../../hooks/useGetKicks';
import { NavLink } from 'react-router-dom';
import { useGetBuckets } from '../../hooks/useGetBuckets';
import { useAddKickToBucket } from '../../hooks/useAddKickToBucket';
import Loading from '../Loading';
import Error from '../Error';

const KicksList = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { kicks, loading, error, errorMessage } = useGetKicks();
  const [filteredKicks, setFilteredKicks] = React.useState(kicks);
  const [bucketId, setBucketId] = React.useState('');
  const [filterByContinent, setFilterByContinent] = React.useState(undefined);
  const [filterByCategory, setFilterByCategory] = React.useState(undefined);
  const { user } = useContext(AuthContext);
  const { addKickToBucket } = useAddKickToBucket();

  const { buckets } = useGetBuckets();
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

  React.useEffect(() => {
    if (filterByContinent && filterByCategory) {
      setFilteredKicks(
        kicks.filter(kick => {
          return (
            kick.continent === filterByContinent &&
            kick.category === filterByCategory
          );
        })
      );
    } else if (filterByContinent && !filterByCategory) {
      setFilteredKicks(
        kicks.filter(kick => {
          return kick.continent === filterByContinent;
        })
      );
    } else if (!filterByContinent && filterByCategory) {
      setFilteredKicks(
        kicks.filter(kick => {
          return kick.category === filterByCategory;
        })
      );
    }
  }, [filterByContinent, filterByCategory, kicks]);

  const handleFilterByContinent = e => {
    let hasValue;
    if (e === 'all') {
      hasValue = false;
    } else {
      hasValue = e;
    }
    if (hasValue) {
      setFilterByContinent(e);
    } else {
      setFilterByContinent(undefined);
    }
  };

  const handleFilterByCategory = e => {
    let hasValue;

    if (e === 'all') {
      hasValue = false;
    } else {
      hasValue = e;
    }
    if (hasValue) {
      setFilterByCategory(e);
    } else {
      setFilterByCategory(undefined);
    }
  };

  const isFiltered =
    filterByContinent || filterByCategory ? filteredKicks : kicks;

  const handleAddKick = (kickId, e) => {
    e.preventDefault();

    addKickToBucket({
      bucketId: bucketId,
      kickId: kickId,
    });
    setBucketId('');
  };
  return (
    <>
      <Image src="/images/experience-kicks.png" alt="experience kicks" />
      <Box
        backgroundColor={mode('white.100')}
        bg="bg-surface"
        color={mode('black')}
      >
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
              direction="column"
              justify="space-between"
            >
              <Box bg="bg-surface">
                <Container py={{ base: '4', md: '8' }}>
                  <HStack>
                    <Divider />
                    <Text fontSize="lg" fontWeight="medium" whiteSpace="nowrap">
                      Kicks
                    </Text>
                    <Divider />
                  </HStack>
                </Container>
              </Box>

              <HStack>
                <Button
                  as={NavLink}
                  to={'/kicks/create'}
                  variant={'solid'}
                  backgroundColor={mode('orange.500', 'blue.600')}
                >
                  Create new Kick
                </Button>
                <VStack>
                  <Select
                    onChange={e => {
                      console.log(e.target.value);
                      handleFilterByContinent(e.target.value);
                    }}
                    spacing="3"
                  >
                    <option value={'all'}>Continent of Kick</option>

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
                </VStack>
                <VStack>
                  <Select
                    onChange={e => {
                      handleFilterByCategory(e.target.value);
                    }}
                    spacing="3"
                  >
                    <option value={'all'}>Category of Kick</option>

                    <option key={'Chill'} value={'Chill'}>
                      Chill
                    </option>
                    <option key={'Travel'} value={'Travel'}>
                      Travel
                    </option>
                    <option key={'activities'} value={'Activity'}>
                      Activities
                    </option>
                  </Select>
                </VStack>
                <Button
                  as={NavLink}
                  to={'/buckets'}
                  variant={'solid'}
                  backgroundColor={mode('orange.500', 'blue.600')}
                >
                  Go to Buckets
                </Button>
              </HStack>
            </Stack>
            <SimpleGrid
              padding={'5px'}
              justifyContent={'center'}
              columns={{
                base: 1,
                md: 3,
                lg: 3,
              }}
              gap={{
                base: '12',
                lg: '8',
              }}
            >
              {loading ? (
                <Loading />
              ) : error ? (
                <Alert
                  textAlign={'center'}
                  justifyContent={'center'}
                  status="error"
                >
                  <AlertIcon />
                  <AlertTitle>Could not get Kicks:</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              ) : kicks.length ? (
                isFiltered.map(post => (
                  <Box
                    key={post._id}
                    minH="36"
                    backgroundColor={mode('orange.200', 'teal.700')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    position={'relative'}
                    color={mode('black', 'white')}
                  >
                    <Stack key={post._id} spacing="8">
                      <Link
                        as={NavLink}
                        to={`/kicks/${post._id}`}
                        _hover={{
                          textDecor: 'none',
                        }}
                        role="group"
                      >
                        <Box overflow="hidden">
                          <Image
                            src={post.pictures}
                            alt={post.name}
                            width="full"
                            height="15rem"
                            objectFit="cover"
                            transition="all 0.2s"
                            _groupHover={{
                              transform: 'scale(1.05)',
                            }}
                          />
                        </Box>
                      </Link>
                      <Stack
                        justifyContent={'space-around'}
                        flexDirection={'row'}
                        spacing="3"
                      >
                        <Stack spacing="3">
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color="accent"
                          >
                            {post.category}
                          </Text>
                          <Heading size="xs">{post.name}</Heading>
                          <Text color="muted">{post.description}</Text>
                        </Stack>
                        {`${user._id}` === `${post.createdBy}` && (
                          <Button
                            backgroundColor={mode('orange.700', 'blue.600')}
                            px={'15px'}
                            as={NavLink}
                            to={`/kicks/${post._id}/edit`}
                          >
                            Edit
                          </Button>
                        )}
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
                                  backgroundColor={mode(
                                    'gray.700',
                                    'orange.600'
                                  )}
                                  color={mode('white', 'white')}
                                  variant={'solid'}
                                  type="submit"
                                  onClick={e => handleAddKick(post._id, e)}
                                >
                                  Add
                                </Button>
                              </>
                            )}
                          </Box>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Box>
                ))
              ) : (
                <>
                  <Error />
                </>
              )}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default KicksList;
