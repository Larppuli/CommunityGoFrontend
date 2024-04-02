import React from "react";
import MapContainer from "./MapContainer";
import { Typography } from "@mui/material";

const RouteOnMap = ({ loader, ride }) => {

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ color: 'white' }}>
        <b>CommunityGo</b>
      </Typography>
      <MapContainer
        ride={ride}
        polyline={ride.routes[0].overview_polyline}
        loader={loader}
        height="710px"
      />
    </div>
  );
};

export default RouteOnMap;