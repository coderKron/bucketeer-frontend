import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { useState, useContext } from 'react';

export const useUpdateKick = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { getToken } = useContext(AuthContext);
  const { kickId } = useParams();

  const updateKick = kickDetails => {
    const storedToken = getToken();
    setLoading(true);
    axios
      .put(`${process.env.REACT_APP_URL}/api/kick/${kickId}`, kickDetails, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        setLoading(false);
        navigate(`/kicks/${kickId}`);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  return { error, loading, updateKick };
};
