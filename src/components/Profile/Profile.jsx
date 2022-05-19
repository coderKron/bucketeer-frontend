import {
  Box,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { CardContent } from './CardContent';
import { CardWithAvatar } from './CardWithAvatar';
import { UserInfo } from './UserInfo';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';

const HandleColor = () => {
  return useColorModeValue('gray.600', 'gray.400');
};

const Profile = () => {
  const { isLoggedIn, isLoading, user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(null);

  const [email, setEmail] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [way, setWay] = React.useState(null);
  const [tagline, setTagline] = React.useState(null);

  React.useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUserName(user.userName);
      setProfilePicture(user.setProfilePicture);
      setWay(user.way);
      setTagline(user.tagline);
    }
  });
  return (
    <>
      {isLoggedIn ? (
        <Box as="section" pt="20" pb="12" position="relative">
          <Box position="absolute" inset="0" height="32" bg="blue.600" />
          <CardWithAvatar
            maxW="xl"
            avatarProps={{
              src: `${profilePicture}`,
              name: `${userName}`,
            }}
            action={
              <Button size="sm" leftIcon={<HiPencilAlt />}>
                Edit
              </Button>
            }
          >
            <CardContent>
              <Heading size="lg" fontWeight="extrabold" letterSpacing="tight">
                {user.userName}
              </Heading>
              <Text color={HandleColor}>{tagline}</Text>
            </CardContent>
          </CardWithAvatar>
        </Box>
      ) : (
        navigate('/login')
      )}
    </>
  );
};

export default Profile;
