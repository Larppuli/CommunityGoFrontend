import React from 'react';
import Autofill from './Autofill';
import Box from '@mui/material/Box';

// This components display two Autofill components inside a box
const Locations = () => {
    
    const handlePlaceSelected = (place) => {
        console.log('Selected place:', place);
      };

    return (
        <Box
            sx={{
                paddingTop: '6px',
                paddingBottom: '6px',
                borderRadius: '5px',
                '& > :not(style) + :not(style)': { marginTop: '6px' },
            }} style={{ display: 'grid', placeItems: 'center' }}
        >
            <Autofill defaultText="Destination" onPlaceSelected={handlePlaceSelected} />
            <Autofill defaultText="Pick-up Location" onPlaceSelected={handlePlaceSelected}/>
        </Box>
    );
};

export default Locations;