import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PassengerBundle from './PassengerBundle';
import { Typography, List } from '@mui/material';

function PassengerBundles( loader ) {
  const [rides, setRides] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}rides`);
        if (response.data.length > 0) {
          setRides(response.data);
        } else {
          setError("No rides available");
        }
      } catch (error) {
        console.error('Error fetching rides:', error);
        setError("Error fetching rides");
      } finally {
        setIsLoading(false); // Set loading state to false when fetching completes
      }
    };

    fetchRides();
  }, [loader]);

  return (
    <div style={{ height: "800px", overflow: "hidden" }}>
      <div style={{ position: "sticky", backgroundColor: "#353634", zIndex: 1 }}>
        <Typography variant="h4" align="center" gutterBottom style={{ color: 'white' }}>
          <b>CommunityGo</b>
        </Typography>
      </div>
      <div style={{ marginTop: "15%", position: "sticky", backgroundColor: "#353634", zIndex: 1 }}>
        <Typography variant="h5" align="center" gutterBottom style={{ color: 'white' }}>
          <b>Rides in your local area</b>
        </Typography>
      </div>
      <div style={{ maxHeight: "70%", overflow: 'auto', background: "#353634" }}>
        <List>
          {isLoading ? ( // Render loading message if still loading
            <Typography  variant="h6" align="center" style={{ color: 'white' }}>Loading...</Typography>
          ) : (
            rides.map((ride, index) => (
              <PassengerBundle key={index} ride={ride} loader={loader} />
            ))
          )}
          {error && <Typography  variant="h6" align="center" style={{ color: 'white' }}>{error}</Typography>}
        </List>
      </div>
    </div>
  );
}

export default PassengerBundles;