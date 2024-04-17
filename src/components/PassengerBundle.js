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

function PassengerBundle( {ride, loader} ) {
  const [expanded, setExpanded] = React.useState(false);
  const arrivalTime = new Date(ride.arrivalTime);
  const hours = arrivalTime.getHours().toString().padStart(2, '0');
  const minutes = arrivalTime.getMinutes().toString().padStart(2, '0');
  const [rideTime, setRideTime] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [id, setId] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [routes, setRoutes] = useState('');
  const [buttonText, setButtonText] = useState('Fill pickup location to join');


  useEffect(() => {
    setRideTime(ride.rideTime)
    setId(ride._id)
    setWaypoints(ride.waypoints)
  }, [ride.rideTime, ride._id, ride.waypoint, ride.waypoints, loader]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePickupSave = async () => {

    setMessage("Successfully joined the ride!");
    setSeverity("success");
    setShowAlert(true);
    // Set a timeout to hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
      setDisabled(true)
      setButtonText("Joined")
    }, 3000);

    const newRideData = {
        waypoints: waypoints,
        rideTime: rideTime,
        routes: routes
    }

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
    const stops = Array.isArray(ride.waypoints) ? [...ride.waypoints, waypointCleaned] : [waypointCleaned];

    try {
        // Ride time for the whole route is calculated with this data
        const rideData = {
            pickup: ride.pickup.geometry.location,
            destination: ride.destination.geometry.location,
            waypoints: stops
          };
          // Ride time for from stop to destination is calculated with this data
          const rideDataPrice = {
            pickup: {
              lat: waypoint.geometry.location.lat(),
              lng: waypoint.geometry.location.lng()
            },
            destination: ride.destination.geometry.location,
          };

        const response = await axios.post('http://localhost:5000/calculate-ride-time', rideData);
        const responsePrice = await axios.post('http://localhost:5000/calculate-ride-time', rideDataPrice);
        const { ride_time, routes } = response.data;
        const ride_timePrice  = responsePrice.data.ride_time;
        
        const timeDifference = ride_time - rideTime;

        // If timeDifference is greater than 5, set showAlert to true
        if (timeDifference > 5) {
          setDisabled(true)
          setShowAlert(true);
          setMessage("You are too far from the route!");
          setButtonText("Try different location")
          setSeverity("error");
          // Set a timeout to hide the alert after 4 seconds
          setTimeout(() => {
            setShowAlert(false);
          }, 4000);
        } else {
          setButtonText(`Join Ride for ${ride_timePrice}€`)
          setShowAlert(true);
          setMessage("You are able to join the ride!");
          setSeverity("success");
          setDisabled(false)
          setRideTime(ride_time)
          setWaypoints(stops);
          setRoutes(routes)
          // Set a timeout to hide the alert after 5 seconds
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
      }
    } catch (error) {
      console.error('Error calculating ride duration:', error);
    }
  };

  return (
    <Card variant="outlined" style={{ color: 'white', background: '#5662FF', marginBottom: '18px', paddingBottom: "13px", marginInline: '10px', paddingInline: '20px' }}>
      <Typography variant="h6" align="center">
        <b>{ride.destination.name}</b>
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
        <Autofill onPlaceSelected={calculateDuration} loader={loader.loader} defaultText="Your pickup location" margin="10px"/>
        <MyButton handleClick={handlePickupSave} disabled={disabled} buttonText={buttonText} backgroundColor="#4B4B4B" width="100%" height="50px" />
        <Grow in={showAlert} timeout={300} style={{ height: '40px' }} >
          <Alert severity={severity} variant="filled" style={{ marginTop: '10px' }}>
            {message}
          </Alert>
        </Grow>
      </Collapse>
    </Card>
  );
}

export default PassengerBundle;