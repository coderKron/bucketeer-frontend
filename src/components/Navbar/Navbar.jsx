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
  Icon,
} from '@chakra-ui/react';
import * as React from 'react';
import { FiMenu } from 'react-icons/fi';
import { ResourcesPopover } from './RourcesPopover';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  return (
    <Box backgroundColor="red.500" as="section" position="static" width="100%">
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
      >
        <Container
          py={{
            base: '4',
            lg: '5',
          }}
        >
          <HStack spacing="10" justify="space-between">
            {isDesktop ? (
              <>
                <ButtonGroup variant="link" spacing="8">
                  <Button color="white">Buckets</Button>
                  <Button color="white">About</Button>
                  <ResourcesPopover />
                  <Button color="white" variant="link">
                    something
                  </Button>
                </ButtonGroup>
                <HStack spacing="3">
                  <Button variant="ghost">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="ghost">
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </HStack>
              </>
            ) : (
              <Menu>
                <MenuButton as={IconButton} icon={<FiMenu />} />

                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;
