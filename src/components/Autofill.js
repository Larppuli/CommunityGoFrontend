import React, { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Autofill = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);
  const [google, setGoogle] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    loader.load().then((google) => {
      setGoogle(google);
    });
  }, []);

  useEffect(() => {
    if (!google) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [google, onPlaceSelected]);

  return (
    <input ref={inputRef} type="text" placeholder="Enter a location" />
  );
};

export default Autofill;