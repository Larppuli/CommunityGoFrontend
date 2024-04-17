import React, { useState } from 'react';
import { Typography, Alert, Grow } from '@mui/material';
import InputContainer from './InputContainer';
import MyButton from './Button';
import dayjs from 'dayjs';
import MapContainer from './MapContainer';
import axios from 'axios';

function NewRideView({ loader }) {
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [buttonText, setButtonText] = useState('Request Ride');

  const handleDestinationSelect = (destinationPlace) => {
    setDestination(destinationPlace);
    calculatePrice(destinationPlace)
  };

  const handlePickupSelect = (pickupPlace) => {
    setPickup(pickupPlace);
    calculatePrice(pickupPlace)
  };

  const handleTimeSelect = (time) => {
    const newTime = dayjs(time);
    setTime(newTime);
  };

  const calculatePrice =  async (place) => {
    // Checking if pickup textfield is filled first
    if (pickup) {
      try {
        const rideData = {
            pickup: {lat: pickup.geometry.location.lat(), lng: pickup.geometry.location.lng()},
            destination: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
          };
        const response = await axios.post('http://localhost:5000/calculate-ride-time', rideData);
        const { ride_time } = response.data;
        setButtonText(`Request ride for ${ride_time} €`);
        
    } catch (error) {
        console.error('Pickup is not updated:', error);
      }
    }
    // Checking if destination textfield is filled first
    else if (destination) {
      try {
        const rideData = {
            pickup: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
            destination: {lat: destination.geometry.location.lat(), lng: destination.geometry.location.lng()}
          };
        const response = await axios.post('http://localhost:5000/calculate-ride-time', rideData);
        const { ride_time } = response.data;
        setButtonText(`Request ride for ${ride_time} €`);
        
    } catch (error) {
        console.error('Error calculating price:', error);
      }
    }
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
      <MapContainer loader={loader} height="400px" />
      <InputContainer onPickupSelect={handlePickupSelect} onDestinationSelect={handleDestinationSelect} onTimeSelect={handleTimeSelect} loader={loader} />
      <MyButton buttonText={buttonText} handleClick={handleSave} backgroundColor="#5662FF" margin="auto" width="100%" height="50px"/>
      <Grow in={!!message} timeout={300}>
        <Alert severity={severity} variant="filled" style={{ marginTop: '10px' }}>
          {message}
        </Alert>
      </Grow>
    </div>
  );
}

export default NewRideView;