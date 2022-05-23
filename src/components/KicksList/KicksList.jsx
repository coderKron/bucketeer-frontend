import {
  Avatar,
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  SimpleGrid,
  useColorModeValue as mode,
  Stack,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AuthContext } from '../../context/auth.context';
import * as React from 'react';
import { useContext } from 'react';
import { useGetKicks } from '../../hooks/useGetKicks';
import Loading from '../Loading';
import { NavLink } from 'react-router-dom';
import Error from '../Error';
const KicksList = () => {
  const { kicks, loading, error, errorMessage } = useGetKicks();
  const { user } = useContext(AuthContext);
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
  });

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
              <Heading>All Kicks</Heading>
              <Stack direction={'row'}>
                <Button
                  as={NavLink}
                  to={'/kicks/create'}
                  variant={'solid'}
                  backgroundColor={mode('orange.500', 'blue.600')}
                >
                  Create new Kick
                </Button>
                <Button
                  as={NavLink}
                  to={'/buckets'}
                  variant={'solid'}
                  backgroundColor={mode('orange.500', 'blue.600')}
                >
                  Go to Buckets
                </Button>
              </Stack>
            </Stack>
            <SimpleGrid
              padding={'5px'}
              justifyContent={'center'}
              columns={{
                base: 1,
                md: 3,
                lg: 4,
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
                kicks.map(post => (
                  <Box
                    minH="36"
                    backgroundColor={mode('orange.200', 'white')}
                    padding={'15px'}
                    boxShadow={mode('sm', 'sm-dark')}
                    borderRadius="lg"
                    color={mode('black', 'black')}
                  >
                    <Link
                      as={NavLink}
                      to={`/kicks/${post._id}`}
                      _hover={{
                        textDecor: 'none',
                      }}
                      role="group"
                    >
                      <Stack key={post._id} spacing="8">
                        <Box overflow="hidden">
                          <Image
                            src={post.picture}
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
                              as={NavLink}
                              to={`/kicks/${post._id}/edit`}
                            >
                              Edit Kick
                            </Button>
                          )}
                        </Stack>
                      </Stack>
                    </Link>
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
