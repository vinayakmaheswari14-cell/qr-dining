import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderTest = () => {
  const [orderId, setOrderId] = useState('690272b2c43621020f550988'); // Default test order ID
  const navigate = useNavigate();

  const testOrderSuccess = () => {
    if (orderId.trim()) {
      navigate(`/order-success/${orderId.trim()}`);
    }
  };

  const testOrderStatus = () => {
    if (orderId.trim()) {
      navigate(`/order-status/${orderId.trim()}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Testing Page
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Use this page to test order tracking with different order IDs
      </Alert>

      <Box component="form" sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter order ID to test"
          sx={{ mb: 2 }}
        />
        
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={testOrderSuccess}
            disabled={!orderId.trim()}
          >
            Test Order Success
          </Button>
          
          <Button
            variant="outlined"
            onClick={testOrderStatus}
            disabled={!orderId.trim()}
          >
            Test Order Status
          </Button>
        </Box>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Quick Actions:
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate('/m/demo-table')}
          sx={{ mr: 2 }}
        >
          Go to Demo Menu
        </Button>
        <Button
          variant="text"
          onClick={() => navigate('/')}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default OrderTest;