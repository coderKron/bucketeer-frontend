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


export function StoryCard(props) {
  const { story, journalId, rootProps } = props;
  const { title, kick, content, pictures, timestamps } = story;

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
            <Image
              src={pictures}
              alt={title}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={useBreakpointValue({
                base: 'md',
                md: 'xl',
              })}
            />
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
              {content}
            </Text>
          </Stack>
        </Stack>
        <Stack align="center"></Stack>
      </Stack>
    </>
  );
}


