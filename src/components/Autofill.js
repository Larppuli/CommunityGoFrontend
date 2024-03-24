import React, { useRef, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const Autofill = ({ onPlaceSelected, defaultText, margin, loader }) => {
  const inputRef = useRef(null);
  const [google, setGoogle] = useState(null);

  // Initialize Google Maps Loader with the provided API key and load the 'places' library.
  useEffect(() => {

    // Set the 'google' state once the loader is successfully loaded.
    loader.load().then((google) => {
      setGoogle(google);
    });
  }, [loader]);

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
  }, [google, onPlaceSelected, loader]);

  // TextField component with Google Maps Autocomplete is returned
  return (
    <TextField
      inputRef={inputRef}
      label={
        <span style={{ color: 'white' }}>{defaultText}</span>}
      variant="filled"
      sx={{
        width: '100%',
        marginBottom: margin,
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