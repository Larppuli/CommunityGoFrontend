import React from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { styled } from '@mui/system';

const Autofill = ({defaultText}) => {

    const StyledAutocomplete = styled(Autocomplete)({
        width: '90%',
        margin: 'auto',
        '& input': {
          width: '90%',
          padding: '10px',
          fontSize: '21px',
          borderRadius: '4px',
          border: '2px solid #ccc',
          textAlign: 'center',
          '::placeholder': { 
            textAlign: 'center',
          },
        },
      });

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
      libraries={['places']}
    >
      <StyledAutocomplete>
        <input type="text" placeholder={text}/>
      </StyledAutocomplete>
    </LoadScript>
  );
};

export default Autofill;