import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";
import { Typography } from "@mui/material";
import axios from 'axios';

const DemoMap = ({ loader }) => {
  const [ride, setRide] = useState();
  const [polyline, setPolyline] = useState();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}rides`);
        if (response.data.length > 0) {
          setRide(response.data[1]);
          setPolyline(response.data[1].routes[0].overview_polyline);
        }
      } catch (error) {
        console.error('Error fetching rides:', error);
      }
    };

    fetchRides();
  }, []); 

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ color: 'white' }}>
        <b>CommunityGo</b>
      </Typography>
      {polyline && (
        <MapContainer
          ride={ride}
          polyline={polyline}
          loader={loader}
          height="600px"
        />
      )}
    </div>
  );
};

export default DemoMap;
