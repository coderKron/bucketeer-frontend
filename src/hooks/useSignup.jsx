import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export const useSignup = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const signup = userInformation => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}/auth/signup`, userInformation)
      .then(response => {
        setLoading(false);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/login');
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        console.log('error creating user:', errorDescription, error);
        setErrorMessage(errorDescription);
        setError(true);
        setLoading(false);
      });
  };
  return { error, errorMessage, loading, signup };
};
