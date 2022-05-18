// src/context/auth.context.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authenticateUser();
  }, []);

  const storeToken = token => {
    localStorage.setItem('authToken', token);
  };

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  const authenticateUser = () => {
    //  <==  ADD
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${process.env.REACT_APP_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(response => {
          // If the server verifies that JWT token is valid
          const currUser = response.data;
          // Update state variables
          storeLoginDetails(currUser);
        })
        .catch(error => {
          // If the server sends an error response (invalid token)
          // Update state variables
          resetLoginDetails();
        });
    } else {
      // If the token is not available (or is removed)
      resetLoginDetails();
    }
  };

  const resetLoginDetails = () => {
    setIsLoggedIn(false);
    setIsLoading(false);
    setUser(null);
  };

  const storeLoginDetails = userInformation => {
    setIsLoggedIn(true);
    setIsLoading(false);
    setUser(userInformation);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        getToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
