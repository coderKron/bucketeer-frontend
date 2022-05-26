import axios from 'axios';
import { useState, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export function useGetJournalDetails() {
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const { journalId } = useParams();

  useEffect(() => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/journal/${journalId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setLoading(false);
        setJournal(response.data);
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(false);
      });
  }, [getToken, journalId, isLoggedIn]);

  return { journal, error, errorMessage, loading };
}


