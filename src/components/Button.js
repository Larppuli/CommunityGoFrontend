import React from 'react';
import Button from '@mui/material/Button';

const Button = ({buttonText}) => {
  return (
    <Button variant="contained" color="primary">
      {buttonText}
    </Button>
  );
};

export default Button;