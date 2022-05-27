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
  useColorModeValue as mode,
  MenuList,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiMenu } from 'react-icons/fi';
import { ResourcesPopover } from './RourcesPopover';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import DarkLogo from '../Logos/DarkLogo';
import LightLogo from '../Logos/LightLogo';
import { ResourcesPopoverBuckets } from './RourcesPopoverBuckets';
import { ResourcesPopoverKicks } from './RourcesPopoverKicks';
import { ResourcesPopoverJournals } from './RourcesPopoverJournals';

const Navbar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  const { colorMode } = useColorMode();

  const { isLoggedIn, isLoading, logOutUser, user } =
    React.useContext(AuthContext);

  return (
    <Box
      minH={'auto'}
      maxH="80px"
      backgroundColor={mode('orange.400', 'blue.900')}
      as="section"
      width="100%"
    >
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={mode('sm', 'sm-dark')}
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
                      <Button as={NavLink} to="/journey" color="white">
                        The Journey
                      </Button>
                      <Button as={NavLink} to="/story" color="white">
                        Our story
                      </Button>

                      <ResourcesPopoverBuckets />
                      <ResourcesPopoverKicks />
                      <ResourcesPopoverJournals />
                    </ButtonGroup>
                    <HStack spacing="3">
                      <Button
                        as={NavLink}
                        to={`/user/${user._id}`}
                        color="white"
                        variant="ghost"
                      >
                        Profile
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
                      <Button as={NavLink} to="/journey" color="white">
                        The Journey
                      </Button>
                      <Button as={NavLink} to="/story" color="white">
                        Our story
                      </Button>
                      <Button as={NavLink} to="/journal/public" color="white">
                        Public Journals
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup spacing="3">
                      <Button
                        as={NavLink}
                        to="/login"
                        color="white"
                        variant="ghost"
                      >
                        Login
                      </Button>

                      <Button
                        as={NavLink}
                        to="/signup"
                        variant="ghost"
                        color="white"
                      >
                        Sign up
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
                    <MenuItem as={NavLink} to="/journey">
                      The Journey
                    </MenuItem>
                    <MenuItem as={NavLink} to={'/story'}>
                      Our story
                    </MenuItem>
                    <MenuItem as={NavLink} to="/buckets">
                      Buckets
                    </MenuItem>
                    <MenuItem as={NavLink} to="/kicks">
                      Kicks
                    </MenuItem>
                    <MenuItem as={NavLink} to="/journal/private">
                      Private: Journals
                    </MenuItem>
                    <MenuItem as={NavLink} to="/journal/public">
                      Public: Journals
                    </MenuItem>
                    <MenuItem as={NavLink} to={`/user/${user._id}`}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={logOutUser}>Log out</MenuItem>
                  </MenuList>
                )}
                {!isLoggedIn && !isLoading && (
                  <MenuList>
                    <MenuItem as={NavLink} to="/journey">
                      The Journey
                    </MenuItem>
                    <MenuItem as={NavLink} to={'/story'}>
                      Our story
                    </MenuItem>
                    <MenuItem as={NavLink} to="/journal/public">
                      Public: Journals
                    </MenuItem>
                    <MenuItem as={NavLink} to="/login">
                      Login
                    </MenuItem>
                    <MenuItem as={NavLink} to="/signup">
                      Sign up
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
