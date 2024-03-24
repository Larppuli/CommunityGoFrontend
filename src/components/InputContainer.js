import React from 'react';
import Autofill from './Autofill';
import Box from '@mui/material/Box';
import TimePick from './TimePick';

// This components display two Autofill components and a TimePick component inside a box
const Locations = ({ onPickupSelect, onDestinationSelect, onTimeSelect, loader }) => {
    
    return (
        <Box
            sx={{
                borderRadius: '5px',
                '& > :not(style) + :not(style)': { marginTop: '6px' },
            }} style={{ display: 'grid', placeItems: 'center' }}
        >
            <Autofill defaultText="Destination" onPlaceSelected={onDestinationSelect} loader={loader} />
            <Autofill defaultText="Pick-up Location" onPlaceSelected={onPickupSelect} loader={loader} />
            <TimePick onTimeSelect={onTimeSelect}/>
        </Box>
    );
};

export default Locations;

