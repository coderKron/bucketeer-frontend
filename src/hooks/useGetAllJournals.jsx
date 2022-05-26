import axios from 'axios';
import { useState, useEffect } from 'react';

export function useGetJournalDetails() {
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {

    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_URL}/api/journal/public`)
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
  }, []);

  return { journal, error, errorMessage, loading };
}


