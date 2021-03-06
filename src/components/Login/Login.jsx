import {
  Box,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Image,
  useBreakpointValue,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useLogin } from '../../hooks/useLogin';
import { useColorMode } from '@chakra-ui/react';

const Login = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const icon = useColorModeValue('gray.600', 'gray.600');
  const { error, errorMessage, loading, login } = useLogin();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleRememberMe = () => {
    if (rememberMe) {
      setRememberMe(false);
    } else if (!rememberMe) {
      setRememberMe(true);
    }
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    setPassword(e.target.value);
  };

  const handleLogin = e => {
    e.preventDefault();
    const userDetails = {
      email,
      password,
      rememberMe,
    };
    login(userDetails);
  };

  return (
    <>
      {error && (
        <Alert textAlign={'center'} justifyContent={'center'} status="error">
          <AlertIcon />
          <AlertTitle>Could not Login:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Container
        maxW="lg"
        py={{
          base: '12',
          md: '24',
        }}
        px={{
          base: '0',
          sm: '8',
        }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack
              spacing={{
                base: '2',
                md: '3',
              }}
              textAlign="center"
            >
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
              <Heading
                size={useBreakpointValue({
                  base: 'xs',
                  md: 'sm',
                })}
              >
                Log in to your account
              </Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <Button variant="link" colorScheme="blue">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </HStack>
            </Stack>
          </Stack>
          <Box
            py={{
              base: '0',
              sm: '8',
            }}
            px={{
              base: '4',
              sm: '10',
            }}
            bg={useBreakpointValue({
              base: 'transparent',
              sm: 'bg-surface',
            })}
            boxShadow={{
              base: 'none',
              sm: useColorModeValue('md', 'md-dark'),
            }}
            borderRadius={{
              base: 'none',
              sm: 'xl',
            }}
          >
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    value={email}
                    onChange={handleEmail}
                    id="email"
                    type="email"
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
              <HStack justify="space-between">
                <Checkbox onClick={handleRememberMe} defaultChecked>
                  Remember me
                </Checkbox>
                <Button variant="link" colorScheme="blue" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button
                  onClick={handleLogin}
                  backgroundColor={useColorModeValue('orange.200', 'teal.400')}
                  variant="ghost"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </>
  );
};

export default Login;
