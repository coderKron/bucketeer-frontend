import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export const useCreateStory = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { getToken } = useContext(AuthContext);
    

const createNewStory = storyInformation => {
    const storedToken = getToken();
    setLoading(true);
    axios
    .post(`${process.env.REACT_APP_URL}/api/story/${storyInformation.journalId}`, storyInformation, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setLoading(false);
        navigate(`/journal/${storyInformation.journalId}`);
      })
      .catch(error => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setLoading(false);
        setError(true);
      });
    }

  return {createNewStory, error, loading, errorMessage}
}

