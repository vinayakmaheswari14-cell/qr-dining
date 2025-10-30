import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const OrderSuccessSimple = () => {
  const { orderId } = useParams();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom>
          Order Confirmed! 🎉
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Order ID: {orderId}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your order has been placed successfully!
        </Typography>
      </Box>
    </Container>
  );
};

export default OrderSuccessSimple;