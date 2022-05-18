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
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { GoogleIcon } from './ProviderIcons';
import { GitHubIcon } from './ProviderIcons';
import { FaPlaneDeparture } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [firstname, setFirstname] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const { isLoggedIn, isLoading, user } = React.useContext(AuthContext);
  const { error, loading, signup } = useSignup();

  const handleFirstname = e => setFirstname(e.target.value);
  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);
  const handleLastname = e => setLastname(e.target.value);

  const icon = useColorModeValue('gray.600', 'gray.600');

  const handleSignup = e => {
    e.preventDefault();
    const userInformation = {
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email,
    };
    console.log(userInformation);
    signup(userInformation);
  };

  return (
    <Container
      maxW="md"
      py={{
        base: '12',
        md: '24',
      }}
    >
      <Stack spacing="8">
        <Stack spacing="6" align="center">
          <Icon as={FaPlaneDeparture} />
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
                <FormLabel htmlFor="firstname">First name</FormLabel>
                <Input
                  onChange={handleFirstname}
                  id="firstname"
                  value={firstname}
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="lastname">Last name</FormLabel>
                <Input
                  onChange={handleLastname}
                  id="lastname"
                  value={lastname}
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
              <Button onClick={handleSignup} variant="primary">
                Create account
              </Button>
              <Button
                variant="secondary"
                leftIcon={<GoogleIcon boxSize="5" />}
                iconSpacing="3"
              >
                Sign up with Google
              </Button>
              <Button
                variant="secondary"
                leftIcon={<GitHubIcon boxSize="5" />}
                iconSpacing="3"
              >
                Sign up with Github
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
  );
};
export default Signup;
