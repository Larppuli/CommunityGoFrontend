import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a custom theme for the button
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
  },
});

const styles = {
  root: {
    width: '100%',
    height: "50px",
    margin: 'auto',
  },
};

const MyButton = ({ buttonText, handleClick }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" style={styles.root} onClick={handleClick}>
        {buttonText}
      </Button>
    </ThemeProvider>
  );
};

export default MyButton;