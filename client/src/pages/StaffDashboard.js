import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Chip, Box } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const StaffDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === 'staff' || user?.role === 'admin') {
      fetchOrders();
    }
  }, [user, statusFilter]);

  const fetchOrders = async () => {
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const response = await axios.get('/api/orders', { params });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'placed': return 'warning';
      case 'preparing': return 'info';
      case 'ready': return 'success';
      case 'served': return 'default';
      case 'canceled': return 'error';
      default: return 'default';
    }
  };

  if (user?.role !== 'staff' && user?.role !== 'admin') {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ fontSize: '1.4rem', mt: 2 }}>
          Access Denied - Staff Only
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 2, py: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: '1.8rem', fontWeight: 600, mb: 2 }}>
        Staff Dashboard
      </Typography>

      <Box mb={2}>
        <Chip
          label="All Orders"
          onClick={() => setStatusFilter('')}
          color={statusFilter === '' ? 'primary' : 'default'}
          size="small"
          sx={{ mr: 1, mb: 1, fontSize: '0.8rem' }}
        />
        {['placed', 'preparing', 'ready', 'served'].map(status => (
          <Chip
            key={status}
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            onClick={() => setStatusFilter(status)}
            color={statusFilter === status ? 'primary' : 'default'}
            size="small"
            sx={{ mr: 1, mb: 1, fontSize: '0.8rem' }}
          />
        ))}
      </Box>

      <Grid container spacing={2}>
        {orders.map(order => (
          <Grid item xs={12} md={6} lg={4} key={order._id}>
            <Card elevation={3} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    Table {order.tableId?.number || 'Unknown'}
                  </Typography>
                  <Chip 
                    label={order.status} 
                    color={getStatusColor(order.status)}
                    size="small"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>
                
                <Typography variant="body2" gutterBottom sx={{ fontSize: '0.85rem' }}>
                  Order Time: {new Date(order.createdAt).toLocaleTimeString()}
                </Typography>
                
                <Typography variant="body2" gutterBottom sx={{ fontSize: '0.85rem', fontWeight: 500 }}>
                  Items:
                </Typography>
                {order.items.map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ ml: 1.5, fontSize: '0.8rem' }}>
                    {item.quantity}x {item.menuItemId.name}
                    {item.note && ` (${item.note})`}
                  </Typography>
                ))}
                
                <Typography variant="subtitle1" sx={{ mt: 1.5, fontWeight: 'bold', fontSize: '1rem' }}>
                  Total: ₹{order.total}
                </Typography>

                <Box mt={1.5}>
                  {order.status === 'placed' && (
                    <Button
                      variant="contained"
                      color="info"
                      fullWidth
                      size="small"
                      onClick={() => updateOrderStatus(order._id, 'preparing')}
                      sx={{ fontSize: '0.8rem', py: 0.8 }}
                    >
                      Start Preparing
                    </Button>
                  )}
                  {order.status === 'preparing' && (
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      size="small"
                      onClick={() => updateOrderStatus(order._id, 'ready')}
                      sx={{ fontSize: '0.8rem', py: 0.8 }}
                    >
                      Mark Ready
                    </Button>
                  )}
                  {order.status === 'ready' && (
                    <Button
                      variant="contained"
                      fullWidth
                      size="small"
                      onClick={() => updateOrderStatus(order._id, 'served')}
                      sx={{ fontSize: '0.8rem', py: 0.8 }}
                    >
                      Mark Served
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StaffDashboard;