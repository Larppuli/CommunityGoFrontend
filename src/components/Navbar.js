import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { styled } from '@mui/system';

// StyledBottomNavigation component to customize background color
const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  backgroundColor: '#381494',
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
      <BottomNavigationAction href='new-ride' label="New ride" value="new-ride" icon={<FmdGoodIcon />} sx={{ color: '#d4d4dc' }} />
      <BottomNavigationAction href='bundles' label="Bundles" value="bundles" icon={<GroupsIcon />} sx={{ color: '#d4d4dc' }} />
    </StyledBottomNavigation>
  );
}

export default Navbar;