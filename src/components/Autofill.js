import React from 'react';
import Autocomplete from "react-google-autocomplete";
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)({
  width: '85%',
  padding: '10px', 
  fontSize: '16px',
  borderRadius: '4px', 
  border: '2px solid #ccc',
  textAlign: 'center',
  display: 'flex', // Use flexbox
  justifyContent: 'center', // Center horizontally
  alignItems: 'center', // Center vertically
});

const Autofill = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <StyledAutocomplete apiKey={process.env.REACT_APP_GOOGLE_API_KEY} />
    </div>
  );
};

export default Autofill;