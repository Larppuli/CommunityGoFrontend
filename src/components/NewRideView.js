import React, { useState } from 'react';
import { Typography, Alert, Grow } from '@mui/material';
import Locations from './InputContainer';
import MapContainer from './MapContainer';
import MyButton from './Button';
import dayjs from 'dayjs';

function NewRideView() {
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleDestinationSelect = (destinationPlace) => {
    setDestination(destinationPlace);
  };

  const handlePickupSelect = (pickupPlace) => {
    setPickup(pickupPlace);
  };

  const handleTimeSelect = (time) => {
    const newTime = dayjs(time);
    setTime(newTime);
  };

  const handleSave = async () => {
    if (!pickup || !destination || !time) {
      setMessage('Time, pickup, or destination cannot be empty.');
      setSeverity("warning");
    } else {
      setMessage('Ride request was sent.');
      setSeverity("success");
    }

    if (destination && pickup && time) {
        const newRide = {
          destination: {
              geometry: destination.geometry,
              address_components: destination.address_components,
              name: destination.name
          },
          pickup: {
              geometry: pickup.geometry,
              address_components: pickup.address_components,
              name: pickup.name
          },
          time: time,
          waypoints: []
        }

        try {
          await fetch(`${process.env.REACT_APP_SERVER_URI}rides`, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(newRide),
        });
        } catch (error) {
          console.error('Error saving ride:', error);
        };
    };

    setTimeout(() => {
        setMessage('');
      }, 4000);
};

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ color: 'white' }}>
        <b>CommunityGo</b>
      </Typography>
      <MapContainer />
      <Locations onPickupSelect={handlePickupSelect} onDestinationSelect={handleDestinationSelect} onTimeSelect={handleTimeSelect} />
      <MyButton buttonText="Save" handleClick={handleSave} backgroundColor="#381494" margin="auto" width="100%" height="50px"/>
      <Grow in={!!message} timeout={300}>
        <Alert severity={severity} variant="filled" style={{ marginTop: '10px' }}>
          {message}
        </Alert>
      </Grow>
    </div>
  );
}

export default NewRideView;