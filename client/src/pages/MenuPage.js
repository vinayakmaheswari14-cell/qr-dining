import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Chip, Box, TextField, Drawer, List, ListItem, ListItemText, IconButton, Badge, Paper, Divider, CardActions, Alert } from '@mui/material';
import { Add, Remove, ShoppingCart, Restaurant, Star, LocalOffer, Close } from '@mui/icons-material';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import FloatingCartButton from '../components/FloatingCartButton';

const MenuPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlacing, setOrderPlacing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');
  const { 
    cart, tableInfo, setTableInfo, addToCart, updateCartItem, removeFromCart, 
    getCartSubtotal, getCartTotal, clearCart, appliedCoupon, discountAmount, 
    applyCoupon, removeCoupon 
  } = useCart();

  useEffect(() => {
    fetchMenuData();
  }, [slug]);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(`/api/menu/by-table/${slug}`);
      setMenuData(response.data);
      setTableInfo(response.data.table);
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = menuData?.items.filter(item => {
    const matchesCategory = !selectedCategory || item.categoryId._id === selectedCategory;
    const matchesSearch = !searchTerm || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  }) || [];

  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code');
      return;
    }

    setCouponLoading(true);
    setCouponError('');

    try {
      const response = await axios.post('/api/coupons/validate', {
        code: couponCode,
        orderAmount: getCartSubtotal()
      });

      if (response.data.valid) {
        applyCoupon(response.data.coupon, response.data.discount);
        setCouponCode('');
        setCouponError('');
      }
    } catch (error) {
      setCouponError(error.response?.data?.message || 'Invalid coupon code');
    } finally {
      setCouponLoading(false);
    }
  };

  const placeOrder = async () => {
    try {
      setOrderPlacing(true);
      const orderItems = cart.map(item => ({
        menuItemId: item.id,
        quantity: item.quantity,
        note: item.note,
        price: item.price
      }));

      const orderData = {
        tableId: tableInfo.id,
        items: orderItems,
        subtotal: getCartSubtotal(),
        total: getCartTotal(),
        couponCode: appliedCoupon?.code || null,
        discountAmount: discountAmount || 0
      };

      // Apply coupon if one is selected
      if (appliedCoupon) {
        await axios.post('/api/coupons/apply', {
          code: appliedCoupon.code,
          orderAmount: getCartSubtotal()
        });
      }

      const response = await axios.post('/api/orders', orderData);

      clearCart();
      setCartOpen(false);
      navigate(`/order-success/${response.data._id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setOrderPlacing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <LoadingSpinner message="Loading delicious menu... 🍽️" />
        </Container>
      </Box>
    );
  }
  
  if (!menuData) {
    return (
      <Box className="page-transition" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" className="bounce-in">
            <Typography variant="h3" gutterBottom color="error" sx={{ fontSize: '4rem' }}>
              🍽️❌
            </Typography>
            <Typography variant="h4" gutterBottom color="error">
              Menu Not Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We couldn't load the menu for this table. Please try again or contact staff.
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box className="page-transition" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: 1, pb: 3 }}>
        {/* Header Section */}
        <Paper 
          elevation={6} 
          className="bounce-in"
          sx={{ 
            p: 2, 
            mb: 2, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white',
            borderRadius: 3
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box className="slide-in-left">
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 0.5, fontSize: { xs: '1.5rem', md: '1.8rem' } }}>
                Viru Jash Restaurant
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Restaurant className="floating" sx={{ fontSize: '1.2rem' }} />
                <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                  Table {menuData.table?.number || 'Unknown'}
                </Typography>
              </Box>
            </Box>
            <Box className="slide-in-right">
              <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.85rem' }}>
                🛒 {cart.length} items in cart
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Search Section */}
        <Paper elevation={4} className="slide-in-right" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <TextField
            fullWidth
            label="🔍 Search delicious items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)'
                }
              }
            }}
          />
        </Paper>

        {/* Category Filter */}
        <Paper elevation={4} className="slide-in-left" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 1.5, color: '#333', fontWeight: 'bold', fontSize: '1.1rem' }}>
            🍽️ Categories
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            <Chip
              label="All Items"
              onClick={() => setSelectedCategory('')}
              color={selectedCategory === '' ? 'primary' : 'default'}
              variant={selectedCategory === '' ? 'filled' : 'outlined'}
              className="animated-button"
              size="small"
              sx={{ 
                fontSize: '0.85rem',
                height: 28,
                '&:hover': { 
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            />
            {menuData.categories.map((category, index) => (
              <Chip
                key={category._id}
                label={category.name}
                onClick={() => setSelectedCategory(category._id)}
                color={selectedCategory === category._id ? 'primary' : 'default'}
                variant={selectedCategory === category._id ? 'filled' : 'outlined'}
                className={`animated-button stagger-item`}
                size="small"
                sx={{ 
                  fontSize: '0.85rem',
                  height: 28,
                  animationDelay: `${(index + 1) * 0.1}s`,
                  '&:hover': { 
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* Menu Items Grid */}
        <Grid container spacing={2}>
          {filteredItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card 
                elevation={4}
                className="hover-card stagger-item"
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  animationDelay: `${index * 0.1}s`,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)'
                }}
              >
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: '#333', fontSize: '1rem' }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '0.85rem', mb: 1 }}>
                    {item.description}
                  </Typography>
                  
                  {/* Tags */}
                  <Box mb={1}>
                    {item.tags.slice(0, 2).map(tag => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="small" 
                        sx={{ mr: 0.5, mb: 0.5, fontSize: '0.65rem', height: 20 }}
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                      ₹{item.price}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Star sx={{ color: '#ffc107', fontSize: '0.9rem' }} />
                      <Typography variant="body2" sx={{ ml: 0.5, color: '#666', fontSize: '0.8rem' }}>
                        4.5
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ p: 1.5, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    className="animated-button"
                    size="small"
                    onClick={() => addToCart(item)}
                    sx={{ 
                      borderRadius: 2,
                      py: 1,
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #764ba2 30%, #667eea 90%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                      }
                    }}
                  >
                    🛒 Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Beautiful Cart Drawer */}
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: 320, height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Cart Header */}
          <Paper elevation={3} sx={{ p: 2, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              🛒 Your Order
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontSize: '0.85rem' }}>
              Table {menuData.table?.number || 'Unknown'}
            </Typography>
          </Paper>

          {/* Cart Items */}
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 1.5 }}>
            {cart.length === 0 ? (
              <Box textAlign="center" sx={{ mt: 3 }}>
                <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: '1rem' }}>
                  Your cart is empty
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                  Add some delicious items!
                </Typography>
              </Box>
            ) : (
              <List dense>
                {cart.map(item => (
                  <Paper key={item.id} elevation={2} sx={{ mb: 1.5, p: 1.5 }}>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.95rem' }}>
                            {item.name}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                            ₹{item.price} each
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                      <Box display="flex" alignItems="center">
                        <IconButton 
                          onClick={() => updateCartItem(item.id, item.quantity - 1, item.note)}
                          size="small"
                          sx={{ bgcolor: '#f5f5f5', width: 28, height: 28 }}
                        >
                          <Remove sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                        <Typography sx={{ mx: 1.5, fontWeight: 'bold', fontSize: '0.9rem' }}>{item.quantity}</Typography>
                        <IconButton 
                          onClick={() => updateCartItem(item.id, item.quantity + 1, item.note)}
                          size="small"
                          sx={{ bgcolor: '#f5f5f5', width: 28, height: 28 }}
                        >
                          <Add sx={{ fontSize: '0.9rem' }} />
                        </IconButton>
                      </Box>
                      <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </List>
            )}
          </Box>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <Box sx={{ p: 2, borderTop: '1px solid #f0f0f0' }}>
              {/* Coupon Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalOffer sx={{ fontSize: '1.2rem', color: '#ff9800' }} />
                  Apply Coupon
                </Typography>
                
                {!appliedCoupon ? (
                  <Box>
                    <Box display="flex" gap={1} mb={1}>
                      <TextField
                        size="small"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        sx={{ flex: 1 }}
                        error={!!couponError}
                      />
                      <Button
                        variant="outlined"
                        onClick={validateCoupon}
                        disabled={couponLoading}
                        sx={{ minWidth: 80 }}
                      >
                        {couponLoading ? '...' : 'Apply'}
                      </Button>
                    </Box>
                    {couponError && (
                      <Typography variant="caption" color="error" sx={{ fontSize: '0.75rem' }}>
                        {couponError}
                      </Typography>
                    )}
                    <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                      Try: WELCOME10, SAVE20, MEGA50, or FLAT100
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ bgcolor: '#e8f5e8', p: 2, borderRadius: 2, border: '1px solid #4caf50' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                          {appliedCoupon.code}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666' }}>
                          {appliedCoupon.description}
                        </Typography>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#2e7d32' }}>
                          -₹{discountAmount}
                        </Typography>
                        <IconButton size="small" onClick={removeCoupon} sx={{ ml: 1 }}>
                          <Close sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Order Summary */}
              <Box sx={{ mb: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Subtotal:
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ₹{getCartSubtotal()}
                  </Typography>
                </Box>
                
                {appliedCoupon && (
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Typography variant="body2" sx={{ color: '#2e7d32' }}>
                      Discount ({appliedCoupon.code}):
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                      -₹{discountAmount}
                    </Typography>
                  </Box>
                )}
                
                <Divider sx={{ my: 1 }} />
                
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Total:
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: '#2e7d32' }}>
                    ₹{getCartTotal()}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={placeOrder}
                disabled={orderPlacing}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
                  boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #45a049 30%, #4CAF50 90%)',
                    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)'
                  }
                }}
              >
                {orderPlacing ? 'Placing Order...' : 'Place Order'}
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>

      {/* Floating Cart Button */}
      <FloatingCartButton onClick={() => setCartOpen(true)} />
    </Box>
  );
};

export default MenuPage;