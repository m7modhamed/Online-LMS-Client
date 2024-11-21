import React from 'react';
import { Box } from '@mui/material';

function CustomIcon() {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        mr: 1,
        width: 75, // Adjust the width as needed
        height: 75, // Adjust the height as needed
      }}
    >
      <img src="src/images/logo.png" alt="custom-icon" style={{ width: '100%', height: '100%' }} />
    </Box>
  );
}

export default CustomIcon;
