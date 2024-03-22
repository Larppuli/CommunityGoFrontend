import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { Typography, Grow, Alert } from '@mui/material'; // Import Grow and Alert components
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Autofill from './Autofill';
import MyButton from './Button';
import axios from 'axios';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Bundle(ride) {
  const [expanded, setExpanded] = React.useState(false);
  const arrivalTime = new Date(ride.ride.arrivalTime);
  const hours = arrivalTime.getHours().toString().padStart(2, '0');
  const minutes = arrivalTime.getMinutes().toString().padStart(2, '0');
  const [pickup, setPickup] = useState('');
  const [rideTime, setRideTime] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State to control whether to show the alert
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  useEffect(() => {
    setRideTime(ride.ride.rideTime)
  }, [ride.ride.rideTime]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePickupSelect = (pickupPlace) => {
    setPickup(pickupPlace)
  };

  const calculateDuration = async () => {
    try {
      const rideData = {
        pickup: ride.ride.pickup.pickup.location,
        destination: ride.ride.destination.geometry.location,
        stops: [pickup.geometry.location]
      };

      const response = await axios.post('http://localhost:5000/calculate-ride-time', rideData);
      const { ride_time } = response.data;
      
      const timeDifference = ride_time - rideTime;
      console.log(timeDifference);

      // If timeDifference is greater than 5, set showAlert to true
      if (timeDifference > 5) {
        setShowAlert(true);
        setMessage("You are too far from the route!");
        setSeverity("error");
        // Set a timeout to hide the alert after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      } else {
        setShowAlert(true);
        setMessage("Successfully joined the ride!");
        setSeverity("success");
        // Set a timeout to hide the alert after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Error calculating ride duration:', error);
    }
  };

  return (
    <Card variant="outlined" style={{ color: 'white', background: 'linear-gradient(to right, #381494, #592ec7)', marginBottom: '18px', paddingBottom: "13px", marginInline: '10px', paddingInline: '20px' }}>
      <Typography variant="h6" align="center">
        <b>{ride.ride.destination.name}</b>
      </Typography>
      <Typography align="center">
        Taxi arrives to the destination at <b>{hours}:{minutes}</b>
      </Typography>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        style={{ color: "white", marginInline: "45%" }}
      >
        <ExpandMoreIcon color="white" />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Autofill onPlaceSelected={handlePickupSelect} defaultText="Your pickup location" margin="10px"/>
        <MyButton handleClick={calculateDuration} buttonText="Join ride" backgroundColor="#4B4B4B" width="100%" height="50px" marginInline="15px"/>
        <Grow in={showAlert} timeout={300} >
          <Alert severity={severity} variant="filled" style={{ marginTop: '10px' }}>
            {message}
          </Alert>
        </Grow>
      </Collapse>
    </Card>
  );
}

export default Bundle;