import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

export function useUploadPicture() {
  const storedToken = getToken();
  const { getToken } = useContext(AuthContext);
  const handleUpload = file => {
    axios
      .post(`${process.env.REACT_APP_URL}/api/upload`, file, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(res => res.data)
      .catch(error => console.log(error));
  };

  return { handleUpload };
}
