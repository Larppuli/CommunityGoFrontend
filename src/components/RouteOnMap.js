import React from "react";
import MapContainer from "./MapContainer";
import { Typography } from "@mui/material";

const RouteOnMap = ({ loader, ride }) => {
  // State to hold the route data

  return (
    <div>
        <Typography variant="h4" align="center" gutterBottom style={{ color: 'white' }}>
          <b>CommunityGo</b>
        </Typography>
        <MapContainer route={ride.routes[0].overview_polyline} loader={loader} height="710px" />
    </div>
  );
};

export default RouteOnMap;