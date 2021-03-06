import React, { useContext, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  useColorModeValue as mode,
  FormLabel,
  FormErrorMessage,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  Image,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useCreateBucket } from '../../hooks/useCreateBucket';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

function CreateBucket() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isUploading, setIsUploading] = useState(false);

  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { error, errorMessage, loading, createNewBucket } = useCreateBucket();
  const { getToken } = useContext(AuthContext);
  const storedToken = getToken();
  const isError = picture === null

  const handleFileInputChange = e => {
    setIsUploading(true);
    const imageData = new FormData();
    imageData.append('pictures', e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_URL}/api/upload`, imageData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(res => {
        setPicture(res.data.secure_url);
        setIsUploading(false);
      })
      .catch(error => console.log(error));
  };

  const handleSubmit = e => {
    const bucketData = {
      name: title,
      description,
      picture,
    };
    createNewBucket(bucketData);
    setTitle('');
    setDescription('');
    setPicture(null);
  };

  return (
    <>
      {error && (
        <Alert textAlign={'center'} justifyContent={'center'} status="error">
          <AlertIcon />
          <AlertTitle>Could not Create Bucket:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Image src="/images/Experience-Freedom.png" alt="experience freedom" />
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
                Create Bucket
              </Text>
              <Text color="muted" fontSize="sm">
                Bring reality to the dream.
              </Text>
            </Box>
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
                <FormLabel variant="inline">Title</FormLabel>
                <Input
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                  maxW={{
                    md: '3xl',
                  }}
                  defaultValue="Walking in Amazones"
                />
              </Stack>
            </FormControl>

            <FormControl id="picture"
            isInvalid={isError}
            >
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
                <FormLabel variant="inline">Picture of Experience</FormLabel>
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
                  <Input
                    required
                    id="pictures"
                    type="file"
                    defaultValue={picture}
                    onChange={e => {
                      handleFileInputChange(e);
                    }}
                  />
                  {!isError ? (
                     <FormHelperText>
                      
                    </FormHelperText> 
                  ) : (
                    <FormErrorMessage> Required </FormErrorMessage>
                  )}
                  )
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
                  <FormLabel variant="inline">Bio</FormLabel>
                  <FormHelperText mt="0" color="muted">
                    Write what you wanna achieve in this Bucket? Which catergory
                    Kicks. Or what country for example.
                  </FormHelperText>
                </Box>
                <Textarea
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                  maxW={{
                    md: '3xl',
                  }}
                  rows={5}
                  resize="none"
                />
              </Stack>
            </FormControl>
            <Flex justifyContent={'space-around'} direction="row-reverse">
              <Button
                backgroundColor={mode('green.500')}
                onClick={handleSubmit}
                type="submit"
                variant="solid"
              >
                Save
              </Button>
              <Button
                backgroundColor={mode('orange.500')}
                as={NavLink}
                to="/buckets"
                variant="solid"
              >
                Go Back
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default CreateBucket;
