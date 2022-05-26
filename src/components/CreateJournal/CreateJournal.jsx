import React, { useState } from 'react';
import { useCreateJournal } from '../../hooks/useCreateJournal';
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
  Select,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useGetBuckets } from '../../hooks/useGetBuckets';

function CreateJournal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [bucketId, setBucketId] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const { error, errorMessage, createNewJournal } = useCreateJournal();
  const { buckets } = useGetBuckets();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = e => {
    const journalData = {
      title,
      bucketId,
      visibility,
    };
    createNewJournal(journalData);
    console.log(journalData);
    setTitle('');
    setDescription('');
    setBucketId('');
    setVisibility('');
  };

  return (
    <>
      {error && (
        <Alert textAlign={'center'} justifyContent={'center'} status="error">
          <AlertIcon />
          <AlertTitle>Could not Create Journal:</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      <Image src="/images/start-writing.png" alt="start writing" />
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
                Create A Journal
              </Text>
              <Text color="muted" fontSize="sm">
                Write about your experiences
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
                  defaultValue="My New Journal"
                />
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
                  <FormLabel variant="inline">About your Journal</FormLabel>
                  <FormHelperText mt="0" color="muted">
                    Write about your Journal, perhaps some goals or dreams you
                    hope to write about
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
            <Select onChange={e => {
                setBucketId(e.target.value)
            }}spacing="3">
              <option value={'select Bucket'}>Select your Bucket</option>
              {buckets.map(option => (
                <option
                  key={option._id}           
                  value={option._id}
                >
                  Bucket: {option.name}
                </option>
              ))}
            </Select>
            <FormControl>
              <Stack>
                <Select
                  placeholder="Choose Visibility"
                  onChange={e => {
                    setVisibility(e.target.value);
                  }}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </Select>
              </Stack>
            </FormControl>
            <Flex justifyContent={'space-around'} direction="row-reverse">
              <Button
                backgroundColor={mode('green.500')}
                onClick={handleSubmit}
                type="submit"
                variant="solid"
              >
                Create New Journal!
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

export default CreateJournal;
