import React from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function TimePick({ onTimeSelect }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Select pickup time"
        onChange={onTimeSelect}
        ampm={false}
        width= '100%'
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
      />
    </LocalizationProvider>
  );
}

export default TimePick;