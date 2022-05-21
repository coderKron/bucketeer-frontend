import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function useGetBucketKicks() {
  const [kicks, setKicks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getToken, isLoggedIn } = useContext(AuthContext);
  const kickId = useParams();

  const findBucketKick = kickId => {
    if (isLoggedIn) {
      setLoading(true);
      const storedToken = getToken();
      axios
        .get(`${process.env.REACT_APP_URL}/api/kick/${kickId}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(response => {
          setLoading(false);
          setKicks(response.data);
        })
        .catch(error => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
          setLoading(false);
          setError(true);
        });
    }
  };

  return { findBucketKick, kicks, error, errorMessage, loading };
}
