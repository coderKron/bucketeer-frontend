import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { useState, useContext } from 'react';

export const useUpdateBucket = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
  const { bucketId } = useParams();

  const updateBucket = bucketDetails => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_URL}/api/bucket/${bucketId}`,
        bucketDetails,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        setLoading(false);
        navigate(`/buckets/${bucketId}`);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return { error, loading, updateBucket };
};
