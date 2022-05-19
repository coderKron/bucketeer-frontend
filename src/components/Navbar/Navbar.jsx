import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  MenuButton,
  Menu,
  MenuItem,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  MenuList,
  Flex,
  Image,
  Icon,
  Center,
  useColorMode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiMenu } from 'react-icons/fi';
import { ResourcesPopover } from './RourcesPopover';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import DarkLogo from '../Logos/DarkLogo';
import LightLogo from '../Logos/LightLogo';

const Navbar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  const { colorMode, toggleColorMode } = useColorMode();

  const backgroundColorFunc = () => {
    if (colorMode === 'light') {
      return '#ff1616';
    } else {
      return 'black';
    }
  };

  const { isLoggedIn, isLoading, logOutUser, user } =
    React.useContext(AuthContext);

  return (
    <Box
      minH={'auto'}
      maxH="80px"
      backgroundColor={backgroundColorFunc}
      as="section"
      width="100%"
    >
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        width="100%"
        maxH={'80px'}
      >
        <Container
          maxWidth={'100%'}
          maxH="80px"
          py={{
            base: '4',
            lg: '5',
          }}
        >
          <HStack spacing="10" justify="space-between">
            {colorMode === 'light' ? (
              <Link to="/">
                <LightLogo />
              </Link>
            ) : (
              <Link to="/">
                <DarkLogo />
              </Link>
            )}
            {isDesktop ? (
              <>
                {isLoggedIn && !isLoading && (
                  <Flex justify={'space-between'} flex="1">
                    <ButtonGroup variant="link" spacing="8">
                      <Button color="white">Buckets</Button>
                      <Button color="white">About</Button>
                      <ResourcesPopover />
                      <Button color="white" variant="link">
                        something
                      </Button>
                    </ButtonGroup>
                    <HStack spacing="3">
                      <Button color="white" variant="ghost">
                        <Link to="/:profileId">Profile</Link>
                      </Button>
                      <Button
                        onClick={logOutUser}
                        variant="ghost"
                        color="white"
                      >
                        Log out
                      </Button>
                    </HStack>
                  </Flex>
                )}
                {!isLoggedIn && !isLoading && (
                  <HStack justify={'space-between'} spacing="8" flex="1">
                    <ButtonGroup variant="link" spacing="8">
                      <Button color="white">The Journey</Button>
                      <Button color="white">About us</Button>
                      <ResourcesPopover />
                      <Button color="white" variant="link">
                        Team
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup spacing="3">
                      <Button color="white" variant="ghost">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button variant="ghost" color="white">
                        <Link to="/signup">Sign up</Link>
                      </Button>
                    </ButtonGroup>
                  </HStack>
                )}
              </>
            ) : (
              <Menu>
                <MenuButton as={IconButton} icon={<FiMenu />} />
                {isLoggedIn && !isLoading && (
                  <MenuList>
                    <MenuItem>Home</MenuItem>
                    <MenuItem>The Journey</MenuItem>
                    <MenuItem>About us</MenuItem>
                    <MenuItem>Team</MenuItem>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem onClick={logOutUser}>Log out</MenuItem>
                  </MenuList>
                )}
                {!isLoggedIn && !isLoading && (
                  <MenuList>
                    <MenuItem>Home</MenuItem>
                    <MenuItem>The Journey</MenuItem>
                    <MenuItem>About us</MenuItem>
                    <MenuItem>Team</MenuItem>
                    <MenuItem>
                      <Link to="/login">Login</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/signup">Sign up</Link>
                    </MenuItem>
                  </MenuList>
                )}
              </Menu>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
