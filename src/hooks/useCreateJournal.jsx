import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const useCreateJournal = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { getToken } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();

  const createNewJournal = journalInformation => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_URL}/api/journal`, journalInformation,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        setLoading(false);
        toast({
          title: 'Succesfully added Journal to Bucket',
          status: 'success',
          isCloseable: 'true',
        });
        navigate('/');
      })
      .catch(() => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(true);
      });
  };
  return { createNewJournal, loading, error, errorMessage };
};
