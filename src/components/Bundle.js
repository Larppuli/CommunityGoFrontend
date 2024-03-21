import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Autofill from './Autofill';
import MyButton from './Button';

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handlePickupSelect = (pickupPlace) => {
    console.log(pickupPlace)
    setPickup(pickupPlace);
  };

  return (
    <Card variant="outlined" style={{ color: 'white', background: 'linear-gradient(to right, #381494, #592ec7)', marginBottom: '18px', marginInline: '10px', paddingInline: '20px' }}>
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
        <MyButton buttonText="Join ride" backgroundColor="#4B4B4B" width="100%" height="50px" marginBottom="15px"/>
      </Collapse>
    </Card>
  );
}

export default Bundle;