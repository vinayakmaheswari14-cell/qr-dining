import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { ShoppingCart, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getCartItemCount } = useCart();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar 
      position="static" 
      elevation={4}
      sx={{ 
        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Toolbar sx={{ py: 0.5, minHeight: 56 }}>
        <Typography 
          variant="h6" 
          component="div" 
          className="animated-button"
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            fontWeight: 'bold',
            color: 'white !important',
            fontSize: '1.2rem',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            '&:hover': {
              transform: 'scale(1.02)',
              textShadow: '0 2px 4px rgba(0,0,0,0.4)'
            }
          }}
          onClick={() => navigate('/')}
        >
          🍽️ Viru Jash Restaurant
        </Typography>
        
        {/* About and Contact Links */}
        <Button 
          color="inherit" 
          className="animated-button"
          size="small"
          onClick={() => navigate('/about')}
          sx={{ 
            mr: 1,
            borderRadius: 2,
            fontSize: '0.8rem',
            py: 0.5,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          ℹ️ About
        </Button>
        <Button 
          color="inherit" 
          className="animated-button"
          size="small"
          onClick={() => navigate('/contact')}
          sx={{ 
            mr: 1,
            borderRadius: 2,
            fontSize: '0.8rem',
            py: 0.5,
            '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
          }}
        >
          📞 Contact
        </Button>

        {!user || user.role === 'customer' ? (
          <IconButton 
            color="inherit" 
            className="animated-button pulse"
            sx={{
              mr: 2,
              '&:hover': {
                transform: 'scale(1.1)',
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <Badge badgeContent={getCartItemCount()} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        ) : null}

        {user ? (
          <>
            <Button 
              color="inherit" 
              startIcon={<AccountCircle />}
              className="animated-button"
              size="small"
              sx={{ 
                mr: 1,
                borderRadius: 2,
                fontSize: '0.8rem',
                py: 0.5,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              {user.name} ({user.role})
            </Button>
            {user.role === 'admin' && (
              <Button 
                color="inherit" 
                className="animated-button"
                size="small"
                onClick={() => navigate('/admin')}
                sx={{ 
                  mr: 1,
                  borderRadius: 2,
                  fontSize: '0.8rem',
                  py: 0.5,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                ⚙️ Admin
              </Button>
            )}
            {(user.role === 'staff' || user.role === 'admin') && (
              <Button 
                color="inherit" 
                className="animated-button"
                size="small"
                onClick={() => navigate('/staff')}
                sx={{ 
                  mr: 1,
                  borderRadius: 2,
                  fontSize: '0.8rem',
                  py: 0.5,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                📊 Staff
              </Button>
            )}
            {user.role === 'admin' && (
              <Button 
                color="inherit" 
                className="animated-button"
                size="small"
                onClick={() => navigate('/database')}
                sx={{ 
                  mr: 1,
                  borderRadius: 2,
                  fontSize: '0.8rem',
                  py: 0.5,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                }}
              >
                🗄️ Database
              </Button>
            )}
            <Button 
              color="inherit" 
              className="animated-button"
              size="small"
              onClick={handleLogout}
              sx={{ 
                borderRadius: 2,
                fontSize: '0.8rem',
                py: 0.5,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              🚪 Logout
            </Button>
          </>
        ) : (
          <>
            <Button 
              color="inherit" 
              className="animated-button"
              size="small"
              onClick={() => navigate('/login')}
              sx={{ 
                mr: 1,
                borderRadius: 2,
                fontSize: '0.8rem',
                py: 0.5,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              🔑 Login
            </Button>
            <Button 
              color="inherit" 
              className="animated-button"
              size="small"
              onClick={() => navigate('/register')}
              sx={{ 
                borderRadius: 2,
                fontSize: '0.8rem',
                py: 0.5,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              📝 Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;