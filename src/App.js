import React, { useContext } from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Login from './components/Login/Login';
import Signup from './components/Sign-up/Signup';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/auth.context';

function App() {
  const { isLoggedIn, isLoading, user } = useContext(AuthContext);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <Navbar />
          <ColorModeSwitcher position="fixed" justifySelf="flex-end" />
          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />{' '}
              </>
            ) : (
              <Route path="/profile" element={<Profile />} />
            )}
          </Routes>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
