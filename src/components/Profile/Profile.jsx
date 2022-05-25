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
import { Link, useNavigate, NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading';

const HandleColor = () => {
  return useColorModeValue('gray.600', 'gray.400');
};

const Profile = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoggedIn, getToken, isLoading } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState(null);
  const [user, setUser] = React.useState(undefined);
  const [email, setEmail] = React.useState(null);
  const [profilePicture, setProfilePicture] = React.useState(null);
  const [way, setWay] = React.useState(null);
  const [tagline, setTagline] = React.useState(null);
  const { userId } = useParams();

  React.useEffect(() => {
    const storedToken = getToken();
    axios
      .get(`${process.env.REACT_APP_URL}/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setUser(response.data);
        setEmail(response.data.email);
        setUserName(response.data.userName);
        setTagline(response.data.tagline);
        setWay(response.data.way);
        setProfilePicture(response.data.profilePicture);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <>
      {user ? (
        <>
          {isLoggedIn ? (
            <Box as="section" pt="20" pb="12" position="relative">
              <Box
                position="absolute"
                inset="0"
                height="32"
                backgroundImage={'/images/profile-banner.png'}
              />
              <CardWithAvatar
                maxW="xl"
                avatarProps={{
                  src: `${profilePicture}`,
                  name: `${userName}`,
                }}
                action={
                  <Link>
                    {' '}
                    <Button
                      as={NavLink}
                      to={`/user/${user._id}/edit`}
                      size="sm"
                      leftIcon={<HiPencilAlt />}
                    >
                      Edit
                    </Button>
                  </Link>
                }
              >
                <CardContent>
                  <Heading
                    size="lg"
                    fontWeight="extrabold"
                    letterSpacing="tight"
                  >
                    {userName}
                  </Heading>
                  <Text>Way: {way}</Text>
                  <Text color={HandleColor}>{tagline}</Text>
                </CardContent>
              </CardWithAvatar>
            </Box>
          ) : (
            navigate('/login')
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
