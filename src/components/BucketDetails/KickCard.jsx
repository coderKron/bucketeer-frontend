import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import { useGetBucketKicks } from '../../hooks/useGetBucketKicks';

import { FavouriteButton } from './FavouriteButton';

export const KickCard = props => {
  const { findBucketKick, kicks } = useGetBucketKicks();
  const { kick, rootProps } = props;
  const { name, _id, pictures, category, description, createdBy } = kick;
  console.log(kick);

  return (
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
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({
              base: 'md',
              md: 'xl',
            })}
          />
        </AspectRatio>
        <FavouriteButton
          position="absolute"
          top="4"
          right="4"
          aria-label={`Add ${name} to your favourites`}
        />
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue('gray.700', 'gray.400')}
          >
            {name}
          </Text>
          <Text
            fontWeight={'medium'}
            color={useColorModeValue('black', 'purple')}
          >
            {createdBy}
          </Text>
        </Stack>
        <HStack>
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {category}
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button
          as={NavLink}
          to={`/kicks/${_id}`}
          colorScheme="blue"
          isFullWidth
        >
          Go to Kick
        </Button>
        <Link
          textDecoration="underline"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Delete Kick from Bucket
        </Link>
      </Stack>
    </Stack>
  );
};
