import Loading from '../Loading';
import Error from '../Error';
import { useParams, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import {
  Box,
  Heading,
  Button,
  Image,
  Stack,
  Container,
  useColorModeValue as mode,
  Link,
  Alert,
  AlertIcon,
  AlertTitle,
  HStack,
  Text,
  AlertDescription,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useGetJournalDetails } from '../../hooks/useGetJournalDetails';
import { StoryBox } from './StoryBox';
import { useContext } from 'react';

function BlogSingular() {
  const { journalId } = useParams();
  const { journal, error, errorMessage, loading, deleteJournal} = useGetJournalDetails();
  const { title } = journal;
  const { isLoggedIn, user } = useContext(AuthContext);

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
      ) : journal ? (
        <>
          <Image src="/images/start-writing.png" alt="start writing" />
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
              <Box
                minH="36"
                backgroundColor={mode('orange.100', 'teal.800')}
                padding={'15px'}
                boxShadow={mode('sm', 'sm-dark')}
                borderRadius="lg"
                color={mode('black', 'white')}
              >
                <Stack alignItems="center">
                  <Heading marginTop="1">{title}</Heading>
                </Stack>
                <HStack justifyContent={'center'}>
                  <Stack spacing="8">
                    <Stack
                      justifyContent={'center'}
                      alignItems="center"
                      direction={'column'}
                      justify={'space-between'}
                    >
                      {journal.story?.map(story => {
                        return (
                          <StoryBox
                            key={story._id}
                            story={story}
                            journalId={journalId}
                          />
                        );
                      })}

                      {isLoggedIn ? (
                        <HStack>
                       
                        {journal.createdBy === user._id ?  
                        
                        (
                          <>
                          <Button
                          as={NavLink}
                          to={`/journal/story/${journalId}`}
                          backgroundColor={mode('orange.700', 'gray.800')}
                          color={mode('white', 'white')}
                          variant={'solid'}
                        >
                          Add Story
                        </Button>
                        <Button
                      onClick={deleteJournal}
                      to={'/journal/private'}
                      backgroundColor={mode('orange.300', 'teal.400')}
                      color={mode('white', 'white')}
                      variant={'solid'}
                    >
                      Delete Journal
                    </Button>
                    </>
                    ) 
                    : (
                      <>

                    </>)
                    }
                        </HStack>
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
                      <Stack>
                      <Button
                            as={NavLink}
                            to={'/journal/public'}
                            backgroundColor={mode('orange.300', 'teal.400')}
                            color={mode('white', 'white')}
                            variant={'solid'}
                          >
                            Back
                          </Button>
                      </Stack>

                    </Stack>
                  </Stack>
                </HStack>
              </Box>
            </Stack>
          </Container>
        </>
      ) : (
        <Error />
      )}
    </>
  );
}

export default BlogSingular;
