import React from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function TimePick({ onTimeSelect }) {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        label="Arrival"
        onChange={onTimeSelect}
        ampm={false}
        width= '100%'
        sx={{
            width: '100%',
            marginY: '8px',
            '& .MuiInputLabel-outlined': {
              color: 'white',
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
      />
    </LocalizationProvider>
  );
}

export default TimePick;