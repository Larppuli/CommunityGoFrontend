import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const MyButton = ({ buttonText, handleClick, backgroundColor, marginBottom, width, height }) => {

  // Create a custom theme for the button
const theme = createTheme({
  palette: {
    primary: {
      main: backgroundColor,
    },
  },
  root: {
    width: width,
    height: height,
    marginBottom: marginBottom,
    color: 'white'
  },
});

  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary" style={theme.root} onClick={handleClick}>
        {buttonText}
      </Button>
    </ThemeProvider>
  );
};

export default MyButton;