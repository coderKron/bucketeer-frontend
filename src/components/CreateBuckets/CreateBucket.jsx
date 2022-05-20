import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { useCreateBucket } from '../../hooks/useCreateNewBucket';

function CreateBucket() {
  const [picture, setPicture] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { error, errorMessage, loading, createNewBucket } = useCreateBucket;
  const handleSubmit = e => {
    e.preventDefault();
    createNewBucket({
      name: title,
      description,
      pictures: picture,
    });
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
                    required={true}
                    id="picture"
                    type={'file'}
                    value={picture}
                    onChange={e => {
                      setPicture(e.target.files[0]);
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

export default CreateBucket;
