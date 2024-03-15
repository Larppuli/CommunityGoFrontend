import React from 'react';
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

function DateTimePick({ onTimeSelect }) {
    
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimePicker
        textField={(props) => <TextField {...props} />}
        label="Latest time for arrival"
        onChange={onTimeSelect}
        ampm={false}
        sx={{
          width: '100%',
          marginY: '8px',
          '& .MuiInputLabel-outlined': {
            color: '#d4d4dc',
          },
          '& .MuiInputBase-input': {
            color: '#d4d4dc',
          },
        }}
        InputProps={{
          style: {
            color: '#d4d4dc',
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default DateTimePick;