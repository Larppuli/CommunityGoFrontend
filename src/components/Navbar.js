import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { styled } from '@mui/system';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

// StyledBottomNavigation component to customize background color
const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  backgroundColor: '#5662FF',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  height: '60px',
  marginLeft: '-8px'
}));

function Navbar() {
  const [value, setValue] = React.useState('new-ride');

  return (
    <StyledBottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction href='new-ride' label="New ride" value="new-ride" icon={<FmdGoodIcon />} sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} />
      <BottomNavigationAction href='passenger-bundles' label="Bundles" value="passenger-bundles" icon={<GroupsIcon />} sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} />
      <BottomNavigationAction href='driver-bundles' label="Driver's view" value="driver-bundles" icon={<LocalTaxiIcon />} sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }} />
    </StyledBottomNavigation>
  );
}

export default Navbar;