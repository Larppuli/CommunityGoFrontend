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
  const [rideTime, setRideTime] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [id, setId] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setRideTime(ride.ride.rideTime)
    setId(ride.ride._id)
    setWaypoints(ride.ride.waypoints)
  }, [ride.ride.rideTime, ride.ride._id, ride.ride.waypoint, ride.ride.waypoints]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePickupSave = async () => {

    const newRideData = {
        waypoints: waypoints,
        rideTime: rideTime
    }

    console.log(newRideData)

    try {
        await fetch(`${process.env.REACT_APP_SERVER_URI}rides/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRideData),
        });
        
        } catch (error) {
        console.error('Error saving ride:', error);
        };
  };

  const calculateDuration = async (waypoint) => {

    // Add every waypoint to an array
    const waypointCleaned = {
        geometry: waypoint.geometry,
        address_components: waypoint.address_components,
        name: waypoint.name
    }
    console.log("waypoints: ", ride.ride.waypoints)
    const stops = Array.isArray(ride.ride.waypoints) ? [...ride.ride.waypoints, waypointCleaned] : [waypointCleaned];

    try {
        const rideData = {
            pickup: ride.ride.pickup.geometry.location,
            destination: ride.ride.destination.geometry.location,
            waypoints: stops
          };

        const response = await axios.post('http://localhost:5000/calculate-ride-time', rideData);
        const { ride_time } = response.data;
        
        const timeDifference = ride_time - rideTime;
        console.log(timeDifference)

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
          setMessage("You are able to join the ride!");
          setSeverity("success");
          setDisabled(false)
          setRideTime(ride_time)
          setWaypoints(stops);
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
      <Collapse in={expanded} timeout="auto" unmountOnExit >
        <Autofill onPlaceSelected={calculateDuration} defaultText="Your pickup location" margin="10px"/>
        <MyButton handleClick={handlePickupSave} disabled={disabled} buttonText="Join ride" backgroundColor="#4B4B4B" width="100%" height="50px" />
        <Grow in={showAlert} timeout={300} style={{ height: '40px' }} >
          <Alert severity={severity} variant="filled" style={{ marginTop: '10px' }}>
            {message}
          </Alert>
        </Grow>
      </Collapse>
    </Card>
  );
}

export default Bundle;