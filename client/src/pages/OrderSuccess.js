import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Box, Button, Alert } from '@mui/material';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import OrderStatusTracker from '../components/OrderStatusTracker';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (orderId) {
      console.log('Fetching order with ID:', orderId);
      fetchOrder();
      const interval = setInterval(fetchOrder, 10000); // Poll every 10 seconds
      return () => clearInterval(interval);
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      console.log('Making API call to:', `/api/orders/${orderId}`);
      const response = await axios.get(`/api/orders/${orderId}`);
      console.log('Order fetched successfully:', response.data);
      setOrder(response.data);
      updateStatusMessage(response.data.status);
    } catch (error) {
      console.error('Error fetching order:', error);
      console.error('Error details:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        orderId: orderId
      });
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const updateStatusMessage = (status) => {
    switch (status) {
      case 'placed':
        setStatusMessage('🎉 Your order has been received! Our kitchen team will start preparing it shortly.');
        break;
      case 'preparing':
        setStatusMessage('👨‍🍳 Great news! Your order is being prepared by our chefs.');
        break;
      case 'ready':
        setStatusMessage('🔔 Your order is ready! Please collect it from the counter.');
        break;
      case 'served':
        setStatusMessage('✅ Order completed! Thank you for dining with us. Enjoy your meal!');
        break;
      case 'canceled':
        setStatusMessage('❌ Sorry, your order has been canceled. Please contact staff for assistance.');
        break;
      default:
        setStatusMessage('📋 Tracking your order status...');
    }
  };





  if (loading) {
    return (
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <LoadingSpinner message="Loading your order details... 🍽️" />
        </Container>
      </Box>
    );
  }

  if (!order) {
    return (
      <Box className="page-transition" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={4} className="bounce-in">
            <Typography variant="h3" gutterBottom color="error" sx={{ fontSize: '4rem' }}>
              😕
            </Typography>
            <Typography variant="h4" gutterBottom color="error">
              Order Not Found
            </Typography>
          </Box>
          <Alert 
            severity="error" 
            className="slide-in-left"
            sx={{ 
              borderRadius: 3,
              p: 3,
              fontSize: '1.1rem'
            }}
          >
            We couldn't find your order. Please check your order ID or contact our staff for assistance.
          </Alert>
          <Box textAlign="center" mt={4}>
            <Button 
              variant="contained" 
              size="large"
              className="animated-button"
              onClick={() => navigate('/')}
              sx={{ 
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: 3
              }}
            >
              🏠 Back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }



  return (
    <Box className="page-transition" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box textAlign="center" mb={6} className="bounce-in">
          <Typography 
            variant="h2" 
            gutterBottom 
            className="gradient-text"
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2
            }}
          >
            Order Confirmed! 🎉
          </Typography>
          <Typography variant="h5" color="text.secondary" className="slide-in-left">
            Table {order.tableId?.number || 'Unknown'} • Order #{order._id.slice(-6)}
          </Typography>
          <Box className="floating" sx={{ display: 'inline-block', fontSize: '3rem', mt: 2 }}>
            ✨ 🍽️ ✨
          </Box>
        </Box>

        {/* Status Message */}
        <Alert 
          severity={order.status === 'served' ? 'success' : 'info'} 
          className="slide-in-right pulse"
          sx={{ 
            mb: 4, 
            fontSize: '1.2rem',
            borderRadius: 3,
            p: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
          icon={false}
        >
          {statusMessage}
        </Alert>

        {/* Progress Stepper */}
        <Card elevation={6} className="slide-in-left" sx={{ mb: 4, borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <OrderStatusTracker status={order.status} />
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card elevation={4} className="slide-in-right" sx={{ mb: 4, borderRadius: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom className="gradient-text" sx={{ fontWeight: 'bold' }}>
              📋 Order Details
            </Typography>
            
            <Typography variant="body1" gutterBottom color="text.secondary" sx={{ mb: 3 }}>
              Ordered at: {new Date(order.createdAt).toLocaleString()}
            </Typography>
            
            <Box mt={3}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Items Ordered:
              </Typography>
              {order.items.map((item, index) => (
                <Box key={index} display="flex" justifyContent="space-between" mb={2} p={2} bgcolor="#f8f9fa" borderRadius={2} className="stagger-item">
                  <Box>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {item.quantity}x {item.menuItemId?.name || 'Unknown Item'}
                    </Typography>
                    {item.note && (
                      <Typography variant="body2" color="text.secondary">
                        Note: {item.note}
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    ₹{(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
            </Box>
            
            <Box mt={4} pt={3} borderTop={2} borderColor="primary.main">
              <Box display="flex" justifyContent="space-between" alignItems="center" p={2} bgcolor="primary.light" borderRadius={2}>
                <Typography variant="h4" color="white" fontWeight="bold">
                  Total Amount:
                </Typography>
                <Typography variant="h4" color="white" fontWeight="bold">
                  ₹{order.total}
                </Typography>
              </Box>
            </Box>

            {order.customerNote && (
              <Box mt={3} p={3} bgcolor="#e3f2fd" borderRadius={2} className="slide-in-left">
                <Typography variant="h6" gutterBottom color="primary">
                  Special Instructions:
                </Typography>
                <Typography variant="body1">
                  {order.customerNote}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box textAlign="center" mb={4} className="bounce-in">
          {order.status === 'served' ? (
            <Button 
              variant="contained" 
              size="large" 
              className="animated-button"
              onClick={() => navigate('/m/demo-table')}
              sx={{ 
                mr: 2,
                py: 2,
                px: 4,
                fontSize: '1.1rem',
                borderRadius: 3,
                background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)'
              }}
            >
              🍽️ Order Again
            </Button>
          ) : (
            <Typography variant="h6" color="text.secondary" className="pulse">
              This page will automatically update when your order status changes.
            </Typography>
          )}
          
          <Button 
            variant="outlined" 
            size="large" 
            className="animated-button"
            onClick={() => navigate('/')}
            sx={{ 
              ml: 2,
              py: 2,
              px: 4,
              fontSize: '1.1rem',
              borderRadius: 3
            }}
          >
            🏠 Back to Home
          </Button>
        </Box>

        {/* Estimated Time */}
        {order.status !== 'served' && order.status !== 'canceled' && (
          <Card elevation={4} className="floating" sx={{ borderRadius: 4 }}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Typography variant="h5" gutterBottom className="gradient-text" sx={{ fontWeight: 'bold' }}>
                ⏰ Estimated Preparation Time
              </Typography>
              <Typography variant="h4" color="primary" fontWeight="bold">
                {order.status === 'placed' && '15-20 minutes'}
                {order.status === 'preparing' && '10-15 minutes'}
                {order.status === 'ready' && 'Ready for pickup now! 🎉'}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default OrderSuccess;