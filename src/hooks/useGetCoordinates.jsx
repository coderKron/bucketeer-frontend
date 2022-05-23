import React, { useEffect, useState } from 'react';
import axios from 'axios';

function useGetCoordinates() {
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [errorLocationMessage, setErrorLocationMessage] = useState('');

  const getLocation = (city, country) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=+${city},+${country}&key=${process.env.REACT_APP_googleKey}`;
    axios
      .get(url)
      .then(res => {
        setLat(res[0].geometry.location.lat);
        setLong(res[0].geometry.location.lng);
      })
      .catch(locationError => {
        setErrorLocationMessage(locationError.response.data.message);
      });
  };

  return { errorLocationMessage, lat, long, getLocation };
}
