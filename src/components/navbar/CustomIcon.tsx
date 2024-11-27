import React from 'react';
import { Box } from '@mui/material';
import logo from '../../images/logo.png' // Adjust relative path based on folder structure

function CustomIcon() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        mr: 1,
        width: 75,
        height: 75,
      }}
    >
      <img src={logo} alt="icon" style={{ width: '100%', height: '100%' }} />
    </Box>
  );
}

export default CustomIcon;
