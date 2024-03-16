import React from 'react';
import Autofill from './Autofill';
import Box from '@mui/material/Box';

// This components display two Autofill components inside a box
const Locations = ({ onPickupSelect, onDestinationSelect }) => {
    
    return (
        <Box
            sx={{
                borderRadius: '5px',
                '& > :not(style) + :not(style)': { marginTop: '6px' },
            }} style={{ display: 'grid', placeItems: 'center' }}
        >
            <Autofill defaultText="Destination" onPlaceSelected={onDestinationSelect} />
            <Autofill defaultText="Pick-up Location" onPlaceSelected={onPickupSelect}/>
        </Box>
    );
};

export default Locations;

