import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export const useCreateBucket = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const createNewBucket = bucketInformation => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_URL}/api/bucket`, bucketInformation, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setLoading(false);
        navigate('/buckets');
      })
      .catch(() => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(true);
      });
  };

  return { error, loading, createNewBucket, errorMessage };
};
