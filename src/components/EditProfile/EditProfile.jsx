import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  Center,
  HStack,
  Icon,
  Square,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/auth.context';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';
import { RadioCard, RadioCardGroup } from '../CreateKicks/RadioCardGroup';
const EditProfile = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [userName, setUserName] = React.useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [way, setWay] = React.useState('');
  const [tagline, setTagline] = React.useState('');
  const { getToken } = React.useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedToken = getToken();
    axios
      .get(`${process.env.REACT_APP_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setEmail(response.data.email);
        setUserName(response.data.userName);
        setTagline(response.data.tagline);
        setWay(response.data.way);
        setProfilePicture(response.data.profilePicture);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userId]);

  const handleFileInputChange = e => {
    const storedToken = getToken();
    setIsUploading(true);
    const imageData = new FormData();
    imageData.append('pictures', e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_URL}/api/upload`, imageData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(res => {
        setProfilePicture(res.data.secure_url);
        setIsUploading(false);
      })
      .catch(error => console.log(error));
  };

  const handleSubmit = e => {
    const userData = {
      userName,
      email,
      profilePicture,
      way,
      tagline,
    };

    editProfile(userData);
  };

  const editProfile = userData => {
    console.log(userData);
    const storedToken = getToken();
    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_URL}/api/user/${userId}`, userData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setLoading(false);
        navigate(`/profile/${userId}`);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return (
    <Container
      py={{
        base: '4',
        md: '8',
      }}
    >
      <Stack spacing="5">
        <Stack
          spacing="4"
          direction={{
            base: 'column',
            sm: 'row',
          }}
          justify="space-between"
        >
          <Box>
            <Text fontSize="lg" fontWeight="medium">
              Your Profile
            </Text>
            <Text color="muted" fontSize="sm">
              Tell others who you are
            </Text>
          </Box>
          <Button variant="primary" alignSelf="start">
            Save
          </Button>
        </Stack>
        <Divider />
        <Stack spacing="5" divider={<StackDivider />}>
          <FormControl id="name">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Username</FormLabel>
              <Input
                onChange={e => {
                  setUserName(e.target.value);
                }}
                maxW={{
                  md: '3xl',
                }}
                defaultValue={userName}
              />
            </Stack>
          </FormControl>
          <FormControl id="picture">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <FormLabel variant="inline">Photo</FormLabel>
              <Stack
                spacing={{
                  base: '3',
                  md: '5',
                }}
                direction={{
                  base: 'column',
                  sm: 'row',
                }}
                width="full"
                maxW={{
                  md: '3xl',
                }}
              >
                <Avatar
                  size="lg"
                  name="Christoph Winston"
                  src={profilePicture}
                />
                <Center
                  borderWidth="1px"
                  borderRadius="lg"
                  px="6"
                  py="4"
                  bg={useColorModeValue('white', 'gray.800')}
                  width={'full'}
                >
                  <VStack spacing="3">
                    <Square size="10" bg="bg-subtle" borderRadius="lg">
                      <Icon as={FiUploadCloud} boxSize="5" color="muted" />
                    </Square>
                    <VStack spacing="1">
                      <HStack spacing="1" whiteSpace="nowrap">
                        <Input
                          required
                          id="picture"
                          type="file"
                          hidden
                          defaultValue={profilePicture}
                          onChange={e => {
                            handleFileInputChange(e);
                          }}
                        />
                        <Button variant="link" colorScheme="blue" size="sm">
                          Click to upload
                        </Button>
                        <Text fontSize="sm" color="muted">
                          or drag and drop
                        </Text>
                      </HStack>
                      <Text fontSize="xs" color="muted">
                        PNG, JPG or GIF up to 2MB
                      </Text>
                    </VStack>
                  </VStack>
                </Center>
              </Stack>
            </Stack>
          </FormControl>
          <FormControl id="bio">
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '1.5',
                md: '8',
              }}
              justify="space-between"
            >
              <Box>
                <FormLabel variant="inline">Tagline</FormLabel>
                <FormHelperText mt="0" color="muted">
                  Write a short Tagline that describes you
                </FormHelperText>
              </Box>
              <Textarea
                onChange={e => {
                  setTagline(e.target.value);
                }}
                maxW={{
                  md: '3xl',
                }}
                rows={5}
                resize="none"
                value={tagline}
              />
            </Stack>
          </FormControl>
          <RadioCardGroup
            defaultValue="one"
            onChange={e => {
              setWay(e.target.value);
            }}
            spacing="3"
          >
            <Text>Your current way: {way}</Text>
            {['To Enjoy', 'To Achieve', 'To Enlighten'].map(option => (
              <RadioCard
                key={option}
                onClick={() => {
                  setWay(option);
                }}
                value={option}
              >
                <Text color="emphasized" fontWeight="medium" fontSize="sm">
                  Way: {option}
                </Text>
                <Text color="muted" fontSize="sm">
                  The way determines what your goal is on this platform.
                </Text>
              </RadioCard>
            ))}
          </RadioCardGroup>
          <Flex direction="row-reverse">
            <Button onClick={handleSubmit} variant="primary">
              Save
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Container>
  );
};

export default EditProfile;
