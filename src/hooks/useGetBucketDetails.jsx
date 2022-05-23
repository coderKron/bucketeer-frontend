import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function useGetBucketDetails() {
  const [bucket, setBucket] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { bucketId } = useParams();
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/bucket/${bucketId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setLoading(false);
        setBucket(response.data);
      })
      .error(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(false);
      });
  }, [getToken, bucketId, isLoggedIn]);

  const deleteBucket = () => {
    const storedToken = getToken();
    axios
      .delete(`${process.env.REACT_APP_URL}/bucket/delete/${bucketId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        navigate('/buckets');
      });
  };

  return { bucket, error, errorMessage, loading, deleteBucket };
}
