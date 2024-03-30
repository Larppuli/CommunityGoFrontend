import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DriverBundle from './DriverBundle';
import { Typography, List } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RouteOnMap from './RouteOnMap';

function DriverBundles({ loader }) {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showRouteOnMap, setShowRouteOnMap] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}rides`);
        if (response.data.length > 0) {
          setRides(response.data);
        } else {
          setError("No ride requests");
        }
      } catch (error) {
        console.error('Error fetching rides:', error);
        setError("Error fetching rides");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRides();
  }, []);

  const handleShowRoute = (ride) => {
    setSelectedRide(ride);
    setShowRouteOnMap(true);
  }

  // Conditional rendering of components based on showRouteOnMap state
  if (showRouteOnMap) {
    return <RouteOnMap loader={loader} ride={selectedRide} />;
  }

  return (
    <div style={{ height: "800px", overflow: "hidden" }}>
      <div style={{ position: "sticky", backgroundColor: "#353634", zIndex: 1 }}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: 'white' }}>
          <b>CommunityGo</b>
        </Typography>
      </div>
      <div style={{ marginTop: "15%", position: "sticky", backgroundColor: "#353634", zIndex: 1 }}>
        <Typography variant="h5" align="center" gutterBottom style={{ color: 'white' }}>
          <b>Ride requests near you</b>
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white', paddingInline: "14px" }}>
        <LocationOnIcon sx={{ flex: '1', color: 'white'}} />
        <WhereToVoteIcon sx={{ flex: '1', color: 'white' }} />
        <AccessTimeIcon sx={{ flex: '1', color: 'white' }} />
      </div>
      {isLoading ? (
        <Typography  variant="h5" align="center" gutterBottom style={{ color: 'white' }}>Loading...</Typography>
      ) : error ? (
        <Typography  variant="h6" align="center" style={{ color: 'white' }}>{error}</Typography>
      ) : (
        <List style={{ maxHeight: "75%", overflow: 'auto', background: "#353634" }}>
          {rides.map((ride) => (
            <DriverBundle key={ride._id} ride={ride} handleShowRoute={() => handleShowRoute(ride)} />
          ))}
        </List>
      )}
    </div>
  );
}

export default DriverBundles;