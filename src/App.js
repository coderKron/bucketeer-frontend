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
import BucketSingular from './components/BucketDetails/BucketSingular';
import KicksList from './components/KicksList/KicksList';
import CreateKicks from './components/CreateKicks/CreateKicks';
import Kickdetails from './components/KickDetails/KickDetails';
import EditBucket from './components/EditBucket/EditBucket';
import EditKick from './components/EditKick/EditKick';
import EditProfile from './components/EditProfile/EditProfile';
import OurStory from './components/OurStory';
import TheJourney from './components/TheJourney';
import JournalSingular from './components/Journal/JournalSingular';
import CreateJournal from './components/CreateJournal/CreateJournal';
import CreateStory from './components/CreateStory/CreateStory';
import JournalAll from './components/Journal/JournalAll';
import JournalListPrivate from './components/Journal/JournalPrivate';

function App() {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection="column" height="100%" width={'100%'}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user/:userId"
            element={
              <IsPrivate>
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
            path="/buckets/create"
            element={
              <IsPrivate>
                <CreateBucket />
              </IsPrivate>
            }
          />
          <Route
            path="/buckets/:bucketId"
            element={
              <IsPrivate>
                <BucketSingular />
              </IsPrivate>
            }
          />
          <Route
            path="/kicks"
            element={
              <IsPrivate>
                <KicksList />
              </IsPrivate>
            }
          />
          <Route
            path="/kicks/create"
            element={
              <IsPrivate>
                <CreateKicks />
              </IsPrivate>
            }
          />
          <Route
            path="/kicks/:kickId"
            element={
              <IsPrivate>
                <Kickdetails />
              </IsPrivate>
            }
          />
          <Route
            path="/buckets/:bucketId/edit"
            element={
              <IsPrivate>
                <EditBucket />
              </IsPrivate>
            }
          />
          <Route
            path="/kicks/:kickId/edit"
            element={
              <IsPrivate>
                <EditKick />
              </IsPrivate>
            }
          />
          <Route
            path="/user/:userId/edit"
            element={
              <IsPrivate>
                <EditProfile />
              </IsPrivate>
            }
          />
          <Route path="/journal/:journalId" element={<JournalSingular />} />
          <Route
            path="/journal/create"
            element={
              <IsPrivate>
                <CreateJournal />
              </IsPrivate>
            }
          />
          <Route
            path="/journal/story/:journalId"
            element={
              <IsPrivate>
                <CreateStory />
              </IsPrivate>
            }
          />
          <Route
            path="/journal/private"
            element={
              <IsPrivate>
                <JournalListPrivate />
              </IsPrivate>
            }
          />
          <Route path="/journal/public" element={<JournalAll />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/journey" element={<TheJourney />} />
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
