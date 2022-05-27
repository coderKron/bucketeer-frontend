import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';


export function useGetAllJournalsPrivate() {
  const [loading, setLoading] = useState(false);
  const [journal, setJournal] = useState([{}]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { getToken } = useContext(AuthContext);


  useEffect(() => {
    setLoading(true);
    const storedToken = getToken();
    axios
      .get(`${process.env.REACT_APP_URL}/api/journal/private`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(response => {
        setLoading(false);
        setJournal(response.data);
        console.log(response.data);
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
