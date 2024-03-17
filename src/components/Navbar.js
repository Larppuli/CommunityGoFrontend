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
  const [value, setValue] = React.useState(0);

  return (
    <StyledBottomNavigation
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="New ride" href="new-ride" icon={<FmdGoodIcon />} sx={{ color: '#d4d4dc' }} />
      <BottomNavigationAction label="Bundles" href="bundles" icon={<GroupsIcon />} sx={{ color: '#d4d4dc' }} />
    </StyledBottomNavigation>
  );
}

export default Navbar;