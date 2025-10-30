import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Paper, List, ListItem, ListItemText, Collapse } from '@mui/material';
import { QrCodeScanner, Restaurant, AdminPanelSettings, ExpandMore, ExpandLess } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tables, setTables] = useState([]);
  const [showTables, setShowTables] = useState(false);

  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'staff')) {
      fetchTables();
    }
  }, [user]);

  const fetchTables = async () => {
    try {
      const response = await axios.get('/api/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  return (
    <Box className="page-transition" sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ pt: 2, pb: 3 }}>
        <Box textAlign="center" mb={3} className="bounce-in">
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            className="gradient-text"
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              mb: 1
            }}
          >
            Welcome to Viru Jash Restaurant
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 300
            }}
            className="slide-in-left"
          >
            Pure Vegetarian Indian Cuisine & Modern Dining Experience
          </Typography>
          <Box className="floating" sx={{ display: 'inline-block', fontSize: '1.5rem' }}>
            🌱 ✨ 🍽️
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" gap={2}>
          {(!user || user.role === 'customer') && (
            <Paper 
              elevation={6} 
              className="hover-card stagger-item"
              sx={{ 
                p: 3, 
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <QrCodeScanner className="floating" sx={{ fontSize: 50, mb: 2, opacity: 0.9 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                For Customers
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9, fontWeight: 300, fontSize: '0.95rem' }}>
                Scan the QR code at your table to view the menu and place orders instantly
              </Typography>
              <Button 
                variant="contained" 
                size="medium"
                className="animated-button"
                onClick={() => navigate('/m/demo-table')}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  py: 1,
                  px: 3,
                  fontSize: '0.95rem',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                🍽️ Try Demo Menu
              </Button>
            </Paper>
          )}

          {user && (user.role === 'staff' || user.role === 'admin') && (
            <Paper 
              elevation={6} 
              className="hover-card stagger-item"
              sx={{ 
                p: 3, 
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                color: 'white'
              }}
            >
              <Restaurant className="pulse" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                Staff Dashboard
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9, fontWeight: 300, fontSize: '0.95rem' }}>
                Manage orders and track kitchen status
              </Typography>
              <Button 
                variant="contained"
                size="medium"
                className="animated-button"
                onClick={() => navigate('/staff')}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  py: 1,
                  px: 3,
                  fontSize: '0.95rem',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                📊 Open Staff Dashboard
              </Button>
            
              <Box mt={2}>
                <Button 
                  variant="outlined"
                  className="animated-button"
                  size="small"
                  onClick={() => setShowTables(!showTables)}
                  endIcon={showTables ? <ExpandLess /> : <ExpandMore />}
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255,255,255,0.5)',
                    fontSize: '0.85rem',
                    py: 0.5,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  {showTables ? 'Hide' : 'Show'} All Table Links
                </Button>
                <Collapse in={showTables}>
                  <Paper elevation={3} sx={{ mt: 1, maxHeight: 200, overflow: 'auto', borderRadius: 2 }}>
                    <List dense>
                      {tables.map((table, index) => (
                        <ListItem 
                          key={table._id}
                          button
                          className="hover-card"
                          onClick={() => navigate(`/m/${table.qrSlug}`)}
                          sx={{
                            py: 0.5,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: '#f5f5f5',
                              transform: 'translateX(10px)'
                            }
                          }}
                        >
                          <ListItemText 
                            primary={`🍽️ Table ${table.number}`}
                            secondary={`/m/${table.qrSlug}`}
                            primaryTypographyProps={{ fontSize: '0.9rem' }}
                            secondaryTypographyProps={{ fontSize: '0.8rem' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Collapse>
              </Box>
          </Paper>
        )}

          {user && user.role === 'admin' && (
            <Paper 
              elevation={6} 
              className="hover-card stagger-item"
              sx={{ 
                p: 3, 
                textAlign: 'center',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)',
                color: 'white'
              }}
            >
              <AdminPanelSettings className="floating" sx={{ fontSize: 50, mb: 2 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
                Admin Panel
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, opacity: 0.9, fontWeight: 300, fontSize: '0.95rem' }}>
                Manage menu items, categories, tables, and generate QR codes
              </Typography>
              <Button 
                variant="contained"
                size="medium"
                className="animated-button"
                onClick={() => navigate('/admin')}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  py: 1,
                  px: 3,
                  fontSize: '0.95rem',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                ⚙️ Open Admin Panel
              </Button>
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;