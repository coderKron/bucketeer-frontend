import {
  Icon,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  Box,
  Image,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useColorMode } from '@chakra-ui/react';
import { useSignup } from '../../hooks/useSignup';
import { RadioCard, RadioCardGroup } from './RadioCardGroup';

const Signup = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showPassword, setShowPassword] = React.useState(false);
  const [userName, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [tagline, setTagline] = React.useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, isLoading, user } = React.useContext(AuthContext);
  const { error, errorMessage, loading, signup } = useSignup();

  const handleUserName = e => setUsername(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleTagline = e => setTagline(e.target.value);

  const icon = useColorModeValue('gray.600', 'gray.600');

  const handleSignup = e => {
    e.preventDefault();
    const userInformation = {
      userName: userName,
      password: password,
      email: email,
      tagline: tagline,
    };

    signup(userInformation);
  };

  return (
    <>
      {error && (
        <Alert textAlign={'center'} justifyContent={'center'} status="error">
          <AlertIcon />
          <AlertTitle>Could not create Account:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Container
        maxW="md"
        py={{
          base: '12',
          md: '24',
        }}
      >
        <Stack spacing="8">
          <Stack spacing="6" align="center">
            <HStack justify={'center'}>
              {colorMode === 'light' ? (
                <Image
                  borderRadius={'20%'}
                  width={'150px'}
                  src="./images/Daylight.png"
                />
              ) : (
                <Image
                  borderRadius={'20%'}
                  width={'150px'}
                  src="./images/Darkness.png"
                />
              )}
            </HStack>
            <Stack spacing="3" textAlign="center">
              <Heading
                size={useBreakpointValue({
                  base: 'xs',
                  md: 'sm',
                })}
              >
                Create an account
              </Heading>
              <Text color="muted">Start making your dreams come true</Text>
            </Stack>
          </Stack>
          <Stack spacing="6">
            <Box as={'form'}>
              <Stack spacing="5">
                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    onChange={handleEmail}
                    id="email"
                    value={email}
                    type="email"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="firstname">Username</FormLabel>
                  <Input
                    onChange={handleUserName}
                    id="firstname"
                    value={userName}
                    type="text"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="tagline">Your Tagline</FormLabel>
                  <Input
                    onChange={handleTagline}
                    id="tagline"
                    value={tagline}
                    type="text"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      id="password"
                      value={password}
                      type={showPassword ? 'text' : 'password'}
                      onChange={handlePassword}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'primary'}
                        onClick={() => {
                          setShowPassword(showPassword => !showPassword);
                        }}
                      >
                        {showPassword ? (
                          <ViewIcon color={icon} />
                        ) : (
                          <ViewOffIcon color={icon} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color="muted">
                    At least 8 characters long
                  </FormHelperText>
                </FormControl>
              </Stack>
              <Stack spacing="4">
                <Button
                  onClick={handleSignup}
                  backgroundColor={useColorModeValue('orange.200', 'teal.400')}
                  variant="ghost"
                >
                  Create account
                </Button>
              </Stack>
            </Box>
          </Stack>
          <HStack justify="center" spacing="1">
            <Text fontSize="sm" color="muted">
              Already have an account?
            </Text>
            <Button variant="link" colorScheme="blue" size="sm">
              <Link to="/login">Log in</Link>
            </Button>
          </HStack>
        </Stack>
      </Container>
    </>
  );
};
export default Signup;
