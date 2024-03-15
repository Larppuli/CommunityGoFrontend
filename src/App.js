import React from 'react';
import { Typography } from '@mui/material';
import Locations from './components/Locations';
import MapContainer from './components/MapContainer';

function App() {
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom style={{ color: '#d4d4dc' }}>
        <b>CommunityGo</b>
      </Typography>
      <MapContainer />
      <Locations />
    </div>
  );
}

export default App;