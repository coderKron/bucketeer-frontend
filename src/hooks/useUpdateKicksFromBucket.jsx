import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

export const useUpdateKicksFromBucket = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const updateKicksFromBucket = bucketDetails => {
    const bucketId = bucketDetails.bucketId;
    const storedToken = getToken();
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_URL}/api/bucket/${bucketId}/remove/kick`,
        bucketDetails,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        setLoading(false);
        toast({
          title: 'Succesfully deleted Kick from Bucket',
          status: 'success',
          isCloseable: 'true',
        });
        navigate(`/buckets`);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return { error, loading, updateKicksFromBucket };
};
