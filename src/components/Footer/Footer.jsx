import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  Image,
  useColorMode,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { links } from './_data';
import LightLogo from '../Logos/LightLogo';
import DarkLogo from '../Logos/DarkLogo';

const Footer = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      maxW={'100%'}
      backgroundColor={mode('white', 'gray.800')}
      bg="bg-accent"
      color={mode('black', 'white')}
    >
      <Container maxW={'100%'} as="footer" role="contentinfo">
        <Stack
          justify="space-between"
          align="start"
          direction={{
            base: 'column',
            lg: 'row',
          }}
          py={{
            base: '12',
            md: '16',
          }}
          spacing="8"
        >
          <Stack
            spacing={{
              base: '6',
              md: '8',
            }}
            align="start"
          >
            {colorMode === 'light' ? (
              <Link to="/">
                <Image borderRadius={'30%'} src="/images/Daylight.png" />
              </Link>
            ) : (
              <Link to="/">
                <DarkLogo />
              </Link>
            )}
            <Text fontWeight={'bold'} color="on-accent-muted">
              Create your Bucketlists with excitement!
            </Text>
          </Stack>
          <SimpleGrid
            columns={{
              base: 2,
              md: 4,
            }}
            gap="8"
            width={{
              base: 'full',
              lg: 'auto',
            }}
          >
            {links.map((group, idx) => (
              <Stack
                key={idx}
                spacing="4"
                minW={{
                  lg: '40',
                }}
              >
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="on-accent-subtle"
                >
                  {group.title}
                </Text>
                <Stack spacing="3" shouldWrapChildren>
                  {group.links.map((link, idx) => (
                    <Button
                      key={idx}
                      as="a"
                      variant="link-on-accent"
                      href={link.href}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
        <Divider borderColor="bg-accent-subtle" />
        <Stack
          pt="8"
          pb="12"
          justify="space-between"
          direction={{
            base: 'column-reverse',
            md: 'row',
          }}
          align="center"
        >
          <Text fontSize="sm" color="on-accent-subtle">
            &copy; {new Date().getFullYear()} Bucketeer, Inc. All rights
            reserved.
          </Text>
          <ButtonGroup variant="ghost-on-accent">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
