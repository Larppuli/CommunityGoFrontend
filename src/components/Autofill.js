import React from 'react';
import Autocomplete from "react-google-autocomplete";

const Autofill = () => {

  return (
    <div>
        <Autocomplete apiKey={process.env.REACT_APP_GOOGLE_API_KEY}/>;
    </div>
  );
};

export default Autofill;