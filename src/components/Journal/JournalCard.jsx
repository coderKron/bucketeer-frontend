import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { StoryCard } from './StoryCard';

export function JournalCard(props) {
  const { journal, rootProps } = props;
  const { title, visibility, story } = journal;

  return (
    <>
      <Stack
        spacing={useBreakpointValue({
          base: '4',
          md: '5',
        })}
        {...rootProps}
      >
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            {/* <Image
              src={picture}
              alt={title}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({
                base: 'md',
                md: 'xl',
              })}
            /> */}
            {/* {story?.map(story) => {
              return (
                 <StoryCard/>
              )
            }}
            */}
          </AspectRatio>
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text
              fontWeight="bold"
              color={useColorModeValue('gray.700', 'gray.300')}
            >
              {title}
            </Text>
            <Text
              fontWeight={'medium'}
              color={useColorModeValue('black', 'white')}
            >
              {visibility}
            </Text>
          </Stack>
        </Stack>
        <Stack align="center"></Stack>
      </Stack>
    </>
  );
}
