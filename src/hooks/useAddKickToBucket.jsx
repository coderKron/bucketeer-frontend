import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { useToast } from '@chakra-ui/react';

export const useAddKickToBucket = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const addKickToBucket = bucketInformation => {
    const bucketId = bucketInformation.bucketId;
    console.log(bucketId);
    const storedToken = getToken();
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_URL}/api/bucket/${bucketInformation.bucketId}/add`,
        bucketInformation,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        setLoading(false);
        toast({
          title: 'Succesfully added Kick to Bucket',
          status: 'success',
          isCloseable: 'true',
        });
      })
      .catch(() => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(true);
      });
  };

  return { error, loading, addKickToBucket, errorMessage };
};
