import Loading from '../Loading';
import Error from '../Error';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Button,
  Image,
  Stack,
  Container,
  useColorModeValue as mode,
  UnorderedList,
  Alert,
  AlertIcon,
  ListItem,
  AlertTitle,
  HStack,
  AlertDescription,
  Skeleton,
  SimpleGrid,
} from '@chakra-ui/react';
import { useGetAllJournalsPrivate } from '../../hooks/useGetAllJournalsPrivate';


function JournalListPrivate() {
  const { journal, error, errorMessage, loading } = useGetAllJournalsPrivate();
  

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
      ) : journal.length ? (
        <>
          <Image src="/images/start-writing.png" alt="start writing" />
          <Box bg="bg-surface">
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
                  alignItems={'center'}
                  direction="column"
                >
                  <Heading>Bucketeer Journals</Heading>
                </Stack>
                <Stack
                  justifyContent={'center'}
                  spacing={{
                    base: 12,
                    md: 16,
                  }}
                >
                  <SimpleGrid
                    padding={'5px'}
                    justifyContent={'center'}
                    columns={{
                      base: 1,
                      md: 2,
                      lg: 3,
                    }}
                    gap={{
                      base: 12,
                      lg: 8,
                    }}
                  >
                    {/* <Stack alignItems="center">
                  <Heading marginTop="10">{title}</Heading>
                </Stack> */}

                    {journal.map(e => {
                      return (
                        <>
                          <Box
                            padding={'15px'}
                            borderRadius="lg"
                            minH={'30'}
                            backgroundColor={mode('orange.100', 'teal.700')}
                          >
                            <HStack justifyContent={'center'}>
                              {e.story?.slice(0, 3).map(element => {
                                return (
                                  <Stack spacing="5px">
                                    <Box>
                                      <Image
                                        boxSize="150"
                                        src={element.pictures}
                                        alt={element.title}
                                        fallback={<Skeleton />}
                                      />
                                    </Box>
                                  </Stack>
                                );
                              })}
                            </HStack>
                            <Stack
                              spacing="10"
                              alignItems="center"
                              marginBottom="10"
                            >
                              <Heading fontWeight="bold">{e.title}</Heading>
                              <UnorderedList>
                                {e.story?.map((y, i) => {
                                  return (
                                    <ListItem listStyleType={'none'}>
                                      Story {i + 1}: {y.title}
                                    </ListItem>
                                  );
                                })}
                              </UnorderedList>
                              <Stack>
                                <Button
                                  as={NavLink}
                                  to={`/journal/${e._id}`}
                                  backgroundColor={mode(
                                    'orange.700',
                                    'gray.800'
                                  )}
                                  color={mode('white', 'white')}
                                  variant={'outline'}
                                >
                                  View Journal
                                </Button>
                              </Stack>
                            </Stack>
                          </Box>
                        </>
                      );
                    })}
                  </SimpleGrid>

                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction="column"
                  >
                    <Button
                      as={NavLink}
                      to={'/journal/create'}
                      backgroundColor={mode('orange.300', 'teal.400')}
                      color={mode('white', 'white')}
                      variant={'solid'}
                    >
                      Add Journal
                    </Button>
                  </Stack>
                </Stack>
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

export default JournalListPrivate;
