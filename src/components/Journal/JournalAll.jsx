import Loading from '../Loading';
import Error from '../Error';
import { useParams, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import {
  Box,
  Heading,
  Button,
  Image,
  Text,
  Stack,
  Container,
  useColorModeValue as mode,
  Link,
  Header,
  UnorderedList,
  ListItem,
  Alert,
  AlertIcon,
  AlertTitle,
  HStack,
  VStack,
  AlertDescription,
  Skeleton,
  Avatar,
  SimpleGrid,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react';
import { useGetAllJournals } from '../../hooks/useGetAllJournals';
import { JournalCard } from './JournalCard';
import { useContext } from 'react';

function JournalAll() {
  const { journal, error, errorMessage, loading } = useGetAllJournals();
  const { title, journalId } = journal;
  const { isLoggedIn } = useContext(AuthContext);
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
                  <Heading>Bucketeer Journals: Public</Heading>
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
                    {journal.map(e => {
                      return (
                        <>
                          <Box
                            padding={'15px'}
                            borderRadius="lg"
                            minH={'30'}
                            backgroundColor={mode('orange.100', 'teal.700')}
                          >
                            <VStack marginBottom={'5px'}>
                              <Avatar
                                src={e.createdBy?.profilePicture}
                                alt="profile picture"
                              />
                              <Text>Created By: {e.createdBy?.userName}</Text>

                              <Divider />
                              <Stack justifyContent={'center'}>
                                <Heading fontWeight="bold">{e.title}</Heading>
                              </Stack>
                            </VStack>
                            <HStack
                              marginBottom={'5px'}
                              justifyContent={'center'}
                            >
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
                              spacing="1"
                              alignItems="center"
                              marginBottom="10"
                            >
                              <Text fontWeight={'semibold'}>
                                This Journal contains the following stories
                              </Text>
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
                                    'orange.300',
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
                    {isLoggedIn ? (
                      <Button
                        as={NavLink}
                        to={'/journal/create'}
                        backgroundColor={mode('orange.300', 'teal.400')}
                        color={mode('white', 'white')}
                        variant={'solid'}
                      >
                        Add Journal
                      </Button>
                    ) : (
                      <>
                        <Text>
                          You need to be logged in to create a Journal
                        </Text>
                        <Button
                          as={NavLink}
                          to={'/login'}
                          backgroundColor={mode('orange.300', 'teal.400')}
                          color={mode('white', 'white')}
                          variant={'solid'}
                        >
                          Login
                        </Button>
                      </>
                    )}
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

export default JournalAll;
