import React, { useState } from 'react';
import { Typography, Alert, Grow } from '@mui/material';
import Locations from './components/Locations';
import MapContainer from './components/MapContainer';
import MyButton from './components/Button';
import DateTimePick from './components/DateTimePick';

function App() {
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');
  const [time, setTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDestinationSelect = (destinationPlace) => {
    setDestination(destinationPlace);
  };

  const handlePickupSelect = (pickupPlace) => {
    setPickup(pickupPlace);
  };

  const handleTimeSelect = (time) => {
    console.log(time)
    setTime(time);
  };

  const handleSave = async () => {
    if (!pickup || !destination || !time) {
      setErrorMessage('Time, pickup or destination cannot be empty.');

      setTimeout(() => {
        setErrorMessage('');
      }, 4000);

      return;
    }

    const newRide = {
      destination: {
        geometry: destination.geometry,
        address_components: destination.address_components
      },
      pickup: {
        pickup: pickup.geometry,
        address_components: pickup.address_components
      },
      time: time
    }

    try {
      await fetch(`${process.env.REACT_APP_SERVER_URI}rides`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRide),
      });
      
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving ride:', error);
    };

    setErrorMessage('');
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ color: '#d4d4dc' }}>
        <b>CommunityGo</b>
      </Typography>
      <MapContainer />
      <Locations onPickupSelect={handlePickupSelect} onDestinationSelect={handleDestinationSelect}/>
      <DateTimePick onTimeSelect={handleTimeSelect}/>
      <MyButton buttonText="Save" handleClick={handleSave} />
      <Grow in={!!errorMessage} timeout={300}>
        <Alert severity="warning" variant="filled" style={{ marginTop: '10px' }}>
          {errorMessage}
        </Alert>
      </Grow>
    </div>
  );
}

export default App;