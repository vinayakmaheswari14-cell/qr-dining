import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Stepper, Step, StepLabel, Box } from '@mui/material';
import axios from 'axios';

const OrderStatus = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActiveStep = (status) => {
    switch (status) {
      case 'placed': return 0;
      case 'preparing': return 1;
      case 'ready': return 2;
      case 'served': return 3;
      default: return 0;
    }
  };

  if (loading) return <Typography>Loading order status...</Typography>;
  if (!order) return <Typography>Order not found</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Status - Table {order.tableId?.number || 'Unknown'}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stepper activeStep={getActiveStep(order.status)} alternativeLabel>
            <Step>
              <StepLabel>Order Placed</StepLabel>
            </Step>
            <Step>
              <StepLabel>Preparing</StepLabel>
            </Step>
            <Step>
              <StepLabel>Ready</StepLabel>
            </Step>
            <Step>
              <StepLabel>Served</StepLabel>
            </Step>
          </Stepper>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          
          <Typography variant="body2" gutterBottom>
            Order Time: {new Date(order.createdAt).toLocaleString()}
          </Typography>
          
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Items:
            </Typography>
            {order.items.map((item, index) => (
              <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                <Typography>
                  {item.quantity}x {item.menuItemId.name}
                  {item.note && ` (${item.note})`}
                </Typography>
                <Typography>
                  ₹{(item.price * item.quantity)}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Box mt={2} pt={2} borderTop={1} borderColor="divider">
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">₹{order.total}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderStatus;