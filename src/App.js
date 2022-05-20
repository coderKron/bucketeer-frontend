import React, { useContext } from 'react';
import { ChakraProvider, Box, Flex, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Login from './components/Login/Login';
import Signup from './components/Sign-up/Signup';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/auth.context';
import Homepage from './components/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import IsPrivate from './components/IsPrivate';
import Bucket from './components/BucketList/Bucket';
import CreateBucket from './components/CreateBuckets/CreateBucket';
import BucketDetails from './components/BucketList/BucketDetails';

function App() {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection="column" height="100%" width={'100%'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />{' '}
          <Route
            path="/profile/:profileId"
            element={
              <IsPrivate>
                {' '}
                <Profile />
              </IsPrivate>
            }
          />
          <Route
            path="/buckets"
            element={
              <IsPrivate>
                <Bucket />
              </IsPrivate>
            }
          />
          <Route
            path="/bucket/create"
            element={
              <IsPrivate>
                <CreateBucket />
              </IsPrivate>
            }
          />
          <Route
            path="/bucket/:id"
            element={
              <IsPrivate>
                <BucketDetails />
              </IsPrivate>
            }
          />
        </Routes>
        <Grid>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
