import React, { useContext, useState } from 'react';
import {
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
  Image,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  useBreakpointValue,
  Select,
} from '@chakra-ui/react';
import { useCreateStory } from '../../hooks/useCreateStory';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';
import { useGetSelectKicks } from '../../hooks/useGetSelectKicks';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router';

function CreateStory() {
  const [title, setTitle] = useState('');
  const [kickId, setKickId] = useState('');
  const [content, setContent] = useState('');
  const [pictures, setPictures] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { error, errorMessage, loading, createNewStory } = useCreateStory();
  const { getToken, user } = useContext(AuthContext);
  const { kicks } = useGetSelectKicks();
  const storedToken = getToken();
  const { journalId } = useParams();

  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });

  console.log(kicks);

  const handleSubmit = e => {
    const storyData = {
      title,
      kickId,
      content,
      pictures,
      journalId,
    };
    console.log(storyData);
    createNewStory(storyData);

    setTitle('');
    setKickId('');
    setContent('');
    setPictures(null);
  };

  const handleFileInputChange = e => {
    setIsUploading(true);
    const imageData = new FormData();
    imageData.append('pictures', e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_URL}/api/upload`, imageData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(res => {
        setPictures(res.data.secure_url);
        setIsUploading(false);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      {error && (
        <Alert textAlign={'center'} justifyContent={'center'} status="error">
          <AlertIcon />
          <AlertTitle>Could not Create Story:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Image src="/images/start-writing.png" alt="start writing" />
      <Container
        py={{
          base: '6',
          md: '8',
        }}
        maxW={isDesktop ? '60%' : '100%'}
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
                Write a story
              </Text>
              <Text color="muted" fontSize="sm">
                Share your dreams
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
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                  maxW={{
                    md: '3xl',
                  }}
                  placeholder={'Yours story title'}
                />
              </Stack>
            </FormControl>

            {/* <Select spacing="3">
              <option
                onChange={e => {
                  setKickId(e.target.value);
                }}
                value={'select Kick'}
              >
                Select your Kick
              </option>
              {kicks?.map(option => {
                return (
                    <option key={option._id} value={option._id}>
                  Kick: {option.name}
                </option>)
                }
                )}
               */}
            {/* </Select> */}
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
                <FormLabel variant="inline">Your best pic</FormLabel>
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
                    required={true}
                    id="pictures"
                    defaultValue={pictures}
                    type="file"
                    onChange={e => {
                      handleFileInputChange(e);
                    }}
                  />
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
                  <FormLabel variant="inline">Story</FormLabel>
                  <FormHelperText mt="0" color="muted">
                    Write what you did, share your experiences.
                  </FormHelperText>
                </Box>
                <Textarea
                  value={content}
                  onChange={e => {
                    setContent(e.target.value);
                  }}
                  maxW={{
                    md: '3xl',
                  }}
                  rows={9}
                  resize="none"
                />
              </Stack>
            </FormControl>

            <Flex direction="row-reverse">
              <Button onClick={handleSubmit} type="submit" variant="primary">
                Save
              </Button>
            </Flex>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
export default CreateStory;
