import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

export const useUpdateStorysFromJournal = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);

  const updateStorysFromJournal = journalDetails => {
    const journalId = journalDetails.journalId;
    const storedToken = getToken();
    setLoading(true);
    axios
      .put(
        `${process.env.REACT_APP_URL}/api/journal/${journalId}/remove/story`,
        journalDetails,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then(() => {
        setLoading(false);
        toast({
          title: 'Succesfully deleted Story from Journal',
          status: 'success',
          isCloseable: 'true',
        });
        navigate(`/journal/private`);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return { error, loading, updateStorysFromJournal };
};
