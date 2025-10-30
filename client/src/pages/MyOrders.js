import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import OrderStatusTracker from '../components/OrderStatusTracker';
import LoadingSpinner from '../components/LoadingSpinner';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  const fetchMyOrders = async () => {
    try {
      const response = await axios.get('/api/orders/me');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" textAlign="center">
          Please login to view your orders
        </Typography>
        <Box textAlign="center" mt={2}>
          <Button variant="contained" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Box>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <LoadingSpinner message="Loading your orders... 📋" />
        </Container>
      </Box>
    );
  }

  return (
    <Box className="page-transition" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          gutterBottom 
          textAlign="center"
          className="gradient-text bounce-in"
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          📋 My Orders
        </Typography>

        {orders.length === 0 ? (
          <Box textAlign="center" className="slide-in-left">
            <Typography variant="h5" gutterBottom>
              No orders yet! 🍽️
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start by placing your first order
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/m/demo-table')}
              className="animated-button"
            >
              Browse Menu
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {orders.map((order, index) => (
              <Grid item xs={12} md={6} key={order._id}>
                <Card 
                  elevation={4} 
                  className="hover-card stagger-item"
                  sx={{ 
                    borderRadius: 3,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="h6" fontWeight="bold">
                        Table {order.tableId?.number || 'Unknown'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <OrderStatusTracker status={order.status} compact={true} />

                    <Box mt={2} mb={2}>
                      <Typography variant="subtitle2" gutterBottom>
                        Items:
                      </Typography>
                      {order.items.slice(0, 2).map((item, idx) => (
                        <Typography key={idx} variant="body2" color="text.secondary">
                          {item.quantity}x {item.menuItemId?.name}
                        </Typography>
                      ))}
                      {order.items.length > 2 && (
                        <Typography variant="body2" color="text.secondary">
                          +{order.items.length - 2} more items
                        </Typography>
                      )}
                    </Box>

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" color="primary" fontWeight="bold">
                        ₹{order.total}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => navigate(`/order-success/${order._id}`)}
                        className="animated-button"
                      >
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default MyOrders;