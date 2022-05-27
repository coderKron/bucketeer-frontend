import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export function useGetJournalDetails() {
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const { journalId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/journal/${journalId}`)
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

  const deleteJournal = () => {
    const storedToken = getToken();
    axios
    .delete(`${process.env.REACT_APP_URL}/api/journal/${journalId}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
    .then(response => {
      navigate(`/journal/private`)
    })
    .catch(error => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });
  }

  return { journal, error, errorMessage, loading, deleteJournal };
}
