import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <Box 
      className="page-transition"
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        minHeight: '50vh',
        gap: 3
      }}
    >
      <CircularProgress 
        size={60} 
        className="pulse"
        sx={{ 
          color: 'primary.main',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }} 
      />
      <Typography 
        variant="h6" 
        color="text.secondary"
        className="floating"
        sx={{ textAlign: 'center' }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;