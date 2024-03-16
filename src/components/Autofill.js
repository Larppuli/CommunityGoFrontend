import React, { useRef, useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import TextField from '@mui/material/TextField';

const Autofill = ({ onPlaceSelected, defaultText }) => {
  const inputRef = useRef(null);
  const [google, setGoogle] = useState(null);

  // Initialize Google Maps Loader with the provided API key and load the 'places' library.
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
      version: 'weekly',
      libraries: ['places']
    });

    // Set the 'google' state once the loader is successfully loaded.
    loader.load().then((google) => {
      setGoogle(google);
    });
  }, []);

  useEffect(() => {
    // Set up Google Maps autocomplete functionality when the 'google' object is ready.
    if (!google) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
    
    // Listen for changes in the selected place and call 'onPlaceSelected' with the updated place.
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      onPlaceSelected(place);
    });

    // Clean up event listeners on unmount.
    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [google, onPlaceSelected]);

  // TextField component with Google Maps Autocomplete is returned
  return (
    <TextField
      inputRef={inputRef}
      label={
        <span style={{ color: '#d4d4dc' }}>{defaultText}</span>}
      variant="filled"
      fullWidth
      sx={{
        width: '100%',
        '& .MuiFilledInput-root': {
          borderColor: '#ffffff',
        },
        '& .MuiFilledInput-root:hover': {
          borderColor: '#d4d4dc', 
        },
        '& .MuiInputLabel-outlined': {
          color: '#d4d4dc',
        },
        '& .MuiFilledInput-input': {
          color: '#ffffff',
        },
      }}
    />
  );
};

export default Autofill;