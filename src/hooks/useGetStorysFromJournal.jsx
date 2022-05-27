import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function useGetStorysFromJournal() {
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const journalId = useParams();

 

  const findJournalStory = () => {
    if (isLoggedIn) {
      setLoading(true);
      const storedToken = getToken();
      axios
        .get(`${process.env.REACT_APP_URL}/api/story/${journalId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(response => {
          setLoading(false);
          setStory(response.data);
        })
        .catch(error => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
          setLoading(false);
          setError(true);
        });
    }
  };

  return { findJournalStory, story, error, errorMessage, loading };
}
export default useGetStorysFromJournal;
